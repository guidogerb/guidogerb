import { split } from 'lodash';

/**
 * @template ObjectT
 * @template ValueT
 * @param {object} param
 * @param {ObjectT | null} param.object
 * @param {string} param.path
 * @returns {ValueT}
 */
export function valueAtPath({ object, path }) {
  // eslint-disable-next-line jsdoc/no-undefined-types
  return /** @type {ValueT} */ (
    /** @type {any} */ (
      split(path, '.').reduce(
        /**
         * @param {unknown} obj
         * @param {string} field
         * @returns {unknown}
         */
        (obj, field) => {
          if (!field) {
            return obj;
          }
          if (obj === null) {
            return null;
          }
          if (obj && typeof obj === 'object') {
            return /** @type {Record<string, unknown>} */ (obj)[field];
          }
          return undefined;
        },
        object
      )
    )
  );
}
