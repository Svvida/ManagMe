import { Priority, Status } from "./enums";
import { IProject } from "./projects";
import { IUser } from "./users";

export interface IStory {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  project: IProject;
  status: Status;
  owner: IUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateStoryRequest {
  name: string;
  description: string;
  priority: Priority;
  projectId: string;
  status?: Status;
  ownerId: string;
}

export interface IUpdateStoryRequest {
  id: string;
  data: Partial<ICreateStoryRequest>;
}

export interface IStoryFormData {
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  projectId: string;
  ownerId: string;
}
