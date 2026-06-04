"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <>
      <style>{`
        .rdp-root {
          --rdp-accent-color: var(--isitabuy-orange);
          --rdp-background-color: var(--soft-wait);
          --rdp-accent-background-color: var(--soft-wait);
          --rdp-day-height: 2.25rem;
          --rdp-day-width: 2.25rem;
          --rdp-day_button-border-radius: 0.5rem;
          --rdp-today-color: var(--isitabuy-orange);
          margin: 0;
        }
        .rdp-day_button:hover:not([disabled]):not(.rdp-selected) {
          background-color: var(--soft-wait);
          color: var(--isitabuy-ink);
        }
        .rdp-selected, .rdp-selected:hover, .rdp-selected:focus {
          background-color: var(--isitabuy-orange) !important;
          color: white !important;
          font-weight: 700 !important;
          border: none !important;
        }
        .rdp-month_caption {
          font-weight: 600;
        }
        .rdp-nav svg {
          fill: var(--isitabuy-ink);
          color: var(--isitabuy-ink);
        }
        .rdp-button_next:hover, .rdp-button_previous:hover {
          background-color: var(--soft-wait);
        }
      `}</style>
      <DayPicker
        showOutsideDays={showOutsideDays}
        classNames={classNames}
        className={cn("p-2", className)}
        {...props}
      />
    </>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
