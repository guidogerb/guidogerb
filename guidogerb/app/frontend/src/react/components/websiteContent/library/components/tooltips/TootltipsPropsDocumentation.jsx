import { ExternalLink, TableCell, TableRow } from 'design-system';
import { documentationTypes } from '../../../../../enums/documentationTypes';
import { SettingsDocumentation } from '../../documentation/SettingsDocumentation';

export function TootltipsPropsDocumentation() {
  return (
    <SettingsDocumentation type={documentationTypes.PROPS}>
      <TableRow>
        <TableCell><code className="primary-color">children</code></TableCell>
        <TableCell><code>React.ReactNode</code></TableCell>
        <TableCell><em>required</em></TableCell>
        <TableCell>
          The content of the tooltip.
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell><code className="primary-color">className</code></TableCell>
        <TableCell><code>string</code></TableCell>
        <TableCell>null</TableCell>
        <TableCell>This css class will be added to the tooltip.</TableCell>
      </TableRow>

      <TableRow>
        <TableCell><code className="primary-color">innerRef</code></TableCell>
        <TableCell><code>HTMLDivElement</code></TableCell>
        <TableCell>null</TableCell>
        <TableCell>
          This ref will be attached to the rendered <code>div</code> element wrapper allowing the parent component to interact
          directly with the actual DOM elements.
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell><code className="primary-color">isPopperVisible</code></TableCell>
        <TableCell>
          <div className="props-code-wrapper">
            <code>true</code>
            <span> | </span>
            <code>false</code>
          </div>
        </TableCell>
        <TableCell><code>false</code></TableCell>
        <TableCell>
          Controlled value used to display or hide the tooltip.
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell><code className="primary-color">offset</code></TableCell>
        <TableCell><code>[number, number]</code></TableCell>
        <TableCell><code>[0, 5]</code></TableCell>
        <TableCell>
          Control the tooltip distance from its anchor.<br />
          See <ExternalLink href="https://popper.js.org/docs/v2/tutorial/#offset">official documentation</ExternalLink>.
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell><code className="primary-color">placement</code></TableCell>
        <TableCell>
          <div className="props-code-wrapper">
            <code>auto</code>
            <span> | </span>
            <code>auto-start</code>
            <span> | </span>
            <code>auto-end</code>
            <span> | </span>
            <code>bottom</code>
            <span> | </span>
            <code>bottom-start</code>
            <span> | </span>
            <code>bottom-end</code>
            <span> | </span>
            <code>left</code>
            <span> | </span>
            <code>left-start</code>
            <span> | </span>
            <code>left-end</code>
            <span> | </span>
            <code>right</code>
            <span> | </span>
            <code>right-start</code>
            <span> | </span>
            <code>right-end</code>
            <span> | </span>
            <code>top</code>
            <span> | </span>
            <code>top-start</code>
            <span> | </span>
            <code>top-end</code>
          </div>
        </TableCell>
        <TableCell><code>bottom</code></TableCell>
        <TableCell>
          How should the tooltip should be positioned from its anchor.<br />
          See <ExternalLink href="https://popper.js.org/docs/v2/constructors/#options">official documentation</ExternalLink>.
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell><code className="primary-color">referenceElement</code></TableCell>
        <TableCell><code>HTMLElement</code></TableCell>
        <TableCell><em>required</em></TableCell>
        <TableCell>
          The reference from which the tooltip will toggle.
        </TableCell>
      </TableRow>
    </SettingsDocumentation>
  );
}
