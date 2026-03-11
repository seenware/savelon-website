import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'text'

type PolymorphicProps<T extends ElementType> = {
  as?: T
  variant?: ButtonVariant
  children: ReactNode
} & ComponentPropsWithoutRef<T>

function baseClass(variant: ButtonVariant) {
  if (variant === 'primary') return 'btn btn-primary'
  if (variant === 'secondary') return 'btn btn-secondary'
  return 'btn btn-text'
}

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  children,
  className,
  ...rest
}: PolymorphicProps<T>) {
  const Component = (as || 'button') as ElementType
  const cls = className ? `${baseClass(variant)} ${className}` : baseClass(variant)
  return (
    <Component className={cls} {...(rest as any)}>
      {children}
    </Component>
  )
}

export function PrimaryButton<T extends ElementType = 'button'>(props: PolymorphicProps<T>) {
  return <Button {...props} variant="primary" />
}

export function SecondaryButton<T extends ElementType = 'button'>(props: PolymorphicProps<T>) {
  return <Button {...props} variant="secondary" />
}

export function TextLinkButton<T extends ElementType = typeof Link>(
  props: PolymorphicProps<T> & { to?: string },
) {
  const { as, ...rest } = props
  const Component = (as || Link) as ElementType
  return <Button as={Component} variant="text" {...(rest as any)} />
}

