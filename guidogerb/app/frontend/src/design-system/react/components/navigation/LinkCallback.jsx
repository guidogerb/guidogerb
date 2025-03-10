/**
 * @param {object} props
 * @param {string} props.actionDescription a description to show to screen readers about what the callback will be performing
 * @param {import('react').MouseEventHandler} props.callback a function to call when the link is clicked
 * @param {import('react').ReactNode} props.children
 * @param {string} props.href the href to show in the link, but not for actual navigation
 * @returns {import('react').JSX.Element}
 */
export function LinkCallback({
  actionDescription,
  callback,
  children,
  href,
  ...rest
}) {
  return (
    <a href={href} onClick={(e) => { e.preventDefault(); e.stopPropagation(); callback(e); }} {...rest}>
      {children}
      <span className="ds-new-tab-link-a11y">
        <span className="visually-hidden">{actionDescription}</span>
      </span>
    </a>
  );
}
