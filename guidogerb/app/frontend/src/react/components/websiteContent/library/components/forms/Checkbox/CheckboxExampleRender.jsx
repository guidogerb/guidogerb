import { Checkbox } from 'design-system';

/** @typedef {import('design-system-website').CheckboxExamplePropsShape} CheckboxExamplePropsShape */

/**
 * @param {object} props
 * @param {import('react').RefObject<HTMLDivElement>} props.innerRef
 * @param {import('use-immer').Updater<{props: CheckboxExamplePropsShape}>} props.setState
 * @param {object} props.state
 * @param {CheckboxExamplePropsShape} props.state.props
 * @returns {import('react').JSX.Element}
 */
export function CheckboxExampleRender({
  setState,
  state: {
    props: {
      className,
      errorMessage,
      id,
      isDisabled,
      label,
      value,
    },
  },
  innerRef,
}) {
  return (
    <div ref={innerRef}>
      <Checkbox
        className={className}
        errorMessage={errorMessage}
        id={id}
        isDisabled={isDisabled}
        label={label}
        onChange={() => setState((draftState) => {
          draftState.props.value = !draftState.props.value;
        })}
        value={value}
      />
    </div>
  );
}
