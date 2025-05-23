import { BaseModel } from "./BaseModel";

export interface User extends BaseModel {
  name: string;
  email: string;
}