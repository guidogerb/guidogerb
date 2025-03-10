import { isFunction } from 'lodash';
import React, { useContext } from 'react';
import { joinClassNames } from '../../util/joinClassNames';
import { TableBodyDataRowContext } from './TableBodyDataRowContext';
import { TableRow } from './TableRow';

/**
 * @template TableDataT
 * @typedef {import('design-system').TableBodyDataRowContextValue<TableDataT>} TableBodyDataRowContextValue
 */

/**
 * @template TableDataT
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {((rowContextData: TableBodyDataRowContextValue<TableDataT>) => string) | string} [props.className]
 * @param {import('react').RefObject<HTMLTableRowElement>} [props.innerRef]
 * @param {((param: (TableBodyDataRowContextValue<TableDataT> & {e: React.MouseEvent})) => void)} [props.onClick]
 * @param {((param: (TableBodyDataRowContextValue<TableDataT> & {e: React.MouseEvent})) => void)} [props.onDoubleClick]
 * @returns {import('react').JSX.Element}
 */
export function TableBodyDataRowTemplate({
  children,
  className,
  innerRef,
  onClick,
  onDoubleClick,
  ...rest
}) {
  // record, recordIndex, records
  const rowContextData = useContext(TableBodyDataRowContext);
  return (
    <TableRow
      className={joinClassNames(
        // @ts-expect-error
        isFunction(className) ? className(rowContextData) : className
      )}
      // @ts-expect-error
      onClick={(onClick && ((e) => onClick({ e, ...rowContextData }))) ?? undefined}
      // @ts-expect-error
      onDoubleClick={(onDoubleClick && ((e) => onDoubleClick({ e, ...rowContextData }))) ?? undefined}
      innerRef={innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </TableRow>
  );
}
