import { describe, test, expect } from 'vitest';
import { IconsWebsite } from '../../../../src/react/components/websiteContent/IconsWebsite';

describe('IconsWebsite', () => {
  test('exports an object with icon functions', () => {
    expect(typeof IconsWebsite).toBe('object');
    expect(IconsWebsite).toBeTruthy();
  });

  test('has IconA11y function', () => {
    expect(typeof IconsWebsite.IconA11y).toBe('function');
    const icon = IconsWebsite.IconA11y({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('has IconBadgeStar function', () => {
    expect(typeof IconsWebsite.IconBadgeStar).toBe('function');
    const icon = IconsWebsite.IconBadgeStar({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('has IconChatBubbles function', () => {
    expect(typeof IconsWebsite.IconChatBubbles).toBe('function');
    const icon = IconsWebsite.IconChatBubbles({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('has IconCollaboration function', () => {
    expect(typeof IconsWebsite.IconCollaboration).toBe('function');
    const icon = IconsWebsite.IconCollaboration({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('has IconGitHub function', () => {
    expect(typeof IconsWebsite.IconGitHub).toBe('function');
    const icon = IconsWebsite.IconGitHub({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('has IconHeartTag function', () => {
    expect(typeof IconsWebsite.IconHeartTag).toBe('function');
    const icon = IconsWebsite.IconHeartTag({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('has IconSlack function', () => {
    expect(typeof IconsWebsite.IconSlack).toBe('function');
    const icon = IconsWebsite.IconSlack({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('has IconStarHollow function', () => {
    expect(typeof IconsWebsite.IconStarHollow).toBe('function');
    const icon = IconsWebsite.IconStarHollow({});
    expect(icon).toBeTruthy();
    expect(icon.type).toBe('svg');
  });

  test('icon functions accept className parameter', () => {
    const icon = IconsWebsite.IconA11y({ className: 'custom-class' });
    expect(icon.props.className).toContain('custom-class');
  });

  test('icon functions accept altText parameter', () => {
    const icon = IconsWebsite.IconGitHub({ altText: 'GitHub Icon' });
    expect(icon.props['aria-label']).toBe('GitHub Icon');
  });

  test('icon functions accept isHidden parameter', () => {
    const icon = IconsWebsite.IconSlack({ isHidden: true });
    expect(icon.props['aria-hidden']).toBe(true);
  });

  test('icons have proper viewBox attributes', () => {
    const icon = IconsWebsite.IconA11y({});
    expect(icon.props.viewBox).toBeTruthy();
  });
});
