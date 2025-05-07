import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { toNativeTypes } from './toNativeTypes';

/**
 * Converte um documento do Firestore em um objeto nativo JavaScript.
 *
 * @template T - O tipo do objeto resultante.
 * @param {DocumentSnapshot<DocumentData>} document - O snapshot do documento do Firestore.
 * @param {boolean} [hasTimestamp=false] - Indica se o documento contém campos de timestamp que precisam ser convertidos.
 * @returns {T} O objeto convertido do tipo T.
 *
 * @example
 * const docSnapshot = await firestore.collection('users').doc('123').get();
 * const user = ofFirestore<User>(docSnapshot, true);
 * console.log(user.id); // '123'
 * console.log(user.name); // 'John Doe'
 *
 * @remarks
 * Esta função é útil para converter documentos do Firestore em objetos TypeScript tipados.
 * Se `hasTimestamp` for true, os campos de data serão convertidos para objetos Date nativos.
 *
 * @performance
 * A conversão de timestamps pode adicionar um pequeno overhead de processamento.
 * Use `hasTimestamp = false` se souber que o documento não contém campos de data que precisam ser convertidos.
 */
export function ofFirestore<T>(document: DocumentSnapshot<DocumentData>, hasTimestamp = false): T {
  const data = { id: document.id, ...document.data() };

  if (hasTimestamp) {
    return toNativeTypes(data);
  }

  return data as T;
}