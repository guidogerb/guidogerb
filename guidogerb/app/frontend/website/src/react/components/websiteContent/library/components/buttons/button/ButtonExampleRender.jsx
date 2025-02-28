import { Button, joinClassNames, useBanner } from 'design-system';

/** @typedef {import('design-system-website').ButtonExamplePropsShape} ButtonExamplePropsShape */

/**
 * @param {object} props
 * @param {{props: ButtonExamplePropsShape}} props.state
 * @param {import('react').RefObject<HTMLButtonElement>} props.innerRef
 * @returns {import('react').JSX.Element}
 */
export function ButtonExampleRender({
  state: {
    props: {
      appearance,
      isBusy,
      className,
      color,
      isDisabled,
      iconLeft,
      iconRight,
      id,
      size,
      title,
      type,
    },
  },
  innerRef,
}) {
  const { addBanner } = useBanner();
  return (
    <Button
      appearance={appearance}
      className={className}
      color={color}
      iconLeft={
        (
          (iconLeft === 'none') || !iconLeft)
          ? null
          : (
            <span
              className={joinClassNames(iconLeft === 'IconChevron' ? 'ds-icon-after-chevron-down' : 'ds-icon-after-arrow-left', 'icon')}
              aria-hidden="true"
            />
          )
      }
      iconRight={
        ((iconRight === 'none') || !iconRight)
          ? null
          : (
            <span
              className={joinClassNames(iconRight === 'IconChevron' ? 'ds-icon-after-chevron-down' : 'ds-icon-after-arrow-right', 'icon')}
              aria-hidden="true"
            />
          )
      }
      id={id}
      innerRef={innerRef}
      isBusy={isBusy}
      isDisabled={isDisabled}
      onClick={() => addBanner({ message: 'You have clicked the button.' })}
      size={size}
      type={type}
    >
      {title || ''}
    </Button>
  );
}
