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
import { AddDocument, FirebaseWhere, ReadOptions, SetDocument, UpdateDocument, WriteOptions } from '../utils/typings';
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

  /**
   * Adiciona um novo documento à coleção.
   *
   * @param {AddDocument<T>} data - Dados do documento a ser adicionado.
   * @param {WriteOptions} [options={ timestamps: true }] - Opções de escrita.
   * @returns {Promise<string>} ID do documento criado.
   *
   * @example
   * const userRepo = new UserRepository();
   * const newUserId = await userRepo.add({ name: 'John Doe', email: 'john@example.com' });
   */
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

  /**
   * Atualiza um documento existente na coleção.
   *
   * @param {UpdateDocument<T>} data - Dados para atualização, incluindo o ID do documento.
   * @param {WriteOptions} [options={ timestamps: true }] - Opções de escrita.
   * @returns {Promise<void>}
   *
   * @example
   * await userRepo.update({ id: 'user123', name: 'Jane Doe' });
   *
   * @performance
   * Atualizar apenas os campos necessários, em vez do documento inteiro, melhora o desempenho.
   */
  public async update(data: UpdateDocument<T>, options: WriteOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.updatedAt = serverTimestamp();
      Reflect.deleteProperty(clone, 'createdAt');
    }

    Reflect.deleteProperty(clone, 'id');

    await this.collection().doc(data.id).update(clone);
  }

  /**
   * Define um documento na coleção, substituindo-o se já existir.
   *
   * @param {SetDocument<T>} data - Dados do documento a ser definido.
   * @param {SetOptions & WriteOptions} [options={ timestamps: true }] - Opções de escrita e definição.
   * @returns {Promise<void>}
   *
   * @example
   * await userRepo.set({ id: 'user123', name: 'John Doe', email: 'john@example.com' });
   *
   * @performance
   * Usar `merge: true` nas opções pode ser mais eficiente ao atualizar documentos existentes.
   */
  public async set(data: SetDocument<T>, options: SetOptions & WriteOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    Reflect.deleteProperty(clone, 'id');

    await this.collection().doc(data.id).set(clone, options);
  }

  /**
   * Exclui um documento da coleção.
   *
   * @param {string} id - ID do documento a ser excluído.
   * @returns {Promise<void>}
   *
   * @example
   * await userRepo.delete('user123');
   */
  public async delete(id: string): Promise<void> {
    await this.collection().doc(id).delete();
  }

  /**
   * Recupera um documento pelo seu ID.
   *
   * @param {string} id - ID do documento.
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U>} Documento recuperado.
   * @throws {DocumentNotFoundError} Se o documento não for encontrado.
   *
   * @example
   * const user = await userRepo.getById('user123');
   */
  public async getById<U extends T = T>(id: string, options: ReadOptions = { timestamps: true }): Promise<U> {
    const doc = await this.collection().doc(id).get();

    if (!doc.exists) {
      throw new DocumentNotFoundError(this.collectionName, id);
    }

    return ofFirestore(doc, options.timestamps);
  }

  /**
   * Recupera múltiplos documentos pelos seus IDs.
   *
   * @param {string[]} ids - Array de IDs dos documentos.
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U[]>} Array de documentos recuperados.
   *
   * @example
   * const users = await userRepo.getByIds(['user123', 'user456']);
   */
  public async getByIds<U extends T = T>(ids: string[], options: ReadOptions = { timestamps: true }): Promise<U[]> {
    const promises = ids.map(id => this.getById<U>(id, options));
    return Promise.all(promises);
  }

  /**
   * Recupera todos os documentos da coleção.
   *
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U[]>} Array com todos os documentos da coleção.
   *
   * @example
   * const allUsers = await userRepo.getAll();
   *
   * @performance
   * Pode ser custoso para coleções grandes. Considere usar paginação ou limites.
   */
  public getAll<U extends T = T>(options: ReadOptions = { timestamps: true }): Promise<U[]> {
    return this.getDocs(this.collection(), options);
  }

  /**
   * Realiza uma consulta na coleção com base em um único critério.
   *
   * @param {keyof T} field - Campo a ser consultado.
   * @param {WhereFilterOp} operator - Operador de comparação.
   * @param {unknown} value - Valor para comparação.
   * @param {number | null} [limit=null] - Limite de resultados.
   * @param {keyof T | null} [orderBy=null] - Campo para ordenação.
   * @param {OrderByDirection | null} [orderByDirection=null] - Direção da ordenação.
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U[]>} Array de documentos que atendem ao critério.
   *
   * @example
   * const activeUsers = await userRepo.getWhere('status', '==', 'active', 10, 'createdAt', 'desc');
   *
   * @performance
   * Use índices compostos para consultas com orderBy em campos diferentes do filtro.
   */
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

  /**
   * Realiza uma consulta na coleção com base em múltiplos critérios.
   *
   * @param {FirebaseWhere<T>[]} filters - Array de filtros.
   * @param {number | null} [limit=null] - Limite de resultados.
   * @param {keyof T | null} [orderBy=null] - Campo para ordenação.
   * @param {OrderByDirection | null} [orderByDirection=null] - Direção da ordenação.
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U[]>} Array de documentos que atendem aos critérios.
   *
   * @example
   * const users = await userRepo.getWhereMany([
   *   ['status', '==', 'active'],
   *   ['age', '>', 18]
   * ], 20, 'lastLogin', 'desc');
   *
   * @performance
   * Consultas complexas podem exigir índices compostos. Verifique o console do Firebase para recomendações.
   */
  protected getWhereMany<U extends T = T>(
    filters: FirebaseWhere<T>[],
    limit: number | null = null,
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: ReadOptions = { timestamps: true }
  ): Promise<U[]> {
    let q: Query = this.collection();

    for (const [field, operator, value] of filters) {
      q = q.where(field as string, operator, value);
    }

    if (limit) {
      q = q.limit(limit);
    }

    if (orderBy) {
      q = q.orderBy(orderBy as string, orderByDirection || 'asc');
    }

    return this.getDocs(q, options);
  }

  /**
   * Recupera o primeiro documento que atende a um único critério.
   *
   * @param {keyof T} field - Campo a ser consultado.
   * @param {WhereFilterOp} operator - Operador de comparação.
   * @param {unknown} value - Valor para comparação.
   * @param {keyof T | null} [orderBy=null] - Campo para ordenação.
   * @param {OrderByDirection | null} [orderByDirection=null] - Direção da ordenação.
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U | null>} O primeiro documento que atende ao critério ou null.
   *
   * @example
   * const newestActiveUser = await userRepo.getOneWhere('status', '==', 'active', 'createdAt', 'desc');
   */
  protected async getOneWhere<U extends T = T>(
    field: keyof T,
    operator: WhereFilterOp,
    value: unknown,
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: ReadOptions = { timestamps: true }
  ): Promise<U | null> {
    const documents = await this.getWhere<U>(field, operator, value, 1, orderBy, orderByDirection, options);
    return documents.length ? documents[0] : null;
  }

  /**
   * Recupera o primeiro documento que atende a múltiplos critérios.
   *
   * @param {FirebaseWhere<T>[]} filters - Array de filtros.
   * @param {keyof T | null} [orderBy=null] - Campo para ordenação.
   * @param {OrderByDirection | null} [orderByDirection=null] - Direção da ordenação.
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U | null>} O primeiro documento que atende aos critérios ou null.
   *
   * @example
   * const user = await userRepo.getOneWhereMany([
   *   ['status', '==', 'active'],
   *   ['age', '>', 18]
   * ], 'lastLogin', 'desc');
   */
  protected async getOneWhereMany<U extends T = T>(
    filters: FirebaseWhere<T>[],
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: ReadOptions = { timestamps: true }
  ): Promise<U | null> {
    const documents = await this.getWhereMany<U>(filters, 1, orderBy, orderByDirection, options);
    return documents.length ? documents[0] : null;
  }

  /**
   * Método auxiliar para executar uma consulta e converter os resultados.
   *
   * @param {Query} query - Consulta do Firestore.
   * @param {ReadOptions} [options={ timestamps: true }] - Opções de leitura.
   * @returns {Promise<U[]>} Array de documentos resultantes da consulta.
   */
  protected async getDocs<U extends T = T>(query: Query, options: ReadOptions = { timestamps: true }): Promise<U[]> {
    const { docs } = await query.get();

    return docs.map(document => ofFirestore(document, options.timestamps));
  }

  /**
   * Retorna a referência da coleção no Firestore.
   *
   * @returns {CollectionReference} Referência da coleção.
   */
  protected collection(): CollectionReference {
    return this.firestore.collection(this.collectionName);
  }
}