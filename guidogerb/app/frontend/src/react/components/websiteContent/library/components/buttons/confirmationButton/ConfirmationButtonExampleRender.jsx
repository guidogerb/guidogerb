import {
  ConfirmationButton, ConfirmationChildren, InitialChildren,
  useBanner
} from 'design-system';

/** @typedef {import('design-system-website').ConfirmationButtonExamplePropsShape} ConfirmationButtonExamplePropsShape */

/**
 * @param {object} props
 * @param {{props: ConfirmationButtonExamplePropsShape}} props.state
 * @param {import('react').RefObject<HTMLButtonElement>} props.innerRef
 * @returns {import('react').JSX.Element}
 */
export function ConfirmationButtonExampleRender({
  state: {
    props: {
      appearance,
      isBusy,
      className,
      color,
      confirmationColor,
      isDisabled,
      id,
      size,
      title,
      promptChildren,
      type,
    },
  },
  innerRef,
}) {
  const { addBanner } = useBanner();
  return (
    <ConfirmationButton
      appearance={appearance}
      className={className}
      color={color}
      confirmationColor={confirmationColor}
      id={id}
      innerRef={innerRef}
      isBusy={isBusy}
      isDisabled={isDisabled}
      onClick={() => addBanner({ message: 'You have clicked the button.' })}
      size={size}
      type={type}
    >
      <InitialChildren>
        {title || ''}
      </InitialChildren>
      <ConfirmationChildren>
        {promptChildren || ''}
      </ConfirmationChildren>
    </ConfirmationButton>
  );
}
