
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Question } from '@/store/studyStore';

interface QuestionComponentProps {
  question: Question;
  onSubmitAnswer: (answerId?: string, answerText?: string) => void;
  onNext: () => void;
}

export const QuestionComponent = ({ question, onSubmitAnswer, onNext }: QuestionComponentProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const handleSubmitAnswer = () => {
    if (isAnswered) return;
    
    let correct = false;
    
    if (question.type === 'mcq' && selectedAnswer) {
      const option = question.options?.find(o => o.id === selectedAnswer);
      correct = option?.isCorrect || false;
      onSubmitAnswer(selectedAnswer);
    } else if (['cloze', 'fill-in-blank'].includes(question.type) && answerText) {
      correct = answerText.toLowerCase() === question.correctAnswer?.toLowerCase();
      onSubmitAnswer(undefined, answerText);
    }
    
    setIsAnswered(true);
    setIsCorrect(correct);
  };
  
  const renderQuestion = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-md">
              <p>{question.stem}</p>
            </div>
            
            <RadioGroup 
              value={selectedAnswer || ""} 
              onValueChange={(value) => !isAnswered && setSelectedAnswer(value)}
              className="space-y-2"
            >
              {question.options?.map(option => (
                <div 
                  key={option.id} 
                  className={`border rounded-md p-3 ${
                    isAnswered && option.id === selectedAnswer ? 
                      option.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200' : 
                      isAnswered && option.isCorrect ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <RadioGroupItem value={option.id} id={option.id} disabled={isAnswered} />
                    <Label 
                      htmlFor={option.id} 
                      className={`ml-2 flex-1 ${isAnswered && option.isCorrect ? 'font-medium' : ''}`}
                    >
                      {option.text}
                    </Label>
                    {isAnswered && (
                      option.isCorrect ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        option.id === selectedAnswer ? 
                          <XCircle className="h-5 w-5 text-red-500" /> : null
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
        
      case 'cloze':
      case 'fill-in-blank':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-md">
              <p>{question.stem}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="answer">Your Answer</Label>
              <Input 
                id="answer" 
                value={answerText} 
                onChange={(e) => !isAnswered && setAnswerText(e.target.value)}
                disabled={isAnswered}
              />
              {isAnswered && (
                <div className="flex items-center mt-2 space-x-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-500">
                        Incorrect. Correct answer: {question.correctAnswer}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );
        
      case 'flashcard':
        return (
          <div className="h-64 flex items-center justify-center p-4 bg-muted/30 rounded-md">
            <p className="text-center">Flashcard functionality coming soon</p>
          </div>
        );
        
      default:
        return <div>Unsupported question type</div>;
    }
  };
  
  return (
    <div className="space-y-6">
      {renderQuestion()}
      
      {isAnswered && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <HelpCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">Explanation</h3>
                <p className="mt-1 text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-center">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmitAnswer} 
            disabled={question.type === 'mcq' ? !selectedAnswer : !answerText}
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={onNext}>
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};
