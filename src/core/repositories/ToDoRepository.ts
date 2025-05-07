import { singleton } from "tsyringe";
import { FirestoreCollectionName } from '../configs/firestoreCollectionName';
import { FirebaseAbstract } from "./FirestoreAbstractRepository";
import { ToDo } from "../models/ToDoItem";

@singleton()
export class ToDoRepository extends FirebaseAbstract<ToDo> {

  constructor () {
    super(FirestoreCollectionName.TO_DO_ITEMS)
  }

  getByUserId (userId: string): Promise<ToDo[]> {
    return this.getWhere('userId', '==', userId);
  }
}