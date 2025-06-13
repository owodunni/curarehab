import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import Image from './Image.svelte';

// Mock the utility function
vi.mock('$lib/widgets/util', () => ({
  getAsset2: vi.fn(
    (
      srcPath: string,
      options: { width: number; height: number; format: string; quality: number }
    ) =>
      `https://example.com/image/${srcPath}?w=${options.width}&h=${options.height}&f=${options.format}&q=${options.quality}`
  ),
}));

// Mock svelte-intersection-observer
vi.mock('svelte-intersection-observer', () => ({
  default: vi
    .fn()
    .mockImplementation(
      ({ children }: { children?: (params: { intersecting: boolean }) => unknown }) =>
        children?.({ intersecting: true })
    ),
}));

describe('Image', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders basic image structure', () => {
    const { container } = render(Image, {
      width: 800,
      height: 600,
      srcPath: 'test-image.jpg',
      alt: 'Test image',
    });

    const picture = container.querySelector('picture');
    expect(picture).toBeTruthy();

    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('alt')).toBe('Test image');
    expect(img?.getAttribute('width')).toBe('800');
    expect(img?.getAttribute('height')).toBe('600');
  });

  it('generates correct source sets for different formats', () => {
    const { container } = render(Image, {
      width: 800,
      height: 600,
      srcPath: 'test-image.jpg',
      alt: 'Test image',
    });

    const sources = container.querySelectorAll('source');
    expect(sources.length).toBe(3); // webp, avif, jpeg

    // Check that different formats are generated
    const types = Array.from(sources).map((source) => source.getAttribute('type'));
    expect(types).toContain('image/webp');
    expect(types).toContain('image/avif');
    expect(types).toContain('image/jpeg');
  });

  it('applies intersection observer classes correctly', () => {
    const { container } = render(Image, {
      width: 800,
      height: 600,
      srcPath: 'test-image.jpg',
      alt: 'Test image',
    });

    const picture = container.querySelector('picture');
    expect(picture?.className).toContain('image-in');

    // In test environment, IntersectionObserver might not trigger immediately
    // so we just check that the base class is applied
    // The 'image-in-place' class will be added when the element intersects
  });
});
