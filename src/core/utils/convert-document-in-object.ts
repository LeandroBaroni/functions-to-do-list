import * as firebase from 'firebase-admin';

export function transformTimestampToDate(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof firebase.firestore.Timestamp) {
    return obj.toDate();
  }

  if (obj instanceof firebase.firestore.DocumentReference) {
    return obj;
  }

  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; i += 1) {
      copy[i] = transformTimestampToDate(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    const copy: any = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const attr in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = transformTimestampToDate(obj[attr]);
      }
    }

    return copy;
  }

  throw new Error(
    'The object could not be transformed! Type is not supported.'
  );
}

export function toObject<T>(
  document: firebase.firestore.DocumentData,
  hasTimestamp = false
): T {
  let data = { id: document.id, ...document.data() };

  if (hasTimestamp) {
    data = transformTimestampToDate(data);
  }

  return data;
}