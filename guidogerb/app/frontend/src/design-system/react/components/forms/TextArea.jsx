import { useCallback, useRef } from 'react';
import { useAriaMessaging } from '../../contexts/DesignSystemContext/hooks/useAriaMessaging';
import { useRememberCursorPosition } from '../../hooks/useRememberCursorPosition';
import { joinClassNames } from '../../util/joinClassNames';
import { IconButton } from '../buttons/IconButton';
import { ErrorMessage } from './ErrorMessage';
import { RequiredStar } from './RequiredStar';

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.defaultValue]
 * @param {string} [props.errorMessage]
 * @param {import('react').RefObject<HTMLDivElement>} [props.innerRef]
 * @param {string} props.id
 * @param {boolean} [props.isClearable]
 * @param {boolean} [props.isDisabled]
 * @param {boolean} [props.isRequired]
 * @param {string} props.label
 * @param {string} [props.labelClassName]
 * @param {string} [props.name]
 * @param {import('react').ChangeEventHandler} [props.onChange]
 * @param {import('react').UIEventHandler} [props.onClear]
 * @param {string} [props.placeholder]
 * @param {string} [props.value]
 * @param {string} [props.wrapperClassName]
 * @returns {import('react').JSX.Element}
 */
export function TextArea({
  className,
  defaultValue,
  errorMessage,
  innerRef,
  id,
  isClearable,
  isDisabled,
  isRequired,
  label,
  labelClassName,
  name,
  onChange,
  onClear,
  placeholder,
  value,
  wrapperClassName,
  ...rest
}) {
  const inputRef = /** @type {typeof useRef<HTMLTextAreaElement | null>} */ (useRef)(null);

  const onChangeSetCursorPosition = useRememberCursorPosition(inputRef, value || '');

  const { addPoliteMessage } = useAriaMessaging();

  const showClearIcon = !!((isClearable || onClear) && value);

  const clearInput = useCallback(
    /** @param {import('react').UIEvent} e */
    (e) => {
      onClear?.(e);
      addPoliteMessage(`${label} input was cleared`);
      inputRef.current?.focus();
    },
    [addPoliteMessage, onClear, label]
  );

  const checkKeyPressed = useCallback(
    /** @param {import('react').KeyboardEvent} e */
    (e) => {
      if (e.key === 'Escape' && showClearIcon) {
        clearInput(e);
      }
    },
    [clearInput, showClearIcon]
  );

  const onChangeCallback = useCallback(
    /** @param {import('react').ChangeEvent<HTMLElement>} e */
    (e) => {
      onChangeSetCursorPosition(e);
      onChange?.(e);
    },
    [onChangeSetCursorPosition, onChange]
  );

  return (
    <div className={joinClassNames('input-wrapper', 'input-wrapper--text-area', wrapperClassName)} ref={innerRef}>
      <label htmlFor={id} className={joinClassNames('text-area__label', labelClassName)}>
        {label}
        {isRequired ? <RequiredStar /> : null}
      </label>
      <div className="text-area__inner-wrapper">
        <textarea
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          aria-invalid={!!errorMessage}
          className={joinClassNames(className, showClearIcon ? 'text-area--clear-icon-visible' : null)}
          defaultValue={defaultValue}
          disabled={isDisabled}
          id={id}
          name={name || id}
          onChange={value !== undefined ? onChangeCallback : undefined}
          onKeyUp={checkKeyPressed}
          placeholder={placeholder ?? undefined}
          ref={inputRef}
          required={isRequired}
          value={value}
          {...rest}
        />
        {
          (showClearIcon)
            ? (
              <IconButton
                className={joinClassNames('text-area__clear-button icon-button--borderless icon-button--small1x')}
                icon={<span className="ds-icon-before-x-icon" aria-hidden="true" />}
                onClick={clearInput}
                title="Clear input"
                isDisabled={isDisabled}
              />
            )
            : null
        }
      </div>
      <ErrorMessage errorMessage={errorMessage} id={id} />
    </div>
  );
}
