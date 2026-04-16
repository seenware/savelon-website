import { useState } from 'react'
import type { ReactNode } from 'react'

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index)
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`

        return (
          <div key={item.question} className="faq-item">
            <button
              id={buttonId}
              type="button"
              className="faq-question"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpenIndexes((current) =>
                  isOpen ? current.filter((itemIndex) => itemIndex !== index) : [...current, index],
                )
              }
            >
              <span>{item.question}</span>
              <span aria-hidden="true" className="faq-icon">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={isOpen ? 'faq-answer open' : 'faq-answer'}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

