import { useCallback, useRef } from 'react';
import { useAriaMessaging } from '../../contexts/DesignSystemContext/hooks/useAriaMessaging';
import { useRememberCursorPosition } from '../../hooks/useRememberCursorPosition';
import { joinClassNames } from '../../util/joinClassNames';
import { IconButton } from '../buttons/IconButton';
import { ErrorMessage } from './ErrorMessage';
import { useMultiSelectContext } from './MultiSelect/context/useMultiSelectContext';
import { RequiredStar } from './RequiredStar';

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').MutableRefObject<HTMLButtonElement | null>} [props.clearIconRef]
 * @param {string} [props.defaultValue]
 * @param {string} [props.errorMessage]
 * @param {string} props.id
 * @param {import('react').Ref<HTMLDivElement>} [props.innerRef]
 * @param {boolean} [props.isClearable] should the clearable "X" icon be shown; is auto set to true if onClear is passed in
 * @param {boolean} [props.isDisabled]
 * @param {boolean} [props.isInvalid]
 * @param {boolean} [props.isLabelSkipped] highly recommended to not skip the label; instead, hide it; multiselect skips label - it renders its own
 * @param {boolean} [props.isRequired]
 * @param {boolean} [props.isShowingClearableIcon] if `isClearable` is true, this can override the logic for showing the clearable `x`
 * @param {string} props.label
 * @param {string} [props.labelClassName]
 * @param {string} [props.name]
 * @param {import('react').ChangeEventHandler<HTMLInputElement>} [props.onChange] can be omitted to be uncontrolled
 * @param {import('react').KeyboardEventHandler<HTMLInputElement>} [props.onKeyUp]
 * @param {import('react').UIEventHandler<HTMLInputElement>} [props.onClear]
 * @param {string} [props.placeholder]
 * @param {import('react').ReactNode} [props.rightContent] custom content to put to the right of the text input
 * @param {string} [props.value]
 * @param {string} [props.wrapperClassName]
 * @returns {import('react').JSX.Element}
 */
export function TextInput({
  className,
  clearIconRef,
  defaultValue,
  errorMessage,
  innerRef,
  id,
  isClearable,
  isDisabled,
  isInvalid,
  isLabelSkipped,
  isRequired,
  isShowingClearableIcon,
  label,
  labelClassName,
  name,
  onChange,
  onClear,
  onKeyUp,
  placeholder,
  rightContent,
  value,
  wrapperClassName,
  ...rest
}) {
  const inputRef = /** @type {typeof useRef<HTMLInputElement>} */ (useRef)(null);
  const [multiSelectContext] = useMultiSelectContext();

  const onChangeSetCursorPosition = useRememberCursorPosition(inputRef, value || '');

  const { addPoliteMessage } = useAriaMessaging();

  const showClearIcon = isShowingClearableIcon ?? !!((isClearable || onClear) && value);

  const clearInput = useCallback(
    /** @param {import('react').UIEvent<HTMLInputElement>} e */
    (e) => {
      if (onClear) {
        onClear(e);
      } else if (inputRef.current) {
        inputRef.current.value = '';
      }
      addPoliteMessage(`${label} input was cleared`);
      inputRef.current?.focus();
    },
    [addPoliteMessage, onClear, label]
  );

  const checkKeyPressed = useCallback(
    /** @param {import('react').KeyboardEvent<HTMLInputElement>} e */
    (e) => {
      if (e.key === 'Escape' && showClearIcon) {
        clearInput(e);
      }
    },
    [clearInput, showClearIcon]
  );

  const onChangeCallback = useCallback(
    /** @param {import('react').ChangeEvent<HTMLInputElement>} e */
    (e) => {
      onChangeSetCursorPosition(e);
      onChange?.(e);
    },
    [onChangeSetCursorPosition, onChange]
  );

  return (
    <div className={joinClassNames('input-wrapper', 'input-wrapper--text-input', wrapperClassName)} ref={innerRef}>
      {
        isLabelSkipped
          ? null
          : (
            <label htmlFor={id} className={labelClassName ?? undefined}>
              {label}
              {isRequired ? <RequiredStar /> : null}
            </label>
          )
      }
      <div className="text-input__inner-wrapper">
        <input
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          aria-invalid={!!errorMessage || isInvalid}
          className={joinClassNames(
            className,
            showClearIcon ? 'text-input--clear-icon-visible' : null,
            // if inside a multi-select, don't draw red border
            multiSelectContext.multiSelectId === 'default-context-value' ? null : 'inside-invalid-wrapper'
          )}
          defaultValue={defaultValue}
          disabled={isDisabled}
          id={id}
          name={name || id}
          onChange={onChange && onChangeCallback}
          onKeyUp={onKeyUp || checkKeyPressed}
          placeholder={placeholder || undefined}
          ref={inputRef}
          required={isRequired}
          type="text"
          value={value}
          {...rest}
        />
        {
          (showClearIcon)
            ? (
              <IconButton
                className={joinClassNames('text-input__clear-button icon-button--borderless icon-button--small1x')}
                icon={<span className="ds-icon-before-x-icon" aria-hidden="true" />}
                innerRef={clearIconRef}
                isDisabled={isDisabled}
                // @ts-expect-error
                onClick={clearInput}
                title="Clear input"
              />
            )
            : null
        }
        {rightContent}
      </div>
      <ErrorMessage errorMessage={errorMessage} id={id} />
    </div>
  );
}
