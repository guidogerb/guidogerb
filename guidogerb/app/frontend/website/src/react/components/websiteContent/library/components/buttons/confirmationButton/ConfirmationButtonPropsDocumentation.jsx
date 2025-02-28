import { TableCell, TableRow } from 'design-system';
import { SettingsDocumentation } from '../../../documentation/SettingsDocumentation';
import { documentationTypes } from '../../../../../../enums/documentationTypes';

export function ConfirmationButtonPropsDocumentation() {
  return (
    <>
      <h3><code>ConfirmationButton</code></h3>
      <div className="documentation-content--small-text static-example static-example--blank">
        <SettingsDocumentation className="static-example__component-wrapper" type={documentationTypes.PROPS}>
          <TableRow>
            <TableCell><code className="primary-color">appearance</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>&apos;solid&apos;</code>
                <span> | </span>
                <code>&apos;outlined&apos;</code>
              </div>
            </TableCell>
            <TableCell><code>&apos;outlined&apos;</code></TableCell>
            <TableCell>
              Determines how the button will be formatted. Solid buttons have a solid fill color and denote emphasis
              to the user. Outlined buttons have an outline but no fill causing them to be less emphasized.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">children</code></TableCell>
            <TableCell><code>React.ReactNode</code></TableCell>
            <TableCell><em>required</em></TableCell>
            <TableCell>
              Most often, <code>InitialChildren</code> and <code>ConfirmationChildren</code>.
              But, you can have it be any element to be rendered inside the button.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">className</code></TableCell>
            <TableCell><code>string</code></TableCell>
            <TableCell>null</TableCell>
            <TableCell>
              This css class will be added to the button.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">color</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>&apos;primary&apos;</code>
                <span> | </span>
                <code>&apos;secondary&apos;</code>
                <span> | </span>
                <code>&apos;accent&apos;</code>
                <span> | </span>
                <code>&apos;none&apos;</code>
              </div>
            </TableCell>
            <TableCell><code>&apos;none&apos;</code></TableCell>
            <TableCell>
              Determines the color from the theme that will be used while rendering the button. Depending on the{' '}
              <span className="font-semi-bold">appearance</span> of the button, this can effect the border and/or fill color of the button.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">confirmationColor</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>&apos;primary&apos;</code>
                <span> | </span>
                <code>&apos;secondary&apos;</code>
                <span> | </span>
                <code>&apos;accent&apos;</code>
                <span> | </span>
                <code>&apos;none&apos;</code>
              </div>
            </TableCell>
            <TableCell><code>&apos;none&apos;</code></TableCell>
            <TableCell>
              Determines the color from the theme that will be used while when the button is clicked.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">id</code></TableCell>
            <TableCell><code>string</code></TableCell>
            <TableCell>null</TableCell>
            <TableCell>
              An id to put on the &lt;button&gt; element.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">innerRef</code></TableCell>
            <TableCell><code>MutableRefObject</code></TableCell>
            <TableCell>null</TableCell>
            <TableCell>
              This ref will be attached to the rendered &lt;button&gt; element allowing the parent component to interact
              directly with the actual <span className="font-semi-bold">button</span> DOM element.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">isBusy</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>true</code>
                <span> | </span>
                <code>false</code>
              </div>
            </TableCell>
            <TableCell>false</TableCell>
            <TableCell>
              When <span className="font-semi-bold">isBusy</span> is true, a spinner will be shown in the button.
              This is useful for showing the user that an action
              that triggered when the button was pressed is still running.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">isDisabled</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>true</code>
                <span> | </span>
                <code>false</code>
              </div>
            </TableCell>
            <TableCell>false</TableCell>
            <TableCell>
              When <span className="font-semi-bold">isDisabled</span> is true, the button will become unclickable
              and its appearance will change to be more subdued so that the user can tell the button is unusable.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">onClick</code></TableCell>
            <TableCell><code>function</code></TableCell>
            <TableCell><em>required</em></TableCell>
            <TableCell>
              The function to call when the button is clicked (confirmation).
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">size</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>formElementSizesEnum</code>
                <span> | </span>
                <code>&apos;small&apos;</code>
                <span> | </span>
                <code>&apos;medium&apos;</code>
                <span> | </span>
                <code>&apos;large&apos;</code>
                <span> | </span>
                <code>&apos;large1x&apos;</code>
              </div>
            </TableCell>
            <TableCell><code>&apos;medium&apos;</code></TableCell>
            <TableCell>
              Determines how much space the button will consume on the page.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">type</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>&apos;button&apos;</code>
                <span> | </span>
                <code>&apos;reset&apos;</code>
                <span> | </span>
                <code>&apos;submit&apos;</code>
              </div>
            </TableCell>
            <TableCell><code>&apos;button&apos;</code></TableCell>
            <TableCell>
              The HTML <span className="font-semi-bold">type</span> attribute value to put on the &lt;button&gt; element.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><code className="primary-color">...rest</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>...any</code>
              </div>
            </TableCell>
            <TableCell>null</TableCell>
            <TableCell>Additional props you wish to pass to the <code>button</code>.</TableCell>
          </TableRow>
        </SettingsDocumentation>
      </div>

      <h3><code>InitialChildren</code></h3>
      <div className="documentation-content--small-text static-example static-example--blank">
        <SettingsDocumentation className="static-example__component-wrapper" type={documentationTypes.PROPS}>
          <TableRow>
            <TableCell><code className="primary-color">children</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>React.ReactNode</code>
              </div>
            </TableCell>
            <TableCell><em>required</em></TableCell>
            <TableCell>
              The initial content of the button.
            </TableCell>
          </TableRow>
        </SettingsDocumentation>
      </div>

      <h3><code>ConfirmationChildren</code></h3>
      <div className="documentation-content--small-text static-example static-example--blank">
        <SettingsDocumentation className="static-example__component-wrapper" type={documentationTypes.PROPS}>
          <TableRow>
            <TableCell><code className="primary-color">children</code></TableCell>
            <TableCell>
              <div className="props-code-wrapper">
                <code>React.ReactNode</code>
              </div>
            </TableCell>
            <TableCell><em>required</em></TableCell>
            <TableCell>
              The content of the button after the user clicked.
            </TableCell>
          </TableRow>
        </SettingsDocumentation>
      </div>
    </>
  );
}
