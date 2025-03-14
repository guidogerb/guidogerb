import { Skeleton } from 'design-system';
/** @typedef {import('design-system-website').SkeletonExamplePropsShape} SkeletonExamplePropsShape */

/**
 * @param {object} props
 * @param {import('react').RefObject<HTMLDivElement>} props.innerRef
 * @param {object} props.state
 * @param {SkeletonExamplePropsShape} props.state.props
 * @returns {import('react').JSX.Element}
 */
export function SkeletonExampleRender({
  state: {
    props: {
      className,
      type,
    },
  },
  innerRef,
}) {
  return (
    <div ref={innerRef} aria-busy="true">
      <Skeleton
        className={className}
        type={type}
      />
    </div>
  );
}
