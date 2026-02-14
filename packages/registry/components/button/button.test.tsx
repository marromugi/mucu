import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  describe('rendering', () => {
    it('should render with children', () => {
      render(<Button>Click me</Button>);

      expect(
        screen.getByRole('button', { name: 'Click me' })
      ).toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('button', 'primary', 'md');
    });

    it('should forward ref to button element', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement>;
      render(<Button ref={ref}>Ref Test</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should apply custom className', () => {
      render(<Button className="custom-class">Custom</Button>);

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('should pass through HTML button attributes', () => {
      render(
        <Button type="submit" name="submit-btn" data-testid="custom">
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'submit-btn');
      expect(button).toHaveAttribute('data-testid', 'custom');
    });
  });

  describe('variants', () => {
    it.each([
      ['primary', 'primary'],
      ['secondary', 'secondary'],
      ['outline', 'outline'],
      ['ghost', 'ghost'],
      ['destructive', 'destructive'],
    ] as const)('should render %s variant', (variant, expectedClass) => {
      render(<Button variant={variant}>Button</Button>);

      expect(screen.getByRole('button')).toHaveClass(expectedClass);
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'sm'],
      ['md', 'md'],
      ['lg', 'lg'],
    ] as const)('should render %s size', (size, expectedClass) => {
      render(<Button size={size}>Button</Button>);

      expect(screen.getByRole('button')).toHaveClass(expectedClass);
    });
  });

  describe('loading state', () => {
    it('should show spinner when loading', () => {
      render(<Button loading>Loading</Button>);

      const spinner = document.querySelector('[aria-hidden="true"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('spinner');
    });

    it('should disable button when loading', () => {
      render(<Button loading>Loading</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should hide text visually when loading', () => {
      render(<Button loading>Loading Text</Button>);

      const textSpan = screen.getByText('Loading Text');
      expect(textSpan).toHaveClass('hiddenText');
    });

    it('should apply loading class to button', () => {
      render(<Button loading>Loading</Button>);

      expect(screen.getByRole('button')).toHaveClass('loading');
    });

    it('should not show spinner when not loading', () => {
      render(<Button>Not Loading</Button>);

      const spinner = document.querySelector('.spinner');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should not be disabled by default', () => {
      render(<Button>Enabled</Button>);

      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('should be disabled when both disabled and loading', () => {
      render(
        <Button disabled loading>
          Both
        </Button>
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should be focusable', async () => {
      const user = userEvent.setup();
      render(<Button>Focus me</Button>);

      await user.tab();

      expect(screen.getByRole('button')).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('should have accessible name from children', () => {
      render(<Button>Accessible Button</Button>);

      expect(
        screen.getByRole('button', { name: 'Accessible Button' })
      ).toBeInTheDocument();
    });

    it('should support aria-label', () => {
      render(<Button aria-label="Close dialog">X</Button>);

      expect(
        screen.getByRole('button', { name: 'Close dialog' })
      ).toBeInTheDocument();
    });

    it('should hide spinner from screen readers', () => {
      render(<Button loading>Loading</Button>);

      const spinner = document.querySelector('.spinner');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
