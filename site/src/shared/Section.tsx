import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={className ? `section ${className}` : 'section'}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

