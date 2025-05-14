
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, BarChartProps } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, PieChart, BarChart as BarChartIcon, PieChart as PieChartIcon } from 'lucide-react';

const Analytics = () => {
  // Mock data for charts
  const categoryData = [
    { name: 'Cardiovascular', value: 65 },
    { name: 'Renal', value: 45 },
    { name: 'Neurology', value: 82 },
    { name: 'Endocrine', value: 40 },
    { name: 'Respiratory', value: 70 },
    { name: 'Gastro', value: 58 },
    { name: 'Hematology', value: 62 }
  ];

  const weeklyProgress = [
    { name: 'Mon', value: 25 },
    { name: 'Tue', value: 40 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 55 },
    { name: 'Fri', value: 60 },
    { name: 'Sat', value: 45 },
    { name: 'Sun', value: 35 }
  ];

  const chartConfig: BarChartProps = {
    data: categoryData,
    index: 'name',
    categories: ['value'],
    colors: ['#3b82f6'],
    valueFormatter: (value) => `${value}%`,
    showLegend: false,
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
    showGridLines: false,
    chartHeight: 300
  };

  const weeklyChartConfig: BarChartProps = {
    data: weeklyProgress,
    index: 'name',
    categories: ['value'],
    colors: ['#10b981'],
    valueFormatter: (value) => `${value} questions`,
    showLegend: false,
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
    showGridLines: false,
    chartHeight: 300
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your progress and identify areas for improvement</p>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="mb-6">
          <TabsTrigger value="performance" className="flex items-center">
            <BarChartIcon className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Distribution
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your performance across major subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart {...chartConfig} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Questions answered per day</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart {...weeklyChartConfig} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
              <CardDescription>Tracking your improvement</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-muted-foreground">
                Detailed progress charts will be available after more study sessions
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Study Distribution</CardTitle>
              <CardDescription>Breakdown of your study time and focus areas</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-muted-foreground">
                Distribution analytics will be available after completing more quizzes
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Study Insights</CardTitle>
          <CardDescription>AI-generated recommendations based on your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-md">
            <h3 className="font-medium text-primary">Performance Analysis</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>Your strongest subject is Neurology with 82% accuracy.</li>
              <li>Focus on improving Renal (45%) and Endocrine (40%) topics.</li>
              <li>Consider reviewing nephron function and glomerular filtration.</li>
              <li>Your study consistency has improved over the past week.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
