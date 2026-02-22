import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { calendarVariants, calendarCellVariants } from './const'
import {
  generateCalendarDays,
  getMonthLabel,
  getWeekdayNames,
  getYearLabel,
  isSameDay,
} from './utils'
import type { CalendarOwnProps } from './type'
import type { DayInfo } from './utils'

export const Calendar = ({
  value,
  defaultValue,
  onChange,
  locale = 'en',
  weekStartsOn = 0,
  className,
}: CalendarOwnProps) => {
  const initialDate = value ?? defaultValue ?? new Date()
  const [viewYear, setViewYear] = useState(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth())
  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue)

  const selectedDate = value ?? internalValue
  const styles = calendarVariants()

  const days = useMemo(
    () => generateCalendarDays(viewYear, viewMonth, weekStartsOn),
    [viewYear, viewMonth, weekStartsOn]
  )

  const weekdayNames = useMemo(() => getWeekdayNames(locale, weekStartsOn), [locale, weekStartsOn])

  const monthLabel = useMemo(() => getMonthLabel(viewMonth, locale), [viewMonth, locale])

  const yearLabel = useMemo(() => getYearLabel(viewYear, locale), [viewYear, locale])

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleDateClick = (day: DayInfo) => {
    if (value === undefined) {
      setInternalValue(day.date)
    }
    onChange?.(day.date)
  }

  return (
    <div className={cn(styles.root(), className)}>
      <div className={styles.header()}>
        <span className="ml-2">
          <span className={styles.title()}>{monthLabel}</span>
          <span className={styles.subTitle()}>{yearLabel}</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={styles.navButton()}
            onClick={goToPrevMonth}
            aria-label="Previous month"
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.navButton()}
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.weekdays()}>
        {weekdayNames.map((name) => (
          <div key={name} className={styles.weekday()}>
            {name}
          </div>
        ))}
      </div>

      <div className={styles.grid()}>
        {days.map((day) => {
          const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false

          return (
            <button
              key={day.date.toISOString()}
              type="button"
              className={calendarCellVariants({
                isOutside: day.isOutside,
                isSelected,
                isToday: day.isToday,
              })}
              onClick={() => handleDateClick(day)}
              aria-label={day.date.toLocaleDateString(locale)}
              aria-selected={isSelected}
            >
              {day.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = 'Calendar'
