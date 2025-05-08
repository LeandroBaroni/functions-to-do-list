import {
  CollectionReference,
  Firestore,
  OrderByDirection,
  Query,
  SetOptions,
  WhereFilterOp,
  getFirestore
} from 'firebase-admin/firestore';
import { BaseModel } from '../models/BaseModel';
import { AddDocument, ReadOptions, SetDocument, UpdateDocument, WriteOptions } from '../utils/typings';
import { toFirestore } from '../utils/toFirestore';
import { serverTimestamp } from '../utils/serverTimestamp';
import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError';
import { ofFirestore } from '../utils/ofFirestore';

/**
 * Classe abstrata para interações com o Firestore.
 * Fornece métodos para operações CRUD e consultas comuns.
 *
 * @template T - Tipo que estende Model, representando a estrutura dos documentos na coleção.
 */
export abstract class FirebaseAbstract<T extends BaseModel> {
  /**
   * @param {string} collectionName - Nome da coleção no Firestore.
   * @param {Firestore} [firestore=getFirestore()] - Instância do Firestore. Por padrão, usa a instância global.
   */
  public constructor(
    protected collectionName: string,
    protected firestore: Firestore = getFirestore()
  ) {}

  public async add(data: AddDocument<T>, options: WriteOptions = { timestamps: true }): Promise<string> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    Reflect.deleteProperty(clone, 'id');

    const { id } = await this.collection().add(clone);

    return id;
  }

  public async update(data: UpdateDocument<T>, options: WriteOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.updatedAt = serverTimestamp();
      Reflect.deleteProperty(clone, 'createdAt');
    }

    Reflect.deleteProperty(clone, 'id');

    await this.collection().doc(data.id).update(clone);
  }

  public async set(data: SetDocument<T>, options: SetOptions & WriteOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    Reflect.deleteProperty(clone, 'id');

    await this.collection().doc(data.id).set(clone, options);
  }

  public async delete(id: string): Promise<void> {
    await this.collection().doc(id).delete();
  }

  public async getById<U extends T = T>(id: string, options: ReadOptions = { timestamps: true }): Promise<U> {
    const doc = await this.collection().doc(id).get();

    if (!doc.exists) {
      throw new DocumentNotFoundError(this.collectionName, id);
    }

    return ofFirestore(doc, options.timestamps);
  }

  protected getWhere<U extends T = T>(
    field: keyof T,
    operator: WhereFilterOp,
    value: unknown,
    limit: number | null = null,
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: ReadOptions = { timestamps: true }
  ): Promise<U[]> {
    let q = this.collection().where(field as string, operator, value);

    if (limit) {
      q = q.limit(limit);
    }

    if (orderBy) {
      q = q.orderBy(orderBy as string, orderByDirection || 'asc');
    }

    return this.getDocs(q, options);
  }

  protected async getDocs<U extends T = T>(query: Query, options: ReadOptions = { timestamps: true }): Promise<U[]> {
    const { docs } = await query.get();

    return docs.map(document => ofFirestore(document, options.timestamps));
  }


  protected collection(): CollectionReference {
    return this.firestore.collection(this.collectionName);
  }
}