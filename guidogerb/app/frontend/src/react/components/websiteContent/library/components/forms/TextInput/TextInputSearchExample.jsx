import { joinClassNames, useBanner } from 'design-system';
import { useState } from 'react';

export function TextInputSearchExample() {
  const [query, setQuery] = useState('');
  const { addBanner } = useBanner();
  const search = /** @type {import('react').FormEventHandler} */ (
    (e) => {
      e.preventDefault();
      addBanner({ message: `You have searched for "${query}"!` });
    }
  );

  return (
    <div className="search-page">
      <form className="search-modal__form hcenter" role="search" aria-label="Sitewide" autoComplete="off" onSubmit={search}>
        <span className="ds-icon-before-search search-modal__icon-search vcenter" aria-hidden="true" />
        <label htmlFor="search-example-id" className="search-modal__input-label visually-hidden">Enter your search terms</label>
        <input type="text" id="search-example-id" className="search-modal__input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
        <div className={joinClassNames('search-modal__button-wrapper vcenter', !query.length && 'visually-hidden')}>
          <button type="button" className="search-modal__button button button--solid button--primary-color" onClick={search}>Search Now</button>
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div aria-hidden tabIndex={0} className="search-modal__hidden-last-focusable visually-hidden">end of search form example</div>
      </form>
    </div>
  );
}
