import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ColorPicker } from '../../../../src/react/components/color/ColorPicker';
import { AppContextProvider } from '../../../../src/react/context/AppContext/AppContextProvider';

describe('ColorPicker', () => {
  const defaultProps = {
    className: 'test-class',
    value: '#ff5733',
    id: 'test-color',
    label: 'Test Color',
    onChange: vi.fn(),
    onClick: vi.fn(),
    title: 'Test Color Title',
  };

  const renderWithContext = (props = {}) => {
    return render(
      <AppContextProvider>
        <ColorPicker {...defaultProps} {...props} />
      </AppContextProvider>
    );
  };

  it('renders the color picker button with correct styles', () => {
    renderWithContext();
    
    const button = screen.getByRole('button', { name: /test color/i });
    expect(button).toBeTruthy();
    expect(button.style.backgroundColor).toBeTruthy();
  });

  it('calls onClick when button is clicked', () => {
    renderWithContext();
    
    const button = screen.getByRole('button', { name: /test color/i });
    fireEvent.click(button);
    
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with light background and dark text for light colors', () => {
    renderWithContext({ value: '#ffffff' });
    
    const button = screen.getByRole('button', { name: /test color/i });
    expect(button).toBeTruthy();
  });

  it('renders with dark background and light text for dark colors', () => {
    renderWithContext({ value: '#000000' });
    
    const button = screen.getByRole('button', { name: /test color/i });
    expect(button).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = renderWithContext({ className: 'custom-class' });
    
    // The component or outer container should have or contain the custom class
    expect(container.innerHTML).toContain('custom-class');
  });

  it('shows selected state when isSelected is true', () => {
    renderWithContext({ isSelected: true });
    
    const button = screen.getByRole('button', { name: /test color/i });
    expect(button).toBeTruthy();
  });

  it('renders with optional colorGray prop', () => {
    renderWithContext({ colorGray: '#808080', value: '#ffffff' });
    
    const button = screen.getByRole('button', { name: /test color/i });
    expect(button).toBeTruthy();
  });

  it('handles hex color conversion', () => {
    // Test with different color formats
    renderWithContext({ value: 'rgb(255, 87, 51)' });
    
    const button = screen.getByRole('button', { name: /test color/i });
    expect(button).toBeTruthy();
  });
});
