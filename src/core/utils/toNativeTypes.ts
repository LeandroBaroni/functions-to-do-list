import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

export function toNativeTypes(obj: any): any {
  if (obj === null || typeof obj !== 'object' || obj instanceof DocumentReference) {
    return obj;
  }

  if (obj instanceof Timestamp) {
    return obj.toDate();
  }

  if (Array.isArray(obj)) {
    return obj.map(toNativeTypes);
  }

  const clone: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    clone[key] = toNativeTypes(obj[key]);
  }

  return clone;
}