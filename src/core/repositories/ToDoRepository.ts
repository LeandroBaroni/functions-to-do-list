import { singleton } from "tsyringe";
import { FirestoreCollectionName } from '../configs/firestoreCollectionName';
import { FirebaseAbstract } from "./FirestoreAbstractRepository";
import { ToDoItem } from "../models/ToDoItem";

@singleton()
export class ToDoRepository extends FirebaseAbstract<ToDoItem> {

  constructor () {
    console.log('ashgj')
    super(FirestoreCollectionName.TO_DO_ITEMS)
  }
}