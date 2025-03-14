/* eslint-disable max-len */
import { ExternalLink } from 'design-system';
import { PreCodeForCodeString } from '../../../../../preCode/PreCodeForCodeString';
import { StaticExample } from '../../../../../staticExamples/StaticExample';

export function BlockquoteDocumentation() {
  return (
    <div className="documentation-content">
      <h1 id="h1-top">Block Quote</h1>
      <p className="lead-in"> A block quote is a concise excerpt that can be accompanied by an external citation and the corresponding URL. It is intentionally set apart from the main body of text, creating visual distinction and emphasis. </p>

      <hr />

      <h2 id="section-example">Examples</h2>
      <StaticExample
        className="static-example--blank"
        title="Quotes using a chiclet"
        renderedExample={(
          <>
            <p className="full-width mb-auto">
              Arches National Park is a geological marvel, boasting over 2,000 natural stone arches, soaring pinnacles, and massive balanced rocks.
            </p>
            <blockquote cite="https://www.nps.gov/" className="block-quote mb-auto">
              Earth wears down. Some rocks give way while others stand solid. They form a foundation for nature to build arches, buttes, bridges, and
              more.
              These features captivate the imagination. Pure art, we wonder how some still stand.<br />
              <cite className="float-right"><ExternalLink href="https://www.nps.gov/">- nps.gov</ExternalLink></cite>
            </blockquote>
            <p className="full-width mb-auto">
              This breathtaking landscape offers a stunning display of nature’s artistry, sculpted over millions of years by the forces of erosion.
            </p>
          </>
        )}
        quickTips={(
          <ul>
            <li>This block quote uses a chiclet (vertical line to the left of the quote) as a way to highlight its content.</li>
          </ul>
        )}
      />
      <StaticExample
        className="static-example--blank"
        title="Quotes using quotation marks"
        renderedExample={(
          <>
            <p className="full-width mb-auto">
              Arches National Park is a geological marvel, boasting over 2,000 natural stone arches, soaring pinnacles, and massive balanced rocks.
            </p>
            <blockquote cite="https://www.nps.gov/" className="block-quote block-quote--quotation-marks mb-auto">
              Earth wears down. Some rocks give way while others stand solid. They form a foundation for nature to build arches, buttes, bridges, and more.
              These features captivate the imagination. Pure art, we wonder how some still stand.<br />
              <cite className="float-right"><ExternalLink href="https://www.nps.gov/">- nps.gov</ExternalLink></cite>
            </blockquote>
            <p className="full-width mb-auto">
              This breathtaking landscape offers a stunning display of nature’s artistry, sculpted over millions of years by the forces of erosion.
            </p>
          </>
        )}
        quickTips={(
          <ul>
            <li>This block quote uses quotation marks.</li>
          </ul>
        )}
      />

      <h2 id="section-guidance" className="mb-spacing mt-spacing">Guidance</h2>
      <h3 id="section-when-to-use">When to use</h3>
      <ul className="mb-spacing">
        <li>
          <strong>Two ways.</strong> Block quotes can be used in one of two ways:
          <ul>
            <li>
              <strong>Highlighting a key message.</strong> A short snippet extracted from the main content to highlight and emphasize a key message.  Sometimes this is referred to as a “Pull Quote”, because you are “pulling” copy from the main content.  This does not include a citation or source.
            </li>
            <li>
              <strong>Quoting and citing an outside source.</strong> To separate a large section of text, quote from an outside source that is relevant to the source material at hand.
            </li>
          </ul>
        </li>
        <li>
          <strong>Highlighting content.</strong> Utilize a block quote to highlight content that exhibits a strong and pertinent connection to the surrounding text, aiding users in visual scanning of the page.
        </li>
        <li>
          <strong>Marketing a product or service.</strong> Use to encourage visitors to try a new product/service or emphasizing a success story.
        </li>
        <li>
          <strong>Attracting attention.</strong> Attracting the user&apos;s attention to article text.
        </li>
        <li>
          <strong>Breaking up a large body of text.</strong>
        </li>
        <li>
          <strong>Providing visual markers.</strong>
        </li>
      </ul>

      <h3 id="section-when-to-use-something-else">When to use something else</h3>
      <ul className="mb-spacing">
        <li>
          <strong>Indenting text.</strong> Do not use the blockquote to indent text.
        </li>
        <li>
          <strong>Inline quotation.</strong> To include shorter quotes inline rather than in a separate block, use the <code>&lt;q&gt;</code> (quotation) element.
        </li>
      </ul>

      <h3 id="section-usability">Usability guidance</h3>
      <ul className="mb-spacing">
        <li>
          Put the block quote in a <code>&lt;blockquote&gt;</code> tag.
        </li>
        <li>
          When to include quotation marks to the copy between the <code>&lt;blockquote&gt;</code> tags:
          <ul>
            <li>
              <strong>Not using a chiclet:</strong> If you are not using a chiclet (i.e. the vertical line to the left of your quote), you don&apos;t need to include quotation marks in your block quote copy – the blockquote style will add the quotation marks for you.
            </li>
            <li>
              <strong>Using a chiclet:</strong> If you are using a chiclet, you will want to add the quotation marks to the copy inside the block quote tags. (e.g.<code>&lt;blockquote&gt;“Welcome to Utah!”&lt;blockquote&gt;</code>).
            </li>
            <li>Position the quote near the surrounding text.</li>
            <li>Keep text brief.</li>
            <li>It is recommended to use an em-dash (—) before the citation/attribution.</li>
            <li>Use <code>&lt;cite&gt;</code> tags when attributing the quote source.</li>
            <li>Consider if the blockquote adds value to the page.</li>
            <li>Minimize the use of blockquotes on a page - do not stack them if possible.</li>
          </ul>
        </li>
      </ul>

      <PreCodeForCodeString
        showBackgroundColor
        codeRaw={(`
              <figure>
                <blockquote cite="https://visitutah.com/Places-To-Go" class="block-quote">
                    <p>These natural landscape are designated as national parks, national monuments, national forests, state parks and millions of acres of open spaces with no official designation save for "Utah".</p>
                </blockquote>
                <figcaption>- Office of Tourism,
                    <cite> Visit Utah</cite>
                </figcaption>
              </figure>
            `)}
      />

      <h3 id="section-accessibility" className="mb-spacing">Accessibility</h3>
      <h4 id="section-contrast">Contrast</h4>
      <ul className="mb-spacing">
        <li>The text in the blockquote must maintain a <code>4.5:1</code> contrast ratio against the background.</li>
        <li>The graphical elements that differentiate the block quote from the rest of the text should ideally maintain a <code>3:1</code> contrast ratio.</li>
      </ul>

      <h4 id="section-keyboard-interactivity">Keyboard interactivity</h4>
      <ul className="mb-spacing">
        <li>None</li>
      </ul>

      <h4 id="section-screen-readers">Screen readers</h4>
      <ul className="mb-spacing">
        <li>
          Remember: The first rule of ARIA: Before you use ARIA,
          use native HTML elements or attributes first!
        </li>
        <li>
          All recommendations listed for paragraphs apply to this component.
        </li>
        <li>
          Screen readers use the <code>&lt;blockquote&gt;</code> element to:
          <ul>
            <li>Provide semantic understanding of page content by announcing blockquote as a quote</li>
          </ul>
        </li>
        <li>
          To make the blockquote content accessible, use the <code>&lt;cite&gt;</code> attribute with a valid URL.
        </li>
      </ul>
    </div>
  );
}
