import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'

vi.mock('motion/react', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
      <div ref={ref} {...props} />
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>()
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  }
})

import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

const defaultProps = {
  open: true,
  onOpenChange: vi.fn(),
}

describe('Modal', () => {
  it('role="dialog" を持つ', () => {
    render(<Modal {...defaultProps}>content</Modal>)
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('aria-modal="true" を持つ', () => {
    render(<Modal {...defaultProps}>content</Modal>)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('title 指定時に aria-labelledby を持つ', () => {
    render(
      <Modal {...defaultProps} title="test title">
        content
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-labelledby')
  })

  it('title 未指定時に aria-labelledby を持たない', () => {
    render(<Modal {...defaultProps}>content</Modal>)
    const dialog = screen.getByRole('dialog')
    expect(dialog).not.toHaveAttribute('aria-labelledby')
  })

  it('showCloseButton=true で閉じるボタンが表示される', () => {
    render(
      <Modal {...defaultProps} showCloseButton>
        content
      </Modal>,
    )
    expect(screen.getByLabelText('閉じる')).toBeTruthy()
  })

  it('showCloseButton=false で閉じるボタンが非表示', () => {
    render(
      <Modal {...defaultProps} showCloseButton={false}>
        content
      </Modal>,
    )
    expect(screen.queryByLabelText('閉じる')).toBeNull()
  })

  it('ref をフォワードする', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Modal {...defaultProps} ref={ref}>
        content
      </Modal>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('displayName が設定されている', () => {
    expect(Modal.displayName).toBe('Modal')
  })

  it('className がマージされる', () => {
    render(
      <Modal {...defaultProps} className="custom-class">
        content
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('custom-class')
  })
})

describe('ModalHeader', () => {
  it('デフォルトで div として描画される', () => {
    const { container } = render(<ModalHeader>header</ModalHeader>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('as prop で要素を変更できる', () => {
    const { container } = render(<ModalHeader as="section">header</ModalHeader>)
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('ref をフォワードする', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ModalHeader ref={ref}>header</ModalHeader>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('displayName が設定されている', () => {
    expect(ModalHeader.displayName).toBe('ModalHeader')
  })

  it('className が適用される', () => {
    const { container } = render(<ModalHeader className="custom-header">header</ModalHeader>)
    expect(container.firstChild).toHaveClass('custom-header')
  })
})

describe('ModalBody', () => {
  it('デフォルトで div として描画される', () => {
    const { container } = render(<ModalBody>body</ModalBody>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('as prop で要素を変更できる', () => {
    const { container } = render(<ModalBody as="section">body</ModalBody>)
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('ref をフォワードする', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ModalBody ref={ref}>body</ModalBody>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('displayName が設定されている', () => {
    expect(ModalBody.displayName).toBe('ModalBody')
  })

  it('className が適用される', () => {
    const { container } = render(<ModalBody className="custom-body">body</ModalBody>)
    expect(container.firstChild).toHaveClass('custom-body')
  })
})

describe('ModalFooter', () => {
  it('デフォルトで div として描画される', () => {
    const { container } = render(<ModalFooter>footer</ModalFooter>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('as prop で要素を変更できる', () => {
    const { container } = render(<ModalFooter as="nav">footer</ModalFooter>)
    expect(container.firstChild?.nodeName).toBe('NAV')
  })

  it('ref をフォワードする', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ModalFooter ref={ref}>footer</ModalFooter>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('displayName が設定されている', () => {
    expect(ModalFooter.displayName).toBe('ModalFooter')
  })

  it('className が適用される', () => {
    const { container } = render(<ModalFooter className="custom-footer">footer</ModalFooter>)
    expect(container.firstChild).toHaveClass('custom-footer')
  })
})
