import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { toNativeTypes } from './toNativeTypes';

export function ofFirestore<T>(document: DocumentSnapshot<DocumentData>, hasTimestamp = false): T {
  const data = { id: document.id, ...document.data() };

  if (hasTimestamp) {
    return toNativeTypes(data);
  }

  return data as T;
}