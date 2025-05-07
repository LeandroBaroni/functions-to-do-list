import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

/**
 * Converte um objeto do Firestore para tipos nativos JavaScript.
 *
 * @param {any} obj - O objeto a ser convertido.
 * @returns {any} O objeto convertido com tipos nativos.
 *
 * @example
 * const firestoreData = {
 *   name: 'John Doe',
 *   createdAt: Timestamp.now(),
 *   metadata: {
 *     lastLogin: Timestamp.fromDate(new Date('2023-01-01')),
 *     preferences: { theme: 'dark' }
 *   }
 * };
 * const nativeData = toNativeTypes(firestoreData);
 * console.log(nativeData.createdAt instanceof Date); // true
 *
 * @remarks
 * Esta função realiza uma conversão profunda, transformando objetos Timestamp do Firestore em objetos Date nativos.
 * Ela preserva referências de documentos (DocumentReference) e lida com arrays e objetos aninhados.
 */
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