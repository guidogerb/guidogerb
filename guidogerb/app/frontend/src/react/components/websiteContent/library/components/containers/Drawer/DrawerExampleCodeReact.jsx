/** @typedef {import('design-system-website').DrawerExamplePropsShape} DrawerExamplePropsShape */
import { joinClassNames } from 'design-system';
import { ExampleCodeReactProp } from '../../../../../sandbox/ExampleCodeReactProp';
import { SandboxIndent } from '../../../../../sandbox/SandboxIndent';

/**
 * @param {object} props
 * @param {object} props.state
 * @param {DrawerExamplePropsShape} props.state.props
 * @returns {import('react').JSX.Element}
 */
export function DrawerExampleCodeReact({
  state: {
    props: {
      className,
      closeOnEsc,
      title,
      content,
      position,
      showCloseButton,
    },
  },
}) {
  return (
    <>
      &lt;Drawer
      <br />
      <ExampleCodeReactProp displayProp='arialabelledby="drawer-example-title"' indentLevel={1} />
      <ExampleCodeReactProp displayProp={`className="${joinClassNames(className, position)}"`} indentLevel={1} />
      <ExampleCodeReactProp displayProp='id="modal-example"' indentLevel={1} />
      {showCloseButton ? <ExampleCodeReactProp displayProp="onClose={myFunction}" indentLevel={1} /> : ''}
      {closeOnEsc ? <ExampleCodeReactProp displayProp="onEscape={myFunction}" indentLevel={1} /> : ''}
      &gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;DrawerTitle id=&quot;drawer-example-title&quot;&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      <ExampleCodeReactProp displayProp={title} indentLevel={1} />
      <SandboxIndent indentLevel={1} />
      &lt;/DrawerTitle&gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;DrawerContent id=&quot;drawer-example-content&quot;&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      <ExampleCodeReactProp displayProp={content} indentLevel={1} />
      <SandboxIndent indentLevel={1} />
      &lt;/DrawerContent&gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;DrawerFooter id=&quot;drawer-example-footer&quot;&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      &lt;Button&gt;Cancel&lt;/Button&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      &lt;Button&gt;Okay&lt;/Button&gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;/DrawerFooter&gt;
      <br />
      &lt;/Drawer&gt;
    </>
  );
}
