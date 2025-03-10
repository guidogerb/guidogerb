import { joinClassNames, Tag, useBanner } from 'design-system';

/** @typedef {import('design-system-website').TagExamplePropsShape} TagExamplePropsShape */

/**
 * @param {object} props
 * @param {{props: TagExamplePropsShape}} props.state
 * @param {import('react').RefObject<HTMLDivElement>} props.innerRef
 * @returns {import('react').JSX.Element}
 */
export function TagExampleRender({
  state: {
    props: {
      nonClickable: {
        className,
        color,
        isClearable,
        isDisabled,
        iconLeft,
        iconRight,
        id,
        size,
        title,
      },
    },
  },
  innerRef,
}) {
  const { addBanner } = useBanner();
  return (
    <Tag
      className={joinClassNames(className, color)}
      iconLeft={((iconLeft === 'none') || !iconLeft) ? null : <span className={`ds-icon-before-${iconLeft}`} aria-hidden="true" />}
      iconRight={((iconRight === 'none') || !iconRight) ? null : <span className={`ds-icon-before-${iconRight}`} aria-hidden="true" />}
      id={id}
      innerRef={innerRef}
      isDisabled={isDisabled}
      onClear={isClearable ? (() => addBanner({ message: 'You have cleared the Tag.' })) : undefined}
      size={size}
    >
      {title || ''}
    </Tag>
  );
}
