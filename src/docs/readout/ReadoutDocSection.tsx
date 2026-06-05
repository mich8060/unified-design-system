import type { ReactNode } from 'react'
import { cn } from '@chghealthcare/unified-design-system'
import {
  docPageH2ClassName,
  docPageLeadClassName,
  docPageSectionClassName,
} from '../doc-page-content-classes'

type Props = {
  title: string
  lead?: ReactNode
  children: ReactNode
  className?: string
}

export function ReadoutDocSection({ title, lead, children, className }: Props) {
  return (
    <section className={cn(docPageSectionClassName, className)}>
      <div>
        <h2 className={docPageH2ClassName}>{title}</h2>
        {lead ? <p className={docPageLeadClassName}>{lead}</p> : null}
      </div>
      {children}
    </section>
  )
}
