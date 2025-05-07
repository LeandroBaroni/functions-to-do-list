import { PartialWithFieldValue, WhereFilterOp, WithFieldValue } from 'firebase-admin/firestore';
import { BaseModel } from '../models/BaseModel';

/**
 * Tipo para adicionar um novo documento ao Firestore.
 * Omite 'id', 'createdAt' e 'updatedAt', que são geralmente gerenciados automaticamente.
 *
 * @template T - Tipo que estende Model
 */
export type AddDocument<T extends BaseModel> = WithFieldValue<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

/**
 * Tipo para definir um documento existente no Firestore.
 * Inclui 'id', mas omite 'createdAt' e 'updatedAt'.
 *
 * @template T - Tipo que estende Model
 */
export type SetDocument<T extends BaseModel> = WithFieldValue<Omit<T, 'id' | 'createdAt' | 'updatedAt'>> & Pick<T, 'id'>;

/**
 * Tipo para atualizar um documento existente no Firestore.
 * Permite atualização parcial, mas requer 'id'.
 *
 * @template T - Tipo que estende Model
 */
export type UpdateDocument<T extends BaseModel> = PartialWithFieldValue<Omit<T, 'id' | 'createdAt' | 'updatedAt'>> &
  Pick<T, 'id'>;

/**
 * Tipo que representa uma cláusula 'where' para consultas no Firestore.
 *
 * @template T - Tipo que estende Model
 */
export type FirebaseWhere<T extends BaseModel> = [keyof T, WhereFilterOp, unknown];

/**
 * Opções para operações de escrita no Firestore.
 */
export type WriteOptions = {
  timestamps: boolean;
};

/**
 * Opções para operações de leitura no Firestore.
 */
export type ReadOptions = {
  timestamps: boolean;
};