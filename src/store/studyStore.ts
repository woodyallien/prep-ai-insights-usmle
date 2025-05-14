
import { create } from 'zustand';

export type FileStatus = 'uploading' | 'processing' | 'ready' | 'error';

export interface StudyFile {
  id: string;
  name: string;
  status: FileStatus;
  uploadDate: Date;
  size: number;
}

export type QuizType = 'mcq' | 'flashcard' | 'cloze' | 'fill-in-blank';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Category {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: string;
  name: string;
}

export interface CompetencyDomain {
  id: string;
  name: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuizType;
  stem: string;
  options?: QuestionOption[];
  correctAnswer?: string;
  explanation: string;
  categoryId: string;
  subtopicId?: string;
  difficulty: Difficulty;
  competencyDomainId?: string;
}

export interface QuizSettings {
  categoryId?: string;
  subtopicId?: string;
  difficulty?: Difficulty;
  competencyDomainId?: string;
  questionCount: number;
  focusOnWeakAreas: boolean;
}

export interface QuizProgress {
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
  currentQuestionIndex: number;
}

export interface StudyState {
  files: StudyFile[];
  questions: Question[];
  categories: Category[];
  competencyDomains: CompetencyDomain[];
  quizSettings: QuizSettings;
  quizProgress: QuizProgress;
  isQuizActive: boolean;
  
  // File management actions
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (fileId: string) => void;
  
  // Quiz actions
  setQuizSettings: (settings: Partial<QuizSettings>) => void;
  startQuiz: () => Promise<void>;
  answerQuestion: (questionId: string, answerId?: string, answerText?: string) => void;
  nextQuestion: () => void;
  endQuiz: () => void;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  files: [],
  questions: [],
  categories: [
    {
      id: 'cardiovascular',
      name: 'Cardiovascular',
      subtopics: [
        { id: 'cardio-anatomy', name: 'Cardiac Anatomy' },
        { id: 'cardio-physiology', name: 'Cardiac Physiology' },
        { id: 'cardio-pathology', name: 'Cardiac Pathology' }
      ]
    },
    {
      id: 'renal',
      name: 'Renal',
      subtopics: [
        { id: 'renal-anatomy', name: 'Renal Anatomy' },
        { id: 'renal-physiology', name: 'Renal Physiology' },
        { id: 'renal-pathology', name: 'Renal Pathology' }
      ]
    },
    {
      id: 'neurology',
      name: 'Neurology',
      subtopics: [
        { id: 'neuro-anatomy', name: 'Neuroanatomy' },
        { id: 'neuro-physiology', name: 'Neurophysiology' },
        { id: 'neuro-pathology', name: 'Neuropathology' }
      ]
    },
  ],
  competencyDomains: [
    { id: 'medical-knowledge', name: 'Medical Knowledge' },
    { id: 'diagnosis', name: 'Patient Care & Diagnosis' },
    { id: 'management', name: 'Management & Treatment' }
  ],
  quizSettings: {
    questionCount: 10,
    focusOnWeakAreas: false
  },
  quizProgress: {
    correct: 0,
    incorrect: 0,
    skipped: 0,
    total: 0,
    currentQuestionIndex: 0
  },
  isQuizActive: false,
  
  uploadFile: async (file) => {
    const newFile: StudyFile = {
      id: Date.now().toString(),
      name: file.name,
      status: 'uploading',
      uploadDate: new Date(),
      size: file.size
    };
    
    set(state => ({ files: [...state.files, newFile] }));
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    set(state => ({
      files: state.files.map(f => 
        f.id === newFile.id ? { ...f, status: 'ready' } : f
      )
    }));
  },
  
  deleteFile: (fileId) => {
    set(state => ({
      files: state.files.filter(f => f.id !== fileId)
    }));
  },
  
  setQuizSettings: (settings) => {
    set(state => ({
      quizSettings: { ...state.quizSettings, ...settings }
    }));
  },
  
  startQuiz: async () => {
    // This would normally fetch questions from an API based on settings
    const mockQuestions: Question[] = [
      {
        id: '1',
        type: 'mcq',
        stem: 'A 65-year-old man presents with crushing chest pain radiating to the left arm. ECG shows ST-segment elevation in leads II, III, and aVF. Which artery is most likely occluded?',
        options: [
          { id: 'a', text: 'Left anterior descending artery', isCorrect: false },
          { id: 'b', text: 'Left circumflex artery', isCorrect: false },
          { id: 'c', text: 'Right coronary artery', isCorrect: true },
          { id: 'd', text: 'Left main coronary artery', isCorrect: false }
        ],
        explanation: 'ST-segment elevation in leads II, III, and aVF indicates an inferior wall MI, which is typically supplied by the right coronary artery.',
        categoryId: 'cardiovascular',
        subtopicId: 'cardio-pathology',
        difficulty: 'medium',
        competencyDomainId: 'diagnosis'
      },
      {
        id: '2',
        type: 'mcq',
        stem: 'Which of the following is NOT a characteristic feature of nephrotic syndrome?',
        options: [
          { id: 'a', text: 'Proteinuria', isCorrect: false },
          { id: 'b', text: 'Hypoalbuminemia', isCorrect: false },
          { id: 'c', text: 'Hyperlipidemia', isCorrect: false },
          { id: 'd', text: 'Hematuria', isCorrect: true }
        ],
        explanation: 'Classic nephrotic syndrome is characterized by heavy proteinuria (>3.5g/day), hypoalbuminemia, hyperlipidemia, and edema. Hematuria is more commonly associated with nephritic syndrome.',
        categoryId: 'renal',
        subtopicId: 'renal-pathology',
        difficulty: 'medium',
        competencyDomainId: 'medical-knowledge'
      },
    ];
    
    set({
      questions: mockQuestions,
      quizProgress: {
        correct: 0,
        incorrect: 0,
        skipped: 0,
        total: mockQuestions.length,
        currentQuestionIndex: 0
      },
      isQuizActive: true
    });
  },
  
  answerQuestion: (questionId, answerId, answerText) => {
    const { questions, quizProgress } = get();
    const currentQuestion = questions[quizProgress.currentQuestionIndex];
    
    if (currentQuestion.id !== questionId) return;
    
    let isCorrect = false;
    
    if (currentQuestion.type === 'mcq' && answerId) {
      const selectedOption = currentQuestion.options?.find(o => o.id === answerId);
      isCorrect = selectedOption?.isCorrect || false;
    } else if (['cloze', 'fill-in-blank'].includes(currentQuestion.type) && answerText) {
      isCorrect = answerText.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase();
    }
    
    set(state => ({
      quizProgress: {
        ...state.quizProgress,
        correct: isCorrect ? state.quizProgress.correct + 1 : state.quizProgress.correct,
        incorrect: !isCorrect ? state.quizProgress.incorrect + 1 : state.quizProgress.incorrect,
      }
    }));
  },
  
  nextQuestion: () => {
    set(state => {
      if (state.quizProgress.currentQuestionIndex >= state.questions.length - 1) {
        return { isQuizActive: false };
      }
      
      return {
        quizProgress: {
          ...state.quizProgress,
          currentQuestionIndex: state.quizProgress.currentQuestionIndex + 1
        }
      };
    });
  },
  
  endQuiz: () => {
    set({ isQuizActive: false });
  }
}));
