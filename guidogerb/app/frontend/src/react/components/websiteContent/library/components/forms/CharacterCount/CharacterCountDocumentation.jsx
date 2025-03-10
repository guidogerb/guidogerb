/* eslint-disable max-len */
import {
  CharacterCount,
  Tab, TabGroup, TabList, TabPanel, TabPanels, TextArea
} from 'design-system';
import { Link } from 'react-router-dom';
import { pageUrls } from '../../../../../routing/pageUrls';
import { SandboxExample } from '../../../../../sandbox/SandboxExample';
import { StaticExample } from '../../../../../staticExamples/StaticExample';
import { CharacterCountCssClassesDocumentation } from './CharacterCountCssClassesDocumentation';
import { CharacterCountExampleCodeReact } from './CharacterCountExampleCodeReact';
import { CharacterCountExampleProps } from './CharacterCountExampleProps';
import { CharacterCountExampleRender } from './CharacterCountExampleRender';
import { CharacterCountPropsDocumentation } from './CharacterCountPropsDocumentation';

export function CharacterCountDocumentation() {
  return (
    <div className="documentation-content">
      <h1 id="h1-top">Character Count</h1>
      <p className="lead-in">
        A character count lets users know what the maximum number of characters is allowed within a text area input, and helps them keep track of the current count.
      </p>
      <hr />
      <h2 id="section-example">Example</h2>
      <SandboxExample
        defaultProps={{
          className: '',
          id: 'counter-id',
          maxLength: '50',
          text: '',
        }}
        RENDER_EXAMPLE={CharacterCountExampleRender}
        PROPS_EXAMPLE={CharacterCountExampleProps}
        CODE_EXAMPLE={CharacterCountExampleCodeReact}
      />
      <StaticExample
        title="Character count"
        renderedExample={(
          <div className="flex flex-col" style={{ width: '65%' }}>
            <TextArea
              id="character-count--example"
              label="Character Count"
              value="In Zion National Park expect to be welcomed by majestic views, people having fun, and quaint local attractions!"
              wrapperClassName="input-wrapper--mb-zero"
            />
            <CharacterCount
              id="character-count__character-count--example"
              maxLength={250}
              text="In Zion National Park expect to be welcomed by majestic views, people having fun, and quaint local attractions!"
            />
            <TextArea
              id="character-count-limit--example"
              label="Character Count Limit"
              value="Is this over the character limit?"
              wrapperClassName="input-wrapper--mb-zero"
            />
            <CharacterCount
              id="character-count-limit__character-count--example"
              maxLength={25}
              text="Is this over the character limit?"
            />
          </div>
        )}
      />
      <p>
        View more information on <Link to={pageUrls.textArea}> Text Area</Link>.
      </p>

      <h2 id="section-guidance" className="mb-spacing">Guidance</h2>
      <h3 id="section-when-to-use">When to use</h3>
      <ul className="mb-spacing">
        <li>
          <strong>Form validation.</strong>  If the text area has a character number requirement (whether it be technical or other), a character count is a great way to inform the user.
        </li>
      </ul>

      <h3 id="section-when-to-use-something-else">When to use something else</h3>
      <ul className="mb-spacing">
        <li><strong>Input mask.</strong> Typically, if a text input already has a mask associated with it (e.g. a phone number or zip code),  a character count can be redundant.</li>
        <li><strong>Increase the limit.</strong> If possible, try increasing the limit on the backend rather than restricting the user.</li>
      </ul>

      <h3 id="section-usability">Usability guidance</h3>
      <ul className="mb-spacing">
        <li>
          <strong>Position.</strong> Typically, the character count component should be located on the bottom right corner of the input.
        </li>
        <li>
          <strong>Real time update.</strong> To help the user keep track of the count, the component should be updating as the user is typing. Giving immediate feedback helps the user.
        </li>
        <li>
          <strong>Over the limit.</strong> When the user is close to or over the limit, inform them by highlighting the count.
        </li>
      </ul>

      <h3 id="section-accessibility" className="mb-spacing">Accessibility</h3>
      <h4 id="section-contrast">Contrast</h4>
      <ul className="mb-spacing">
        <li>The character count should have a contrast ratio of <code>4.5:1</code> with the background color to ensure legibility.</li>
      </ul>

      <h4 id="section-keyboard-interactivity">Keyboard interactivity</h4>
      <ul className="mb-spacing">
        <li>None.</li>
      </ul>
      <h4 id="section-screen-readers">Screen readers</h4>
      <ul className="mb-spacing">
        <li>
          Use an <code>aria-live=&quot;polite&quot;</code> region to notify the screen reader that the character count changed. You should wait for the user to pause before updating the aria-live region.
        </li>
      </ul>

      <h2 id="section-settings-props">Settings and Props</h2>
      <div className="documentation-content--small-text">
        <TabGroup defaultValue="character-count-props-css">
          <TabList>
            <Tab id="character-count-props-css">CSS</Tab>
            <Tab id="character-count-props-react">React</Tab>
          </TabList>
          <TabPanels>
            <TabPanel tabId="character-count-props-css">
              <CharacterCountCssClassesDocumentation />
            </TabPanel>
            <TabPanel tabId="character-count-props-react">
              <CharacterCountPropsDocumentation />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
