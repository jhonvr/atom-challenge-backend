export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: number;
  updatedAt?: number;
  completed: boolean;
  deleted?: boolean;
  deletedAt?: number; 
}

