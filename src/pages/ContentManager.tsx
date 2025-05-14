
import { useState, useRef } from 'react';
import { useStudyStore } from '@/store/studyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, UploadCloud, AlertCircle, CheckCircle, Trash } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ContentManager = () => {
  const { files, uploadFile, deleteFile } = useStudyStore();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const file = selectedFiles[0];
    
    // Check file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Currently only PDF files are supported.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await uploadFile(file);
      toast({
        title: "File uploaded successfully",
        description: "Your file is being processed.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading your file.",
        variant: "destructive",
      });
      console.error('File upload error:', error);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const renderFileStatus = (status: string) => {
    switch (status) {
      case 'uploading':
        return (
          <div className="flex items-center">
            <div className="w-32 mr-3">
              <Progress value={45} className="h-2" />
            </div>
            <span className="text-xs text-muted-foreground">Uploading...</span>
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-xs text-yellow-500">Processing</span>
          </div>
        );
      case 'ready':
        return (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-xs text-green-500">Ready</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-xs text-red-500">Error</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  const handleDeleteFile = (id: string) => {
    deleteFile(id);
    toast({
      title: "File deleted",
      description: "The file has been removed from your account.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Manager</h1>
        <p className="text-muted-foreground">Upload and manage your study materials</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Add study materials to enhance your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf"
                onChange={handleFileInputChange}
              />
              <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground/70" />
              <p className="mt-2 text-sm font-medium">Drag & drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports PDF files (Max: 10MB)</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Uploaded Files */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Documents</CardTitle>
              <CardDescription>Manage your uploaded study materials</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">{files.length} files</span>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/40" />
                <p className="mt-4 text-muted-foreground">No documents uploaded yet</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload your first document
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {files.map(file => (
                  <div 
                    key={file.id} 
                    className="p-3 rounded-md border flex items-center justify-between bg-card"
                  >
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-3">{formatFileSize(file.size)}</span>
                          <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {renderFileStatus(file.status)}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Supported Content Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <div className="font-medium">PDF Documents</div>
              <p className="text-sm text-muted-foreground">Textbooks, notes, research papers</p>
            </div>
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="font-medium text-muted-foreground">Word Documents</div>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="font-medium text-muted-foreground">PowerPoint</div>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;
