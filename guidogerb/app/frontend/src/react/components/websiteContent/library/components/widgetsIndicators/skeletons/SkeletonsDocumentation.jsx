/* eslint-disable max-len */
import { Link, NavLink } from 'react-router-dom';
import {
  Skeleton,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableRow,
  TableWrapper,
  skeletonTypes,
} from 'design-system';
import skeletonLazyScreenshot from '../../../../../../../static/images/mockups/skeletonLazyLoad.jpg';
import { LightBox } from '../../../../../lightbox/LightBox';
import { pageUrls } from '../../../../../routing/pageUrls';
import { StaticExample } from '../../../../../staticExamples/StaticExample';
import { IconsWebsite } from '../../../../IconsWebsite';
import { SandboxExample } from '../../../../../sandbox/SandboxExample';
import { SkeletonExampleCodeReact } from './SkeletonExampleCodeReact';
import { SkeletonExampleProps } from './SkeletonExampleProps';
import { SkeletonExampleRender } from './SkeletonExampleRender';
import { SkeletonCssClassesDocumentation } from './SkeletonCssClassesDocumentation';
import { SkeletonPropsDocumentation } from './SkeletonPropsDocumentation';

export function SkeletonsDocumentation() {
  return (
    <div className="documentation-content">
      <h1 id="h1-top">Skeletons</h1>
      <p className="lead-in">
        A set of loading placeholders can provide a non-interactive glimpse of the application&apos;s content, indicating
        that the content is currently being loaded and minimizing frustration caused by long load times.
      </p>

      <hr />

      <h2 id="section-example">Example</h2>
      <SandboxExample
        defaultProps={{
          className: '',
          type: skeletonTypes.RECTANGULAR,
        }}
        CODE_EXAMPLE={SkeletonExampleCodeReact}
        PROPS_EXAMPLE={SkeletonExampleProps}
        RENDER_EXAMPLE={SkeletonExampleRender}
      />

      <StaticExample
        title="Skeleton Shapes"
        renderedExample={(
          <div className="flex flex-col items-start gap-xs" aria-busy="true">
            <Skeleton className="skeleton--circle" />
            <Skeleton className="skeleton--line" />
            <Skeleton className="skeleton--line" />
            <Skeleton className="skeleton--rectangle" />
          </div>
        )}
        quickTips={(
          <ul>
            <li>
              The skeleton component uses basic shape variants:
              <ul>
                <li><code>Thin rectangles</code> represents a single line of text.</li>
                <li><code>Circular</code> and <code>rectangular</code> shapes allow you to adjust the size of the shapes to mimic the content that is
                  being loaded.
                </li>
              </ul>
            </li>
          </ul>
        )}
      />

      <StaticExample
        title="Skeleton Variations"
        renderedExample={(
          <div className="flex gap">
            <div>
              <div className="flex flex-col items-center gap-xs white-color-background p-spacing radius-s" aria-busy="true">
                <Skeleton className="skeleton--circle" />
                <Skeleton className="skeleton--line" />
                <Skeleton className="skeleton--line" />
              </div>
              <div className="border-top mt-spacing-s pt-spacing-s">
                <span>
                  <strong className="mr-spacing-s">Loading data</strong>
                </span>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center gap-xs white-color-background p-spacing radius-s">
                <div className="color-example_item color-example_item--primary-color flex items-center justify-center">
                  {IconsWebsite.IconA11y({
                    className: 'white-text skeleton-icon-example',
                    isHidden: true,
                  })}
                </div>
                <h4>Accessibility</h4>
                <span><NavLink to={pageUrls.accessibility}>Accessibility overview page</NavLink>.</span>
              </div>
              <div className="border-top mt-spacing-s pt-spacing-s">
                <span>
                  <strong className="mr-spacing-s">Content filled</strong>
                </span>
              </div>
            </div>
          </div>
        )}
        quickTips={(
          <ul>
            <li>
              Skeleton container sizes and elements remain consistent across different users, even though the specific
              text and icons in each content area may differ. This consistency helps prepare users for the content that will eventually fill in. To
              ensure the
              best possible user experience, it&apos;s ideal for each content area to load at the same time.
            </li>
          </ul>
        )}
      />

      <StaticExample
        title="Within a container"
        renderedExample={(
          <TableWrapper className="full-width">
            <Table id="skeleton-table" className="table table--lines-x table--v-align-center table--full-width" aria-busy="true">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Age</TableHeadCell>
                  <TableHeadCell>City</TableHeadCell>
                  <TableHeadCell>Animal</TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {[...Array(5)
                  .keys()].map((i) => (
                    <TableRow key={`skeleton-key-${i}`}>
                      <TableCell><Skeleton className="skeleton--line auto-width" /></TableCell>
                      <TableCell><Skeleton className="skeleton--line auto-width" /></TableCell>
                      <TableCell><Skeleton className="skeleton--line auto-width" /></TableCell>
                      <TableCell><Skeleton className="skeleton--line auto-width" /></TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        )}
        quickTips={(
          <ul>
            <li>
              Skeleton is a tool that can be employed to specify particular elements on a web page that fall within a set boundary. For example, when
              using a table, the
              placeholders of the skeleton stand-in for text while the data loads. Once the data has loaded, the placeholders of the skeleton will all
              be replaced at once.
            </li>
          </ul>
        )}
      />

      <StaticExample
        title="Progressive Loading"
        renderedExample={(
          <LightBox image={skeletonLazyScreenshot} alt="Skeleton Progressive Load" className="flex-3up-gap" />
        )}
        quickTips={(
          <ul>
            <li>
              Progressive loading occurs when individual elements become visible on a page as soon as they&apos;re loaded, rather than displaying all
              at once.
            </li>
          </ul>
        )}
      />

      <StaticExample
        title="Lazy Loading"
        renderedExample={(
          <LightBox image={skeletonLazyScreenshot} alt="Skeleton Lazy Load" className="flex-3up-gap" />
        )}
        quickTips={(
          <ul>
            <li>
              The technique of &quot;Lazy Loading&quot; is frequently utilized to enhance performance by loading a batch of
              data upfront and then loading subsequent batches as required.
            </li>
          </ul>
        )}
      />

      <h2 id="section-guidance" className="mb-spacing">Guidance</h2>
      <h3 id="section-when-to-use">When to use</h3>
      <ul>
        <li><strong>Data is not immediately available.</strong> When the data for your components isn&apos;t immediately accessible, utilizing
          skeletons can help enhance the perceived responsiveness of the page.
        </li>
        <li><strong>To capture users&apos; attention.</strong> In situations where a loading <Link to={pageUrls.spinners}>spinner</Link> lacks
          visibility and prominence, use a loading skeleton to provide a better user experience.
        </li>
        <li><strong>Multiple elements loading.</strong> When there&apos;s more than one element loading at the same time and an indicator is required.
        </li>
        <li><strong>High traffic sites.</strong> Use on high-traffic pages.</li>
        <li><strong>More than .3 seconds to load the page.</strong> Use when data takes more than <code>300ms</code> to load on an average connection.
        </li>
        <li><strong>Reducing cognitive load.</strong> Skeleton screens offer an alternative to the conventional
          <Link to={pageUrls.spinners}>spinner</Link> approach. Instead of displaying an abstract widget,
          they generate anticipation by providing a preview
          of what&apos;s to come, ultimately reducing cognitive load.
        </li>
      </ul>

      <h3 id="section-when-to-use-something-else">When to use something else</h3>
      <ul className="mb-spacing">
        <li><strong>Long-running processes.</strong> For tasks such as file conversions, uploads/downloads, exporting reports, or data importing,
          it&apos;s better to use <Link to={pageUrls.progressBars}>progress bars</Link> and/or text that detail each stage of the process.
        </li>
        <li><strong>Fast processes.</strong> For fast processes that take less than <code>300ms</code>, a loading indicator (skeleton or
          <Link to={pageUrls.spinners}>spinner</Link>) is not necessary.
        </li>
        <li><strong>Clicking a button.</strong> When dealing with small, inline actions or feedback, such as clicking a button that may take some time
          to process, it&apos;s preferable to use a loading <Link to={pageUrls.spinners}>spinner</Link> instead of a skeleton.
        </li>
        <li><strong>Content with flair.</strong> Consider using a choreographed or stylized entrance. Unlike a loading skeleton, these entrances
          don&apos;t depend on loading time. For example, reveal each section with a fade as the user scrolls down the page.
        </li>
        <li><strong>Video content.</strong> <Link to={pageUrls.spinners}>Spinners</Link> are widely recognized as the industry-standard indicator for
          video buffering, so it&apos;s advisable to adhere to this convention.
        </li>
      </ul>

      <h3 id="section-usability">Usability guidance</h3>
      <ul className="mb-spacing">
        <li><strong>Creating the perception of speed.</strong> The skeleton gives the feeling of speed and has been proven to make wait times more
          bearable by shifting focus to the loading indicator rather than the actual wait time.
        </li>
        <li><strong>Shape.</strong> Loading placeholders are designed to mimic the shape and form of the eventual content that will be loaded. This
          includes ensuring that the width, height, and line-heights of any text match those of the actual components.
        </li>
        <li><strong>Position.</strong> Loading placeholders are usually placed in the exact same location as the live elements they stand in for,
          which helps to maintain the page&apos;s layout and prevent any visual disruption that might occur from elements shifting around.
        </li>
        <li><strong>Style.</strong> Be subtle with your design because it&apos;s not a real interactive interface. (In other words, keep it basic and
          gray.)
        </li>
        <li>
          <strong>CSS.</strong> You might need to alter a skeleton with and height with CSS to fit your needs.
          The Design System component is not intended as a standard size.
        </li>
      </ul>

      <h3 id="section-accessibility" className="mb-spacing">Accessibility</h3>
      <h4 id="section-contrast">Contrast</h4>
      <ul className="mb-spacing">
        <li>To ensure good visibility under favorable conditions, such as adequate ambient light, a high-quality screen, and no visual impairments,
          the background color of the skeleton is chosen to have the lowest possible luminance required.
        </li>
        <li>For skeletons that are critical to the user experience, the boundaries of the shapes contained within the skeleton must maintain a
          minimum <code>3:1</code> contrast ratio against the background.
        </li>
      </ul>

      <h4 id="section-keyboard-interactivity">Keyboard interactivity</h4>
      <ul className="mb-spacing">
        <li>The skeleton is not focusable.</li>
      </ul>

      <h4 id="section-screen-readers">Screen readers</h4>
      <ul className="mb-spacing">
        <li>
          Add <code>aria-busy=&quot;true&quot;</code> to a container or element to indicate the element is loading. Once loaded, change the value
          from <code>true</code> to <code>false</code>. For example:
          <ul>
            <li>If loading an entire page, add the attribute to the <code>&lt;body&gt;</code> or wrapper.</li>
            <li>If loading a specific component (i.e., table), add the attribute to the container of that component.</li>
            <li>If loading content inside a <Link to={pageUrls.modals}>modal</Link>, add the attribute to the modal container.</li>
          </ul>
        </li>
      </ul>

      <h4 id="section-screen-readers">Motion</h4>
      <ul className="mb-spacing">
        <li>
          As per the WCAG guidelines, it is recommended to permit users to disable superfluous animation, as certain users may become
          unfocused or encounter adverse effects like vertigo or queasiness from animated material. This can be achieved by ensuring
          that any animation ceases after five seconds, and non-essential motion such as loading dots can be turned off by users.
        </li>
      </ul>

      <h2 id="section-settings-props">Settings and Props</h2>
      <div className="documentation-content--small-text">
        <TabGroup defaultValue="skeleton-props-css">
          <TabList>
            <Tab id="skeleton-props-css">CSS</Tab>
            <Tab id="skeleton-props-react">React</Tab>
          </TabList>
          <TabPanels>
            <TabPanel tabId="skeleton-props-css">
              <SkeletonCssClassesDocumentation />
            </TabPanel>
            <TabPanel tabId="skeleton-props-react">
              <SkeletonPropsDocumentation />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
