import { TableCell, TableRow } from 'design-system';
import { documentationTypes } from '../../../../../../enums/documentationTypes';
import { SettingsDocumentation } from '../../../documentation/SettingsDocumentation';

export function SelectCssClassesDocumentation() {
  return (
    <SettingsDocumentation type={documentationTypes.CSS}>
      <TableRow>
        <TableCell><code>.select-input--clear-icon-visible</code></TableCell>
        <TableCell>
          This class is used conjointly with the <code>isClearable</code> property.
          It adds extra padding to the right side to accommodate the clear icon.
        </TableCell>
      </TableRow>
    </SettingsDocumentation>
  );
}
