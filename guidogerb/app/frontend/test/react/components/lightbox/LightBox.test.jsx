import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { LightBox } from '../../../../src/react/components/lightbox/LightBox';

describe('LightBox', () => {
  const mockImage = <img src="test.jpg" alt="Test" />;

  test('renders without crashing', () => {
    const { container } = render(<LightBox alt="Test Image" image={mockImage} />);
    expect(container).toBeTruthy();
  });

  test('renders thumbnail button', () => {
    const { container } = render(<LightBox alt="Test Image" image={mockImage} />);
    const button = container.querySelector('.lightbox__image-thumbnail');
    expect(button).toBeTruthy();
  });

  test('displays alt text', () => {
    const { getByText } = render(<LightBox alt="Test Image" image={mockImage} />);
    expect(getByText(/Test Image/i)).toBeTruthy();
  });

  test('hides alt text when hideAlt is true', () => {
    const { container } = render(<LightBox alt="Test Image" image={mockImage} hideAlt />);
    const thumbnail = container.querySelector('.lightbox__image-thumbnail--hiddenAlt');
    expect(thumbnail).toBeTruthy();
  });

  test('applies custom className', () => {
    const { container } = render(<LightBox alt="Test" image={mockImage} className="custom-class" />);
    const thumbnail = container.querySelector('.custom-class');
    expect(thumbnail).toBeTruthy();
  });

  test('opens lightbox when thumbnail is clicked', () => {
    const { container } = render(<LightBox alt="Test Image" image={mockImage} />);
    const button = container.querySelector('.lightbox__image-thumbnail');
    
    fireEvent.click(button);
    
    // Should show the modal - check for the opened lightbox container
    const lightboxImages = container.querySelectorAll('.lightbox__image');
    expect(lightboxImages.length).toBeGreaterThan(0);
  });

  test('renders image in lightbox', () => {
    const { container } = render(<LightBox alt="Test Image" image={mockImage} />);
    expect(container.querySelector('img')).toBeTruthy();
  });

  test('renders close button in lightbox', () => {
    const { container } = render(<LightBox alt="Test Image" image={mockImage} />);
    const button = container.querySelector('.lightbox__image-thumbnail');
    
    fireEvent.click(button);
    
    const closeButton = container.querySelector('[aria-label*="Close"]') || 
                       container.querySelector('.icon-button');
    expect(closeButton).toBeTruthy();
  });
});
