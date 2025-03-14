import { formElementSizesEnum, joinClassNames } from 'design-system';
import { ExampleCodeReactProp } from '../../../../../../sandbox/ExampleCodeReactProp';
import { SandboxIndent } from '../../../../../../sandbox/SandboxIndent';

/** @typedef {import('design-system-website').TagExamplePropsShape} TagExamplePropsShape */

/**
 * @param {object} props
 * @param {{props: TagExamplePropsShape}} props.state
 * @returns {import('react').JSX.Element}
 */
export function TagExampleCodeReact({
  state: {
    props: {
      nonClickable: {
        className,
        color,
        isClearable,
        iconLeft,
        iconRight,
        id,
        isDisabled,
        size,
        title,
      },
    },
  },
}) {
  const sizeKey = Object.entries(formElementSizesEnum).find(([, value]) => value === size)?.[0];
  return (
    <>
      &lt;Tag
      <br />
      <ExampleCodeReactProp displayProp={className || color ? `className="${joinClassNames(className, color)}"` : null} indentLevel={1} />
      <ExampleCodeReactProp displayProp={isClearable ? 'onClear={() => { /* ... do something ... */ }' : null} indentLevel={1} />
      <ExampleCodeReactProp displayProp={isDisabled ? 'isDisabled' : null} indentLevel={1} />
      <ExampleCodeReactProp
        displayProp={
          ((iconLeft === 'none') || !iconLeft)
            ? null
            : (
              `iconLeft={<span
    className="${joinClassNames(iconLeft === 'check' ? 'ds-icon-after-check' : 'ds-icon-after-arrow-left', 'icon')}"
    aria-hidden="true"
  />}`
            )
        }
        indentLevel={1}
      />
      <ExampleCodeReactProp
        displayProp={
          ((iconRight === 'none') || !iconRight)
            ? null
            : (
              `iconRight={<span
    className="${joinClassNames(iconRight === 'check' ? 'ds-icon-after-check' : 'ds-icon-after-arrow-right', 'icon')}"
    aria-hidden="true"
  />}`
            )
        }
        indentLevel={1}
      />
      <ExampleCodeReactProp displayProp={id ? `id="${id}"` : null} indentLevel={1} />
      <ExampleCodeReactProp
        displayProp={(!sizeKey || size === formElementSizesEnum.MEDIUM) ? null : `size={formElementSizesEnum.${sizeKey}}`}
        indentLevel={1}
      />
      &gt;
      <br />
      <SandboxIndent indentLevel={1} />
      {title}
      <br />
      &lt;/Tag&gt;
    </>
  );
}
