import { popupPlacement } from 'design-system';
import { ExampleCodeReactProp } from '../../../../sandbox/ExampleCodeReactProp';
import { SandboxIndent } from '../../../../sandbox/SandboxIndent';

/** @typedef {import('design-system-website').TooltipsExamplePropsShape} TooltipsExamplePropsShape */

/**
 * @param {object} props
 * @param {object} props.state
 * @param {TooltipsExamplePropsShape} props.state.props
 * @returns {import('react').JSX.Element}
 */
export function TooltipsExampleCodeReact({
  state: {
    props: {
      isPopperVisible,
      offsetDistance,
      offsetSkidding,
      placement,
      popupText,
    },
  },
}) {
  const offsetDistanceUse = Number(offsetDistance) || 0;
  const offsetSkiddingUse = Number(offsetSkidding) || 0;
  const offsetProp = (
    (offsetDistanceUse !== 0 || offsetSkiddingUse !== 5)
      ? `offset={[${offsetDistanceUse}, ${offsetSkiddingUse}]}`
      : null
  );

  return (
    <>
      const referenceElement = useRef();
      <br />
      ...
      <br />
      &lt;Button
      <br />
      &nbsp;&nbsp;className=&quot;button icon-button button--outlined&quot;
      <br />
      &nbsp;&nbsp;onClick=&#123;() =&gt; &#123; &#125;&#125;
      <br />
      &nbsp;&nbsp;innerRef=&#123;referenceElement&#125;
      <br />
      &nbsp;&nbsp;type=&quot;button&quot;
      <br />
      &gt;
      <br />
      &nbsp;&nbsp;&lt;span className=&quot;ds-icon-before-gear&quot; aria-hidden=&quot;true&quot; /&gt;
      <br />
      &nbsp;&nbsp;&lt;span className=&quot;visually-hidden&quot;&gt;Gear Icon with Tooltip&lt;/span&gt;
      <br />
      &lt;/Button&gt;
      <br />

      &lt;Tooltip
      <br />
      <ExampleCodeReactProp displayProp={isPopperVisible ? 'isPopperVisible' : null} indentLevel={1} />
      {
        offsetProp
          ? <ExampleCodeReactProp displayProp={offsetProp} indentLevel={1} />
          : null
      }
      {
        (placement && placement !== popupPlacement.BOTTOM)
          ? <ExampleCodeReactProp displayProp={`placement="${placement}"`} indentLevel={1} />
          : null
      }
      <SandboxIndent indentLevel={1} />
      referenceElement=&#123;referenceElement.current&#125;
      <br />
      &gt;
      <br />
      <SandboxIndent indentLevel={1} />
      {popupText}
      <br />
      &lt;/Tooltip&gt;
    </>
  );
}
