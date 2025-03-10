import { DateInput } from 'design-system';

/** @typedef {import('design-system-website').DateInputExamplePropsShape} DateInputExamplePropsShape */

/**
 * @param {object} props
 * @param {import('use-immer').Updater<{props: DateInputExamplePropsShape}>} props.setState
 * @param {{props: DateInputExamplePropsShape}} props.state
 * @param {import('react').RefObject<HTMLDivElement>} props.innerRef
 * @returns {import('react').JSX.Element}
 */
export function DateInputExampleRender({
  setState,
  state: {
    props: {
      className,
      dateFormat,
      errorMessage,
      hasCalendarPopup,
      id,
      isClearable,
      isDisabled,
      isRequired,
      label,
      placeholder,
      showCalendarTodayButton,
      value,
    },
  },
  innerRef,
}) {
  return (
    <div style={{ width: '40%' }}>
      <DateInput
        className={className}
        dateFormat={dateFormat}
        errorMessage={errorMessage}
        hasCalendarPopup={hasCalendarPopup}
        id={id || 'date-input-example-render-id'}
        innerRef={innerRef}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isRequired={isRequired}
        label={label ?? ''}
        placeholder={placeholder}
        onChange={(newValue) => setState((draftState) => {
          draftState.props.value = newValue;
        })}
        onClear={isClearable ? (() => setState((draftState) => { draftState.props.value = ''; })) : undefined}
        showCalendarTodayButton={showCalendarTodayButton}
        value={value}
      />
    </div>
  );
}
