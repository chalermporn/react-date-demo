import type { Dayjs } from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';

// --- Common Types ---
export type PopupPosition = 'top' | 'bottom';
export type ViewMode = 'day' | 'month' | 'year';
export type HighlightColor = 'slate' | 'violet';

// --- YearView Props ---
export interface YearViewProps {
  viewDate: Dayjs;
  setViewDate: Dispatch<SetStateAction<Dayjs>>;
  onYearSelect: (year: number) => void;
}

// --- MonthView Props ---
export interface MonthViewProps {
  viewDate: Dayjs;
  setViewDate: Dispatch<SetStateAction<Dayjs>>;
  selectedDate: Dayjs | null;
  onMonthSelect: (monthIndex: number) => void;
  onHeaderClick: () => void;
  highlightColor?: HighlightColor;
}

// --- DayView Props ---
export interface DayViewProps {
  viewDate: Dayjs;
  selectedDate: Dayjs | null;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  onDateSelect: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onHeaderClick: () => void;
}

// --- ResponsivePopup Props ---
export interface ResponsivePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  position?: PopupPosition;
}

// --- ThaiDatePicker Props ---
export interface ThaiDatePickerProps {
  value: Dayjs | null;
  onChange: (date: Dayjs) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  placeholder?: string;
}

// --- ThaiMonthPicker Props ---
export interface ThaiMonthPickerProps {
  value: Dayjs | null;
  onChange: (date: Dayjs) => void;
  placeholder?: string;
}
