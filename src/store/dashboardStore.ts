
import { create } from 'zustand';

export type MasteryLevel = 'novice' | 'developing' | 'proficient' | 'mastered';

export interface TopicMastery {
  id: string;
  name: string;
  masteryLevel: MasteryLevel;
  percentCorrect: number;
  questionsAnswered: number;
  recommendedPriority: number; // 1-10, 10 being highest priority
}

export interface StudyPlanItem {
  id: string;
  type: 'review' | 'quiz' | 'flashcards';
  topic: string;
  description: string;
  priority: number; // 1-10, 10 being highest priority
}

export interface DashboardState {
  topicMastery: TopicMastery[];
  studyPlan: StudyPlanItem[];
  overallProgress: number; // 0-100
  questionsAnswered: number;
  hoursStudied: number;
  dueForReview: number;
  isLoadingDashboard: boolean;
  
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  topicMastery: [
    { 
      id: 'cardiovascular', 
      name: 'Cardiovascular', 
      masteryLevel: 'developing', 
      percentCorrect: 65, 
      questionsAnswered: 45,
      recommendedPriority: 8
    },
    { 
      id: 'renal', 
      name: 'Renal', 
      masteryLevel: 'novice', 
      percentCorrect: 45, 
      questionsAnswered: 20,
      recommendedPriority: 10
    },
    { 
      id: 'neurology', 
      name: 'Neurology', 
      masteryLevel: 'proficient', 
      percentCorrect: 82, 
      questionsAnswered: 60,
      recommendedPriority: 3
    },
    { 
      id: 'endocrine', 
      name: 'Endocrine', 
      masteryLevel: 'novice', 
      percentCorrect: 40, 
      questionsAnswered: 15,
      recommendedPriority: 9
    },
    { 
      id: 'respiratory', 
      name: 'Respiratory', 
      masteryLevel: 'developing', 
      percentCorrect: 70, 
      questionsAnswered: 35,
      recommendedPriority: 6
    },
  ],
  studyPlan: [
    {
      id: '1',
      type: 'review',
      topic: 'Renal',
      description: 'Review nephron function and glomerular filtration',
      priority: 10
    },
    {
      id: '2',
      type: 'quiz',
      topic: 'Cardiovascular',
      description: 'Take targeted quiz on cardioembolic stroke',
      priority: 8
    },
    {
      id: '3',
      type: 'flashcards',
      topic: 'Respiratory',
      description: 'Complete due flashcards on pulmonary function tests',
      priority: 6
    }
  ],
  overallProgress: 58,
  questionsAnswered: 345,
  hoursStudied: 42,
  dueForReview: 24,
  isLoadingDashboard: false,
  
  fetchDashboardData: async () => {
    set({ isLoadingDashboard: true });
    
    // This would be an API call in a real application
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Data is already set with mock values, so no need to update it here
    
    set({ isLoadingDashboard: false });
  }
}));
