import type * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { ButtonBase } from '.'

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

const meta: Meta<typeof ButtonBase> = {
  title: 'Components/ButtonBase',
  component: ButtonBase,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'alert',
        'primary-ghost',
        'alert-ghost',
      ],
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
    isLoading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    children: {
      control: 'text',
      description: 'ボタンのラベル',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'アイコンの位置',
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonBase>

export const Default: Story = {
  args: {
    children: 'Button',
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

export const PrimaryGhost: Story = {
  args: {
    variant: 'primary-ghost',
    children: 'Primary Ghost Button',
  },
}

export const AlertGhost: Story = {
  args: {
    variant: 'alert-ghost',
    children: 'Alert Ghost Button',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ButtonBase size="xxs">XXSmall</ButtonBase>
      <ButtonBase size="xs">XSmall</ButtonBase>
      <ButtonBase size="sm">Small</ButtonBase>
      <ButtonBase size="md">Medium</ButtonBase>
      <ButtonBase size="lg">Large</ButtonBase>
    </div>
  ),
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

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
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
      <ButtonBase variant="primary" icon={PlusIcon}>
        Add
      </ButtonBase>
      <ButtonBase variant="secondary" icon={CloseIcon}>
        Cancel
      </ButtonBase>
      <ButtonBase variant="alert" icon={TrashIcon}>
        Delete
      </ButtonBase>
      <ButtonBase variant="primary-ghost" icon={PlusIcon}>
        Add
      </ButtonBase>
      <ButtonBase variant="alert-ghost" icon={TrashIcon}>
        Delete
      </ButtonBase>
    </div>
  ),
}

export const WithIconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ButtonBase size="xxs" icon={PlusIcon}>
        XXSmall
      </ButtonBase>
      <ButtonBase size="xs" icon={PlusIcon}>
        XSmall
      </ButtonBase>
      <ButtonBase size="sm" icon={PlusIcon}>
        Small
      </ButtonBase>
      <ButtonBase size="md" icon={PlusIcon}>
        Medium
      </ButtonBase>
      <ButtonBase size="lg" icon={PlusIcon}>
        Large
      </ButtonBase>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <ButtonBase size="icon" icon={PlusIcon} variant="primary" />
      <ButtonBase size="icon" icon={CloseIcon} variant="secondary" />
      <ButtonBase size="icon" icon={TrashIcon} variant="alert" />
      <ButtonBase size="icon" icon={PlusIcon} variant="primary-ghost" />
      <ButtonBase size="icon" icon={TrashIcon} variant="alert-ghost" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ButtonBase variant="primary">Primary</ButtonBase>
        <ButtonBase variant="secondary">Secondary</ButtonBase>
        <ButtonBase variant="alert">Alert</ButtonBase>
        <ButtonBase variant="primary-ghost">Primary Ghost</ButtonBase>
        <ButtonBase variant="alert-ghost">Alert Ghost</ButtonBase>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ButtonBase size="xxs">XXSmall</ButtonBase>
        <ButtonBase size="xs">XSmall</ButtonBase>
        <ButtonBase size="sm">Small</ButtonBase>
        <ButtonBase size="md">Medium</ButtonBase>
        <ButtonBase size="lg">Large</ButtonBase>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ButtonBase variant="primary" icon={PlusIcon}>
          With Icon
        </ButtonBase>
        <ButtonBase variant="secondary" icon={PlusIcon}>
          With Icon
        </ButtonBase>
        <ButtonBase variant="alert" icon={TrashIcon}>
          With Icon
        </ButtonBase>
        <ButtonBase variant="primary-ghost" icon={PlusIcon}>
          With Icon
        </ButtonBase>
        <ButtonBase variant="alert-ghost" icon={TrashIcon}>
          With Icon
        </ButtonBase>
      </div>
    </div>
  ),
}

export const AsDiv: Story = {
  args: {
    as: 'div',
    children: 'div element',
    className: 'p-4',
  },
}
