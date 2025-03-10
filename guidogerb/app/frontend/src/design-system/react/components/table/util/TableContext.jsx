import { createContext } from 'react';

/** @typedef {import('design-system').TableContextValue<any>} TableContextValue */

/* <TableWrapper> is the Context Provider for this TableContext */
export const TableContext = /** @type {typeof createContext<TableContextValue>} */ (createContext)({
  allData: [],
  filteredData: [],
  // eslint-disable-next-line no-console
  registerSortingRule: (sortingRule) => { console.error('Context not yet initialized: registerSortingRule', sortingRule); },
  // unregister a rule for sorting, generally when a <TableSortingRule> unmounts
  // eslint-disable-next-line no-console
  unregisterSortingRule: (recordFieldPath) => { console.error('Context not yet initialized: unregisterSortingRule', recordFieldPath); },
  // eslint-disable-next-line no-console
  setBodyData: (allData, filteredData) => { console.error('Context not yet initialized: setBodyDataForComponentGuid', allData, filteredData); },
  // eslint-disable-next-line no-console
  setState: (arg) => { console.error('Context not yet initialized: setState', arg); },
  state: {
    currentSortingOrderIsDefault: true,
    filterValues: {
      // context level values from a <TableFilters /> component; <TableFilter... /> child components will override these values
      defaultValue: null,
      onChange: null,
      value: {},
    },
    sortingRules: {},

    tableData: { allData: [], filteredData: [] },
    tableId: 'table-outside-context-id',
    tableSortingOnChange: null,
    tableSortingFieldPath: null,
    tableSortingFieldPaths: null,
  },
});
