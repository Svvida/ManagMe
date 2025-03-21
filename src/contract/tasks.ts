import { Priority, Status } from "./enums";
import { IStory } from "./stories";
import { IUser } from "./users";

export interface ITask {
  id?: string;
  name: string;
  description: string;
  priority: Priority;
  story: IStory;
  estimatedHours: number;
  status: Status;
  startDate?: string;
  endDate?: string;
  assignedUser: IUser | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateTaskRequest {
  name: string;
  description: string;
  priority: Priority;
  storyId: string;
  estimatedHours: number;
  status?: Status;
  startDate?: string;
  endDate?: string;
  assignedUserId: string | null;
}

export interface IUpdateTaskRequest {
  id: string;
  data: Partial<Omit<ICreateTaskRequest, 'assignedUserId'>> & {
    assignedUserId?: string | null;
  };
}

export interface ITaskAssignmentRequest {
  taskId: string;
  assignedUserId: string | null;
  startDate?: string;
}

export interface IStatusUpdateRequest {
  taskId: string;
  status: Status;
  endDate?: string;
}

export interface ITaskFormData {
  name: string;
  description: string;
  priority: Priority;
  storyId: string;
  estimatedHours: number;
  assignedUserId: string | null;
  status: Status;
  startDate?: string | null;
  endDate?: string | null;
}
