import React, { useContext } from 'react';
import { joinClassNames } from '../../util/joinClassNames';
import { TableContext } from './util/TableContext';

/** @typedef {import('design-system').TableContextStateFilterValueObject} TableContextStateFilterValueObject */

/** @typedef {(setter: ((param: TableContextStateFilterValueObject) => void)) => void} SetterFunc */

/**
 * @param {object} props
 * @param {(params: {filterValues: TableContextStateFilterValueObject, setFilterValues: SetterFunc}) => React.JSX.Element} props.children
 * @param {string} [props.className]
 * @param {string} [props.id]
 * @param {import('react').RefObject<HTMLTableCellElement>} [props.innerRef]
 * @returns {import('react').JSX.Element}
 */
export function TableFilterCustom({
  children,
  className,
  id,
  innerRef,
  ...rest
}) {
  const { setState: setStateContext, state: stateContext } = useContext(TableContext);
  return (
    <th className={joinClassNames('table-header__cell', className)} id={id ?? undefined} ref={innerRef} {...rest}>
      {children({
        // current filter values (key => value)
        filterValues: stateContext.filterValues.value,

        // 'setter' function that will update just the filterValues.value of the table context
        setFilterValues: (setFilterValuesFunc) => {
          setStateContext((draftStateContext) => {
            setFilterValuesFunc(draftStateContext.filterValues.value);
          });
        },
      })}
    </th>
  );
}
