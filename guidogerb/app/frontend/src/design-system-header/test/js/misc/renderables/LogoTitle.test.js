import { describe, expect, test, vi } from 'vitest';
import { notNull } from '../../../../src/js/misc/notNull';
import { LogoTitle } from '../../../../src/js/renderables/logoTitle/LogoTitle';
import { setHeaderSettingsForTest } from '../../../util/setHeaderSettingsForTest';

describe('LogoTitle', () => {
  test('titleUrl: blank (wrapper !link), no func', () => {
    setHeaderSettingsForTest({ titleUrl: '' }, () => {
      LogoTitle();
      const wrapper = /** @type {HTMLElement} */ (notNull(document.querySelector('.ds-title-wrapper'), 'LogoTitle test A'));
      expect(wrapper).toBeTruthy();
      expect(wrapper.tagName).toBe('DIV');
      expect(wrapper.getAttribute('href')).toBeFalsy();
      expect(wrapper.onclick).toBeFalsy();
    });
  });

  test('titleUrl: value (!wrapper link), has func', () => {
    setHeaderSettingsForTest({ titleUrl: 'just-a-test', titleFunction: vi.fn() }, () => {
      LogoTitle();
      const wrapper = /** @type {HTMLElement} */ (notNull(document.querySelector('.ds-title-wrapper'), 'LogoTitle test B'));
      expect(wrapper).toBeTruthy();
      expect(wrapper.tagName).toBe('A');
      expect(wrapper.getAttribute('href')).toBe('just-a-test');
      expect(wrapper.onclick).toBeTruthy();
    });
  });

  // ======= Backwards Compatibility: titleURL ======= //
  test('titleUrl: **backwards compatibility (titleURL)** blank (wrapper !link)', () => {
    setHeaderSettingsForTest(
      {
        // @ts-expect-error intentional for testing
        titleUrl: null,
        titleURL: '',
      },
      () => {
        LogoTitle();
        const wrapper = /** @type {HTMLElement} */ (notNull(document.querySelector('.ds-title-wrapper'), 'LogoTitle test E'));
        expect(wrapper).toBeTruthy();
        expect(wrapper.tagName).toBe('DIV');
        expect(wrapper.getAttribute('href')).toBeFalsy();
        expect(wrapper.getAttribute('href')).toBeFalsy();
      }
    );
  });

  test('titleUrl: **backwards compatibility (titleURL)** value (!wrapper link)', () => {
    setHeaderSettingsForTest(
      {
        // @ts-expect-error intentional for testing
        titleUrl: null,
        titleURL: 'just-a-test',
      },
      () => {
        LogoTitle();
        const wrapper = /** @type {HTMLElement} */ (notNull(document.querySelector('.ds-title-wrapper'), 'LogoTitle test F'));
        expect(wrapper).toBeTruthy();
        expect(wrapper.tagName).toBe('A');
        expect(wrapper.getAttribute('href')).toBe('just-a-test');
      }
    );
  });
});
