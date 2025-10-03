import { describe, expect, it } from 'vitest';
import { findMenuItemInMenusByPathname } from '../../../src/react/util/menuItems/findMenuItemInMenusByPathname';

describe('findMenuItemInMenusByPathname', () => {
  it('should return undefined when menus is empty', () => {
    const result = findMenuItemInMenusByPathname({
      menus: [],
      pathname: '/test',
    });
    expect(result).toBeUndefined();
  });

  it('should return undefined when pathname does not match', () => {
    const menus = [
      {
        menuItems: [
          { link: '/home', title: 'Home' },
        ],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/about',
    });
    expect(result).toBeUndefined();
  });

  it('should find menu item by pathname', () => {
    const menus = [
      {
        menuItems: [
          { link: '/home', title: 'Home' },
          { link: '/about', title: 'About' },
        ],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/about',
    });
    expect(result).toBeDefined();
    expect(result.link).toBe('/about');
    expect(result.title).toBe('About');
  });

  it('should find menu item in nested children', () => {
    const menus = [
      {
        menuItems: [
          {
            link: '/parent',
            title: 'Parent',
            children: [
              { link: '/parent/child', title: 'Child' },
            ],
          },
        ],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/parent/child',
    });
    expect(result).toBeDefined();
    expect(result.link).toBe('/parent/child');
    expect(result.title).toBe('Child');
  });

  it('should find menu item in deeply nested children', () => {
    const menus = [
      {
        menuItems: [
          {
            link: '/level1',
            title: 'Level 1',
            children: [
              {
                link: '/level2',
                title: 'Level 2',
                children: [
                  { link: '/level3', title: 'Level 3' },
                ],
              },
            ],
          },
        ],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/level3',
    });
    expect(result).toBeDefined();
    expect(result.link).toBe('/level3');
    expect(result.title).toBe('Level 3');
  });

  it('should skip menu items with isAlternatePath flag', () => {
    const menus = [
      {
        menuItems: [
          { link: '/test', title: 'Test Main', isAlternatePath: false },
          { link: '/test', title: 'Test Alt', isAlternatePath: true },
        ],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/test',
    });
    expect(result).toBeDefined();
    expect(result.title).toBe('Test Main');
    expect(result.isAlternatePath).toBe(false);
  });

  it('should search across multiple menus', () => {
    const menus = [
      {
        menuItems: [
          { link: '/menu1', title: 'Menu 1' },
        ],
      },
      {
        menuItems: [
          { link: '/menu2', title: 'Menu 2' },
        ],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/menu2',
    });
    expect(result).toBeDefined();
    expect(result.link).toBe('/menu2');
    expect(result.title).toBe('Menu 2');
  });

  it('should handle null/undefined menus gracefully', () => {
    const result = findMenuItemInMenusByPathname({
      menus: null,
      pathname: '/test',
    });
    expect(result).toBeUndefined();
  });

  it('should handle menu items without children', () => {
    const menus = [
      {
        menuItems: [
          { link: '/simple', title: 'Simple' },
        ],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/simple',
    });
    expect(result).toBeDefined();
    expect(result.link).toBe('/simple');
  });

  it('should handle empty menuItems array', () => {
    const menus = [
      {
        menuItems: [],
      },
    ];
    const result = findMenuItemInMenusByPathname({
      menus,
      pathname: '/test',
    });
    expect(result).toBeUndefined();
  });
});
