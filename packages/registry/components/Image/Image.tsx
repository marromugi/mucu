import { forwardRef, useCallback, useState } from 'react'
import { Spinner } from '../Spinner'
import { imageVariants } from './const'
import type { ImageOwnProps } from './type'

export const Image = forwardRef<HTMLImageElement, ImageOwnProps>(
  (
    {
      alt,
      src,
      radius,
      objectFit,
      isLoading,
      fallback,
      className,
      onLoad,
      onError,
      ...props
    },
    ref,
  ) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
      'loading',
    )

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus('loaded')
        onLoad?.(e)
      },
      [onLoad],
    )

    const handleError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus('error')
        onError?.(e)
      },
      [onError],
    )

    const isImageLoading = isLoading ?? status === 'loading'
    const isError = status === 'error'

    if (isError && fallback) {
      return <>{fallback}</>
    }

    const ariaProps = alt === '' ? { role: 'presentation' as const } : {}

    const { root, img } = imageVariants({
      radius,
      objectFit,
      isVisible: !isImageLoading,
    })

    return (
      <div className={root({ className })}>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={img()}
          onLoad={handleLoad}
          onError={handleError}
          {...ariaProps}
          {...props}
        />
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    )
  },
)

Image.displayName = 'Image'
