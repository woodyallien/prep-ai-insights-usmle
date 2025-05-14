
import { useState } from 'react';
import { useStudyStore } from '@/store/studyStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BookOpen, BookText, CheckCircle, XCircle } from 'lucide-react';
import { QuestionComponent } from '@/components/QuestionComponent';

const Practice = () => {
  const { 
    categories, 
    competencyDomains, 
    questions, 
    quizSettings, 
    quizProgress, 
    isQuizActive,
    setQuizSettings, 
    startQuiz, 
    answerQuestion, 
    nextQuestion, 
    endQuiz 
  } = useStudyStore();
  
  const { topicMastery } = useDashboardStore();
  const [tabValue, setTabValue] = useState("quiz");
  
  const weakTopics = [...topicMastery]
    .sort((a, b) => b.recommendedPriority - a.recommendedPriority)
    .slice(0, 3);
  
  const handleStartQuiz = async () => {
    await startQuiz();
  };
  
  const handleAnswerSubmit = (questionId: string, answerId?: string, answerText?: string) => {
    answerQuestion(questionId, answerId, answerText);
  };
  
  const currentQuestion = isQuizActive ? questions[quizProgress.currentQuestionIndex] : null;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice</h1>
        <p className="text-muted-foreground">Build your knowledge with adaptive quizzes</p>
      </div>
      
      {!isQuizActive ? (
        <>
          <Tabs defaultValue={tabValue} onValueChange={setTabValue} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="quiz">Generate Quiz</TabsTrigger>
              <TabsTrigger value="review">Review Due Items</TabsTrigger>
            </TabsList>
            
            {/* Quiz Generation Tab */}
            <TabsContent value="quiz">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Quiz</CardTitle>
                      <CardDescription>Create a quiz tailored to your study needs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          onValueChange={(value) => setQuizSettings({ categoryId: value === "all" ? "" : value })}
                          value={quizSettings.categoryId || "all"}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {quizSettings.categoryId && (
                        <div className="space-y-2">
                          <Label htmlFor="subtopic">Subtopic</Label>
                          <Select 
                            onValueChange={(value) => setQuizSettings({ subtopicId: value === "all" ? "" : value })}
                            value={quizSettings.subtopicId || "all"}
                          >
                            <SelectTrigger id="subtopic">
                              <SelectValue placeholder="Select a subtopic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Subtopics</SelectItem>
                              {categories
                                .find(c => c.id === quizSettings.categoryId)
                                ?.subtopics.map(subtopic => (
                                  <SelectItem key={subtopic.id} value={subtopic.id}>
                                    {subtopic.name}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select 
                          onValueChange={(value) => setQuizSettings({ difficulty: value === "all" ? "" : value as any })}
                          value={quizSettings.difficulty || "all"}
                        >
                          <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Difficulties</SelectItem>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="competency">Competency Domain</Label>
                        <Select 
                          onValueChange={(value) => setQuizSettings({ competencyDomainId: value === "all" ? "" : value })}
                          value={quizSettings.competencyDomainId || "all"}
                        >
                          <SelectTrigger id="competency">
                            <SelectValue placeholder="Select domain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Domains</SelectItem>
                            {competencyDomains.map(domain => (
                              <SelectItem key={domain.id} value={domain.id}>
                                {domain.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="questionCount">Number of Questions</Label>
                        <Input 
                          id="questionCount" 
                          type="number" 
                          min={1} 
                          max={50} 
                          value={quizSettings.questionCount}
                          onChange={(e) => setQuizSettings({ questionCount: parseInt(e.target.value) || 10 })}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="focus-weak" 
                          checked={quizSettings.focusOnWeakAreas}
                          onCheckedChange={(checked) => setQuizSettings({ focusOnWeakAreas: checked })}
                        />
                        <Label htmlFor="focus-weak">Focus on weak areas</Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleStartQuiz} className="w-full">Generate Quiz</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Focus Areas</CardTitle>
                      <CardDescription>Based on your performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {weakTopics.map(topic => (
                          <div key={topic.id} className="p-3 border rounded-md">
                            <h3 className="font-medium">{topic.name}</h3>
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                              <span className="text-xs text-muted-foreground capitalize">
                                {topic.masteryLevel} ({topic.percentCorrect}%)
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2 text-xs w-full"
                              onClick={() => {
                                setQuizSettings({ categoryId: topic.id, focusOnWeakAreas: true });
                                handleStartQuiz();
                              }}
                            >
                              Practice This Topic
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Review Tab */}
            <TabsContent value="review">
              <Card>
                <CardHeader>
                  <CardTitle>Spaced Repetition Review</CardTitle>
                  <CardDescription>Items scheduled for review today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                    <h3 className="mt-4 font-medium">No items due for review</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      As you answer questions, items will be scheduled for review
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setTabValue("quiz")}
                    >
                      Generate a new quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        // Quiz in progress
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Question {quizProgress.currentQuestionIndex + 1} of {quizProgress.total}</CardTitle>
                <CardDescription>
                  {questions[quizProgress.currentQuestionIndex]?.categoryId === 'cardiovascular' ? 'Cardiovascular' : 
                   questions[quizProgress.currentQuestionIndex]?.categoryId === 'renal' ? 'Renal' : 'Neurology'} • {" "}
                  {questions[quizProgress.currentQuestionIndex]?.difficulty.charAt(0).toUpperCase() + 
                   questions[quizProgress.currentQuestionIndex]?.difficulty.slice(1)}
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={endQuiz}>End Quiz</Button>
            </div>
          </CardHeader>
          <CardContent>
            {currentQuestion && (
              <QuestionComponent
                question={currentQuestion}
                onSubmitAnswer={(answerId, answerText) => 
                  handleAnswerSubmit(currentQuestion.id, answerId, answerText)
                }
                onNext={nextQuestion}
              />
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>{quizProgress.correct} correct</span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                  <span>{quizProgress.incorrect} incorrect</span>
                </div>
              </div>
              <Button onClick={nextQuestion}>
                {quizProgress.currentQuestionIndex >= quizProgress.total - 1 ? 
                  "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Practice;
