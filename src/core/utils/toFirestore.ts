import { DocumentReference, FieldValue } from 'firebase-admin/firestore';

/**
 * Converte um objeto JavaScript em um formato compatível com o Firestore.
 *
 * @param {any} obj - O objeto a ser convertido.
 * @returns {any} O objeto convertido em um formato compatível com o Firestore.
 *
 * @example
 * const user = {
 *   name: 'John Doe',
 *   birthDate: new Date('1990-01-01'),
 *   metadata: {
 *     lastLogin: new Date(),
 *     preferences: { theme: 'dark' }
 *   }
 * };
 * const firestoreData = toFirestore(user);
 * await firestore.collection('users').add(firestoreData);
 *
 * @remarks
 * Esta função realiza uma conversão profunda, lidando com objetos aninhados e arrays.
 * Ela preserva tipos especiais do Firestore como FieldValue e DocumentReference.
 * Objetos Date são convertidos para novos objetos Date para garantir consistência.
 */
export function toFirestore(obj: any): any {
  if (obj === null || typeof obj !== 'object' || obj instanceof FieldValue || obj instanceof DocumentReference) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map(toFirestore);
  }

  const clone: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    if (obj[key] !== undefined && Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = toFirestore(obj[key]);
    }
  }

  return clone;
}