import { joinClassNames } from 'design-system';

/**
 * @param {object} props
 * @param {string} props.className
 * @returns {import('react').JSX.Element}
 */
export function LinkIcon({ className }) {
  return (
    <span className={joinClassNames(['ds-icon-before-chevron-right', className])} aria-hidden="true" />
  );
}
