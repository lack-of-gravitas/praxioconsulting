import cn from 'clsx'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'
import { LoadingDots } from '@components/atoms'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'primary' | 'secondary'
  active?: boolean
  showArrow?: boolean
  size?: 'small' | 'medium' | 'large'
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant, // primary | secondary, controls color and style
    size, // small | medium | large
    children,
    active,
    width,
    loading = false,
    disabled = false,
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  // controls concatenation of classes
  const rootClasses =
    'relative inline-flex items-center px-4 py-3 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses =
    variant == 'primary'
      ? 'bg-primary-1 text-primary-2'
      : 'bg-secondary-1 text-secondary-2'

  const sizeClasses = 'text-lg font-medium text-white'

  const twClasses = cn(
    rootClasses,
    variant === 'primary'
      ? ' border border-transparent  bg-primaryColor-700 hover:bg-primaryColor-800  focus:ring-primaryColor-800'
      : '',
    className
  )

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={twClasses}
      disabled={disabled}
      {...rest}
    >
      {children}
      {loading && (
        <i className="flex pl-2 m-0">
          <LoadingDots />
        </i>
      )}
    </Component>
  )
})

export default Button
