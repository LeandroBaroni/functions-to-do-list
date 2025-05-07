import * as firebase from 'firebase-admin';

export function cloneObject(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (
    obj instanceof firebase.firestore.FieldValue ||
    obj instanceof firebase.firestore.DocumentReference
  ) {
    return obj;
  }

  let copy: any;

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i += 1) {
      copy[i] = cloneObject(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    copy = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const attr in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = cloneObject(obj[attr]);
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const prop in copy) {
      if (copy[prop] === undefined) {
        delete copy[prop];
      }
    }

    return copy;
  }

  throw new Error('The object could not be copied! Type is not supported.');
}