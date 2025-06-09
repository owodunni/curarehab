import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Header from './Header.svelte';

// Mock Web Animations API for jsdom
Object.defineProperty(Element.prototype, 'animate', {
  value: vi.fn(() => ({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    pause: vi.fn(),
    play: vi.fn(),
    reverse: vi.fn(),
    finish: vi.fn()
  })),
  writable: true
});

// Mock the i18n functions
const mockT = vi.fn((category: string, key: string) => `${category}.${key}`);
const mockL = vi.fn((page: string) => `/${page}`);

describe('Header', () => {
  it('renders basic header structure', () => {
    const { container } = render(Header, {
      t: mockT,
      l: mockL,
      locale: 'sv',
      route: '/'
    });

    // Check that header element exists
    const header = container.querySelector('header');
    expect(header).toBeTruthy();
    expect(header?.getAttribute('lang')).toBe('sv');

    // Check that nav element exists
    const nav = container.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('shows correct navigation links for Swedish locale', () => {
    const { container } = render(Header, {
      t: mockT,
      l: mockL,
      locale: 'sv',
      route: '/'
    });

    // Should show skadekompassen for Swedish locale
    const links = container.querySelectorAll('a');
    const linkTexts = Array.from(links).map(link => link.textContent?.trim()).filter(Boolean);

    expect(linkTexts).toContain('common.behandlingar');
    expect(linkTexts).toContain('common.hitta');
    expect(linkTexts).toContain('common.om');
    expect(linkTexts).toContain('common.skadekompassen');
  });

  it('hides skadekompassen for English locale', () => {
    const { container } = render(Header, {
      t: mockT,
      l: mockL,
      locale: 'en',
      route: '/en'
    });

    const links = container.querySelectorAll('a');
    const linkTexts = Array.from(links).map(link => link.textContent?.trim()).filter(Boolean);

    expect(linkTexts).toContain('common.behandlingar');
    expect(linkTexts).toContain('common.hitta');
    expect(linkTexts).toContain('common.om');
    expect(linkTexts).not.toContain('common.skadekompassen');
  });

  it('toggles mobile menu when button is clicked', async () => {
    const { container } = render(Header, {
      t: mockT,
      l: mockL,
      locale: 'sv',
      route: '/'
    });

    // Find the menu button
    const menuButton = container.querySelector('button[aria-haspopup="menu"]');
    expect(menuButton).toBeTruthy();
    expect(menuButton?.getAttribute('aria-expanded')).toBe('false');

    // Click to open menu
    await fireEvent.click(menuButton!);
    expect(menuButton?.getAttribute('aria-expanded')).toBe('true');

    // Check that mobile menu panel appears
    const mobileMenu = container.querySelector('#popover-panel');
    expect(mobileMenu).toBeTruthy();
  });
});
