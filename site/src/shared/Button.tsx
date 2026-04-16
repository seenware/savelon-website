import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type PolymorphicProps<T extends ElementType> = {
  as?: T
  variant?: ButtonVariant
  children: ReactNode
} & ComponentPropsWithoutRef<T>

function baseClass(variant: ButtonVariant) {
  if (variant === 'primary') return 'btn btn-primary'
  return 'btn btn-secondary'
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
    <Component className={cls} {...(rest as ComponentPropsWithoutRef<T>)}>
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

