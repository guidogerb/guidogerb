import { joinClassNames } from 'design-system';
import { ExampleCodeReactProp } from '../../../../../sandbox/ExampleCodeReactProp';
import { SandboxIndent } from '../../../../../sandbox/SandboxIndent';

/** @typedef {import('design-system-website').ModalExamplePropsShape} ModalExamplePropsShape */
/**
 * @param {object} props
 * @param {object} props.state
 * @param {ModalExamplePropsShape} props.state.props
 * @returns {import('react').JSX.Element}
 */
export function ModalsExampleCodeReact({
  state: {
    props: {
      className,
      title,
      content,
      size,
      showCloseButton,
      closeOnEsc,
    },
  },
}) {
  return (
    <>
      &lt;Modal
      <br />
      <ExampleCodeReactProp displayProp='ariaLabelledBy="modal-example-title"' indentLevel={1} />
      <ExampleCodeReactProp displayProp={`className="${joinClassNames(className, size)}"`} indentLevel={1} />
      <ExampleCodeReactProp displayProp='id="modal-example"' indentLevel={1} />
      {showCloseButton ? <ExampleCodeReactProp displayProp="onClose={myFunction}" indentLevel={1} /> : ''}
      {closeOnEsc ? <ExampleCodeReactProp displayProp="onEscape={myFunction}" indentLevel={1} /> : ''}
      &gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;ModalTitle id=&quot;modal-example-title&quot;&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      <ExampleCodeReactProp displayProp={title} indentLevel={1} />
      <SandboxIndent indentLevel={1} />
      &lt;/ModalTitle&gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;ModalContent id=&quot;modal-example-title&quot;&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      <ExampleCodeReactProp displayProp={content} indentLevel={1} />
      <SandboxIndent indentLevel={1} />
      &lt;/ModalContent&gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;ModalFooter id=&quot;modal-example-title&quot;&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      &lt;Button&gt;Cancel&lt;/Button&gt;
      <br />
      <SandboxIndent indentLevel={2} />
      &lt;Button&gt;Okay&lt;/Button&gt;
      <br />
      <SandboxIndent indentLevel={1} />
      &lt;/ModalFooter&gt;
      <br />
      &lt;/Modal&gt;
    </>
  );
}
