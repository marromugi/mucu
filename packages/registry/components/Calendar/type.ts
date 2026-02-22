export interface CalendarOwnProps {
  /** 選択中の日付（controlled） */
  value?: Date
  /** デフォルト選択日付（uncontrolled） */
  defaultValue?: Date
  /** 日付選択時のコールバック */
  onChange?: (date: Date) => void
  /** ロケール（'ja', 'en' 等）@default 'en' */
  locale?: string
  /** 週の開始曜日（0=日曜, 1=月曜）@default 0 */
  weekStartsOn?: 0 | 1
  /** カスタムクラス */
  className?: string
}

export type CalendarProps = CalendarOwnProps
