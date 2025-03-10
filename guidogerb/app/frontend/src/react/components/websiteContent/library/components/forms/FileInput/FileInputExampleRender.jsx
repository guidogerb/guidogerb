import { FileInput } from 'design-system';

/** @typedef {import('design-system-website').FileInputExamplePropsShape} FileInputExamplePropsShape */

/**
 * @param {object} props
 * @param {import('react').RefObject<HTMLDivElement>} props.innerRef
 * @param {object} props.state
 * @param {FileInputExamplePropsShape} props.state.props
 * @returns {import('react').JSX.Element}
 */
export function FileInputExampleRender({
  state: {
    props: {
      acceptedFileTypes,
      className,
      errorMessage,
      hint,
      id,
      isDisabled,
      isRequired,
      label,
      multiple,
    },
  },
  innerRef,
}) {
  return (
    <FileInput
      acceptedFileTypes={acceptedFileTypes}
      className={className}
      errorMessage={errorMessage}
      hint={hint}
      id={id}
      innerRef={innerRef}
      isDisabled={isDisabled}
      isRequired={isRequired}
      label={label}
      multiple={multiple}
    />
  );
}
