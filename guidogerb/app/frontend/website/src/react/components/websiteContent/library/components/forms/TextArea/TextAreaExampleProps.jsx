import {
  Form,
  Switch,
  TextInput
} from 'design-system';
import { useFormState } from '../../../../../../hooks/useFormState';

/** @typedef {import('design-system-website').TextAreaExamplePropsShape} TextAreaExamplePropsShape */

/**
 * @param {object} props
 * @param {import('use-immer').Updater<{props: TextAreaExamplePropsShape}>} props.setState
 * @param {object} props.state
 * @returns {import('react').JSX.Element}
 */
export function TextAreaExampleProps({ setState, state }) {
  const { onChange, valueFn } = useFormState(state, setState);
  return (
    <Form className="form--stacked">
      <TextInput
        id="props.className"
        className="input--height-small1x"
        label="Class"
        onChange={onChange}
        value={valueFn('props.className')}
      />
      <TextInput
        id="props.errorMessage"
        className="input--height-small1x"
        label="Error Message"
        onChange={onChange}
        value={valueFn('props.errorMessage')}
      />
      <TextInput
        id="props.id"
        className="input--height-small1x"
        label="ID"
        onChange={onChange}
        value={valueFn('props.id')}
      />
      <Switch
        id="props.isClearable"
        label="Clearable"
        // @ts-expect-error
        onChange={onChange}
        value={valueFn('props.isClearable')}
        width={20}
      />
      <Switch
        id="props.isDisabled"
        label="Disabled"
        // @ts-expect-error
        onChange={onChange}
        value={valueFn('props.isDisabled')}
        width={20}
      />
      <Switch
        id="props.isRequired"
        label="Required"
        // @ts-expect-error
        onChange={onChange}
        value={valueFn('props.isRequired')}
        width={20}
      />
      <TextInput
        id="props.label"
        className="input--height-small1x"
        label="Label"
        onChange={onChange}
        value={valueFn('props.label')}
      />
      <TextInput
        id="props.placeholder"
        className="input--height-small1x"
        label="Placeholder"
        onChange={onChange}
        value={valueFn('props.placeholder')}
      />
      <TextInput
        id="props.value"
        className="input--height-small1x"
        label="Value"
        onChange={onChange}
        value={valueFn('props.value')}
      />
    </Form>
  );
}
