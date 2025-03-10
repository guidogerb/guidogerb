import React from 'react';
import { useTableContext } from './hooks/useTableContext';

/**
 * @template TableDataT
 * @typedef {import('design-system').TableContextValue<TableDataT>} TableContextValue
 */

/**
 * @template TableDataT
 * @param {object} props
 * @param {(tableContext: TableContextValue<TableDataT>) => (React.JSX.Element | null)} props.children
 * @returns {import('react').JSX.Element | null}
 */
export function TableContextConsumer({ children }) {
  return children(useTableContext());
}
