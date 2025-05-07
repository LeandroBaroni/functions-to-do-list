import { BaseModel } from "./BaseModel";

export interface ToDo extends BaseModel {
  description: string;
  isCompleted: boolean;
  priority: string;
  userId: string;
}
