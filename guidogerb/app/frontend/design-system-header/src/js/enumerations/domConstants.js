/**
 * @param {string | string[]} domConstants - the class or classes to which to prefix a period, multiples will be combined as a single selector
 * ie: `.class1.class2` instead of `.class1 .class2`
 * @returns {string} the combined classes
 */
export function getCssClassSelector(domConstants) {
  return `.${(Array.isArray(domConstants) ? domConstants : [domConstants]).join('.')}`;
}

/**
 * An enum for CSS classes used in the guidogerbpublishing.com header
 * @enum {string}
 */
export const domConstants = {
  // Global Information
  UTAH_DESIGN_SYSTEM: 'design-system',
  HEADER: 'ds-header',
  FOOTER: 'ds-footer',

  // HTML elements
  ICON_BUTTON: 'icon-button',

  // IDs
  CSS_HEADER_MEDIA_TAG_ID: 'cssHeaderMediaTag',

  // Modifiers
  IS_CLOSED: 'is-closed',
  IS_OPEN: 'is-open',
  VISUALLY_HIDDEN: 'visually-hidden',

  // Replacement Placeholders
  MEDIA_SIZE__MOBILE__PLACEHOLDER: 'media-size__mobile__PLACEHOLDER',
  MEDIA_SIZE__TABLET_LANDSCAPE__PLACEHOLDER: 'media-size__tablet-landscape__PLACEHOLDER',
  MEDIA_SIZE__TABLET_PORTRAIT__PLACEHOLDER: 'media-size__tablet-portrait__PLACEHOLDER',

  // Header Components
  ACTION_ITEM: 'ds-header-action-item',
  ACTION_ITEM__ICON_BUTTON: 'ds-header-action-item__icon-button',
  ACTION_ITEM__ICON_BUTTON_TITLE: 'ds-header-action-item__icon-button--has-title',
  ACTION_ITEM__TITLE: 'ds-header-action-item__title',
  ACTION_ITEMS__WRAPPER: 'ds-action-items-wrapper',

  BADGE__LABEL: 'ds-badge__label',
  BADGE__VALUE: 'ds-badge__value',
  BADGE_WRAPPER: 'ds-badge__wrapper',
  BADGE_WRAPPER__SMALL: 'ds-badge__wrapper--small',
  BADGE_WRAPPER__ACTION_ITEM: 'ds-badge__wrapper--action-item',

  CITIZEN_EXPERIENCE: 'ds-citizen-experience-wrapper',
  CITIZEN_EXPERIENCE_MOBILE: 'ds-citizen-experience-wrapper--mobile',

  FOOTER_COPYRIGHT_YEAR: 'ds-footer__copyright-year',
  FOOTER_HORIZONTAL_DIVIDER: 'ds-footer__horizontal-divider',
  FOOTER_LINK_PRIVACY_ID: 'ds-footer-privacy-link',
  FOOTER_LINK_TERMS_ID: 'ds-footer-terms-link',
  FOOTER_LINKS: 'ds-footer__links',

  LOGO: 'ds-logo-wrapper',
  LOGO_OFFICIAL_CLOSE_BUTTON: 'ds-official-website-popup__close-button',
  LOGO_OFFICIAL_WRAPPER: 'ds-official-website-popup__wrapper',
  LOGO_SVG: 'logo-svg',
  LOGO_VERT_LINE: 'ds-logo-vert-line',

  MAIN_MENU: 'main-menu__wrapper',
  MAIN_MENU__HAMBURGER: 'main-menu__hamburger',
  MAIN_MENU__HAMBURGER_ID: 'ds-main-menu__hamburger',
  MAIN_MENU__HAMBURGER_ICON_ID: 'ds-main-menu__hamburger-icon',
  MAIN_MENU__MENU_TOP: 'main-menu__menu-top',
  MAIN_MENU__NAV: 'main-menu__nav',
  MAIN_MENU__OUTER: 'main-menu__outer',
  MAIN_MENU__REMOVED: 'main-menu-is-removed',
  MAIN_MENU__SEARCH: 'main-menu__search',
  MAIN_MENU__TITLE: 'main-menu__title',

  MENU_ITEM: 'menu-item',
  MENU_ITEM__ARROW: 'menu-item__menu-arrow',
  MENU_ITEM__BUTTON_TITLE: 'menu-item__button-title',
  MENU_ITEM__LINK_TITLE: 'menu-item__link-title',
  MENU_ITEM__LINK_TITLE_SPAN: 'menu-item__link-title-span',
  MENU_ITEM__SELECTED: 'menu-item--selected',
  MENU_ITEM__SELECTED_PARENT: 'menu-item--selected_parent',
  MENU_ITEM__TITLE: 'menu-item__title',
  MENU_ITEM__FLY_OUT: 'menu-item--fly_out',
  MENU_ITEM__INLINE: 'menu-item--inline',
  MENU_ITEM__MEGA_MENU: 'menu-item--mega-menu',

  DESKTOP__HIDDEN: 'ds-header-desktop--hidden',
  MOBILE__HIDDEN: 'ds-header-mobile--hidden',
  MOBILE__UTAH_ID: 'ds-header-mobile__id-wrapper',
  MOBILE__VIP_ACTION_ITEMS__LEFT: 'ds-header-mobile__vip-action-items--left',
  MOBILE__VIP_ACTION_ITEMS__RIGHT: 'ds-header-mobile__vip-action-items--right',

  ACTION_ITEM__SELECTED: 'ds-header-mobile-menu__action-item--selected',
  MOBILE_MENU: 'ds-header-mobile-menu',
  MOBILE_MENU__ACTION_BAR: 'ds-header-mobile-menu__action-bar',
  MOBILE_MENU__BACKDROP: 'ds-header-mobile-menu__backdrop',
  MOBILE_MENU__CONTENT: 'ds-header-mobile-menu__content',
  MOBILE_MENU__CONTENT_ITEM: 'ds-header-mobile-menu__content-item',
  MOBILE_MENU__LAST_FOCUSABLE: 'ds-header-mobile-menu__hidden-last-focusable',
  MOBILE_MENU__WRAPPER: 'ds-header-mobile-menu__wrapper',

  MOBILE_MENU_ACTON_BAR__HOME_ID: 'ds-header-mobile-menu_action-bar__home',
  MOBILE_MENU_ACTON_BAR__PROFILE_ID: 'ds-header-mobile-menu_action-bar__profile',
  MOBILE_MENU_ACTION_BAR__ACTION_ITEM_WRAPPER: 'ds-header-mobile-menu__action-item',

  VERTICAL_MENU: 'vertical-menu',
  VERTICAL_MENU__BUTTON_TITLE: 'vertical-menu__button-title',
  VERTICAL_MENU__CHEVRON: 'vertical-menu__chevron',
  VERTICAL_MENU__DIVIDER: 'vertical-menu__divider',
  VERTICAL_MENU__LINK_TEXT: 'vertical-menu__link-text',
  VERTICAL_MENU__LINK_TITLE: 'vertical-menu__link-title',
  VERTICAL_MENU__PLAIN_TITLE: 'vertical-menu__plain-title',
  VERTICAL_MENU__TITLE: 'vertical-menu__title',

  VERTICAL_MENU_WRAPPER__WRAPPER: 'vertical-menu__wrapper',
  VERTICAL_MENU_WRAPPER__WRAPPER_TITLE: 'vertical-menu__wrapper-title',

  POPUP__HIDDEN: 'popup__wrapper--hidden',
  POPUP__VISIBLE: 'popup__wrapper--visible',
  POPUP__WRAPPER: 'popup__wrapper',

  EXTERNAL_LINK: 'ds-icon-after-external-link',
  EXTERNAL_LINK__NEW_TAB: 'ds-new-tab-link-a11y',

  POPUP_ARROW: 'popup__arrow',
  POPUP_CONTENT_WRAPPER: 'popup__content',
  POPUP_WRAPPER: 'popup__wrapper',

  SEARCH__SEARCH_BACKDROP: 'search-backdrop',
  SEARCH__SEARCH_CLOSE_BUTTON: 'search-modal__close-button',
  SEARCH__SEARCH_BUTTON: 'search-modal__button',
  SEARCH__SEARCH_BUTTON_WRAPPER: 'search-modal__button-wrapper',
  SEARCH__SEARCH_INPUT: 'search-modal__input',
  SEARCH__SEARCH_MODAL: 'search-modal',

  SIZE__LARGE: 'large',
  SIZE__MEDIUM: 'medium',

  SKIP_LINK_LINK: 'skip-link__link',
  SKIP_LINK_WRAPPER: 'skip-link__wrapper',

  TITLE: 'ds-title-wrapper',
  TITLE__LOGO: 'ds-title-wrapper__logo',
  TITLE__TITLE: 'ds-title-wrapper__title',

  TOOLTIP: 'ds-tooltip',
  TOOLTIP__CONTENT: 'tooltip__content',
  TOOLTIP__WRAPPER: 'tooltip__wrapper',
  TOOLTIP__WRAPPER__HIDDEN: 'tooltip__wrapper--hidden',
  TOOLTIP__WRAPPER__VISIBLE: 'tooltip__wrapper--visible',

  UTAH_ID: 'ds-id-wrapper',
  UTAH_ID__BUTTON: 'ds-id__button',
};
