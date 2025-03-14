import { IconButton, useBanner } from 'design-system';
import React from 'react';

/** @typedef {import('design-system-website').IconButtonExampleProps} IconButtonExampleProps */

/**
 * @param {{state: {props: IconButtonExampleProps}, innerRef: React.MutableRefObject<HTMLButtonElement>}} props
 * @returns {import('react').ReactElement}
 */
export function IconButtonExampleRender({
  state: {
    props: {
      appearance,
      color,
      iconCssClass,
      id,
      isDisabled,
      size,
      title,
    },
  },
  innerRef,
}) {
  const { addBanner } = useBanner();
  return (
    <IconButton
      appearance={appearance}
      color={color}
      icon={<span className={`ds-icon-before-${iconCssClass}`} aria-hidden="true" />}
      id={id}
      innerRef={innerRef}
      isDisabled={isDisabled}
      onClick={() => addBanner({ message: 'You have clicked the icon button.' })}
      size={size}
      title={title || ''}
    />
  );
}
