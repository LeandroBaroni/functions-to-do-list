import { singleton } from "tsyringe";
import { FirestoreCollectionName } from '../configs/firestoreCollectionName';
import { FirebaseAbstract } from "./FirestoreAbstractRepository";
import { User } from "../models/User";

@singleton()
export class UserRepository extends FirebaseAbstract<User> {

  constructor () {
    super(FirestoreCollectionName.USERS)
  }
}