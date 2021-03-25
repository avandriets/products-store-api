/**
 * Provides Remove Falsy Values Utility Function.
 */
export const removeFalsyValues = <T>(obj: T): Partial<T> => {

  return Object.keys(obj).reduce((acc, o) => {

    if (obj[o] !== null && obj[o] !== undefined) {
      acc[o] = obj[o];
    }

    return acc;
  }, { });

};
