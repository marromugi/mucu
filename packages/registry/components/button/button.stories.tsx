import type * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Button } from '.'

const PlusIcon: React.ComponentType<React.SVGAttributes<SVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const ChevronIcon: React.ComponentType<React.SVGAttributes<SVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const CloseIcon: React.ComponentType<React.SVGAttributes<SVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const TrashIcon: React.ComponentType<React.SVGAttributes<SVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'alert'],
      description: 'ボタンのスタイルバリアント',
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'icon'],
      description: 'ボタンのサイズ',
    },
    fullWidth: {
      control: 'boolean',
      description: '幅を100%にする',
    },
    children: {
      control: 'text',
      description: 'ボタンのラベル',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'アイコンの位置',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
  play: async ({ canvas }) => {
    const el = canvas.getByText('Button').closest('button')
    await expect(el?.tagName).toBe('BUTTON')
    await expect(el).toHaveClass('group')
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Alert: Story = {
  args: {
    variant: 'alert',
    children: 'Alert Button',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="xxs">XXSmall</Button>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithIcon: Story = {
  args: {
    icon: PlusIcon,
    children: 'Add Item',
  },
}

export const WithIconRight: Story = {
  args: {
    icon: ChevronIcon,
    iconPosition: 'right',
    children: 'Next',
  },
}

export const WithIconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary" icon={PlusIcon}>
        Add
      </Button>
      <Button variant="secondary" icon={CloseIcon}>
        Cancel
      </Button>
      <Button variant="alert" icon={TrashIcon}>
        Delete
      </Button>
    </div>
  ),
}

export const WithIconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="xxs" icon={PlusIcon}>
        XXSmall
      </Button>
      <Button size="xs" icon={PlusIcon}>
        XSmall
      </Button>
      <Button size="sm" icon={PlusIcon}>
        Small
      </Button>
      <Button size="md" icon={PlusIcon}>
        Medium
      </Button>
      <Button size="lg" icon={PlusIcon}>
        Large
      </Button>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button size="icon" icon={PlusIcon} variant="primary" />
      <Button size="icon" icon={CloseIcon} variant="secondary" />
      <Button size="icon" icon={TrashIcon} variant="alert" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="alert">Alert</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button size="xxs">XXSmall</Button>
        <Button size="xs">XSmall</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary" icon={PlusIcon}>
          With Icon
        </Button>
        <Button variant="secondary" icon={PlusIcon}>
          With Icon
        </Button>
        <Button variant="alert" icon={TrashIcon}>
          With Icon
        </Button>
      </div>
    </div>
  ),
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    variant: 'primary',
    children: 'Link Button',
  },
}
