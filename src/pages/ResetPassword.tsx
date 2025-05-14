
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword, isLoading } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      toast({
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
      console.error('Password reset error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">LicensePrepAI</h1>
          <p className="text-muted-foreground mt-2">Your AI-powered USMLE Step 1 preparation assistant</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required 
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                
                <div className="text-center text-sm">
                  Remember your password?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                <p className="text-center">
                  If an account exists with the email <strong>{email}</strong>, 
                  you will receive a password reset link shortly.
                </p>
              </div>
              
              <div className="text-center">
                <Link to="/login" className="text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
