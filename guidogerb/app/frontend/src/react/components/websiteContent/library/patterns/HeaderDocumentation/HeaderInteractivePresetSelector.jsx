import { Button, formElementSizesEnum } from 'design-system';

/**
 * @typedef PresetOption {
 *  @property {string} title
 * }
 */

/**
 * @param {object} props
 * @param {(e: import('react').MouseEvent, option: PresetOption) => void} props.onSelect this function is triggered when a selection is made
 * @param {PresetOption[]} props.options options to show as a list from which the user selects
 * @param {string} props.title title representing the preset list
 * @returns {import('react').JSX.Element}
 */
export function HeaderInteractivePresetSelector({
  onSelect,
  options,
  title,
}) {
  return (
    <div className="interactive-header-preset">
      <div className="interactive-header-preset__title">
        {title}
      </div>
      <div className="interactive-header-preset__options">
        {
          options.map((option) => (
            <div key={`${title}__${option.title}`} className="interactive-header-preset__single-option">
              <Button
                size={formElementSizesEnum.SMALL1X}
                id={`apply-option__${title}__${option.title}`}
                onClick={(e) => onSelect(e, option)}
              >
                {option.title}
              </Button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
