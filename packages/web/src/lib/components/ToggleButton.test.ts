import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ToggleButton from './ToggleButton.svelte';

describe('ToggleButton', () => {
  it.each([
    { checked: false, expectedAria: 'false', expectedClass: 'bg-sand-200' },
    { checked: true, expectedAria: 'true', expectedClass: 'bg-skog-700' },
  ])('renders correctly when checked=$checked', ({ checked, expectedAria, expectedClass }) => {
    const { getByRole, unmount } = render(ToggleButton, { checked });
    const button = getByRole('switch');

    expect(button.getAttribute('aria-checked')).toBe(expectedAria);
    expect(button.className).toContain(expectedClass);

    unmount();
  });
});
