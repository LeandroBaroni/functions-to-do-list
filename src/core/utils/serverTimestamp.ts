import { FieldValue } from 'firebase-admin/firestore';

/**
 * Retorna um objeto FieldValue representando um timestamp do servidor do Firestore.
 *
 * @returns {FieldValue} Um objeto FieldValue do Firestore representando o timestamp do servidor.
 *
 * @example
 * const newDoc = {
 *   name: 'John Doe',
 *   createdAt: serverTimestamp()
 * };
 * await firestore.collection('users').add(newDoc);
 *
 * @remarks
 * Este método é útil para definir campos de data que devem ser preenchidos pelo servidor Firestore.
 * É particularmente útil para campos como 'createdAt' ou 'updatedAt'.
 */
export function serverTimestamp(): FieldValue {
  return FieldValue.serverTimestamp();
}