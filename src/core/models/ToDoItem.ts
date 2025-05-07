import { BaseModel } from "./BaseModel";

export interface ToDoItem extends BaseModel {
  description: string;
  isCompleted: boolean;
  priority: string;
  userId: string;
}
