
import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart, BookOpen, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { 
    topicMastery, 
    studyPlan, 
    overallProgress, 
    questionsAnswered, 
    hoursStudied, 
    dueForReview,
    isLoadingDashboard,
    fetchDashboardData 
  } = useDashboardStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const getMasteryColor = (masteryLevel: string) => {
    switch (masteryLevel) {
      case 'mastered': return 'bg-green-500';
      case 'proficient': return 'bg-blue-500';
      case 'developing': return 'bg-yellow-500';
      case 'novice': 
      default: return 'bg-red-500';
    }
  };

  const getPriorityClass = (priority: number) => {
    if (priority >= 8) return 'border-l-4 border-red-500';
    if (priority >= 6) return 'border-l-4 border-yellow-500';
    return 'border-l-4 border-blue-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your USMLE Step 1 preparation overview</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover-effect">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold">{overallProgress}%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover-effect">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Questions Answered</p>
              <p className="text-2xl font-bold">{questionsAnswered}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover-effect">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hours Studied</p>
              <p className="text-2xl font-bold">{hoursStudied}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover-effect">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Due for Review</p>
              <p className="text-2xl font-bold">{dueForReview}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic Mastery */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Topic Mastery</CardTitle>
              <CardDescription>Your proficiency across USMLE subjects</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingDashboard ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse-slow">Loading topic mastery data...</div>
                </div>
              ) : (
                <div className="space-y-6">
                  {topicMastery.map(topic => (
                    <div key={topic.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{topic.name}</h3>
                          <div className="flex items-center">
                            <div className={`h-2 w-2 rounded-full ${getMasteryColor(topic.masteryLevel)} mr-2`}></div>
                            <span className="text-xs text-muted-foreground capitalize">{topic.masteryLevel} ({topic.percentCorrect}%)</span>
                          </div>
                        </div>
                        <span className="text-sm">{topic.questionsAnswered} questions</span>
                      </div>
                      <Progress value={topic.percentCorrect} className="h-2" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Personalized Study Plan */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Personalized Study Plan</CardTitle>
              <CardDescription>Recommended focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingDashboard ? (
                <div className="h-48 flex items-center justify-center">
                  <div className="animate-pulse-slow">Loading study plan...</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {studyPlan.map(item => (
                    <div 
                      key={item.id} 
                      className={`bg-muted/30 p-4 rounded-md ${getPriorityClass(item.priority)}`}
                    >
                      <div className="mb-1 flex justify-between">
                        <h4 className="font-medium">{item.topic}</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md capitalize">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate('/practice')}
                      >
                        Start Session
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/practice')}
                  >
                    Create Custom Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
