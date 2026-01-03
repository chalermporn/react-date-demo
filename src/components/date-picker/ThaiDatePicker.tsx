import { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { dayjs, type Dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { ResponsivePopup } from '@/components/ui/ResponsivePopup';
import { YearView } from './YearView';
import { MonthView } from './MonthView';
import { DayView } from './DayView';
import type { ThaiDatePickerProps, ViewMode, PopupPosition } from './types';

const POPUP_HEIGHT = 400;

/**
 * ThaiDatePicker - Thai Buddhist Era date picker
 * 
 * Features:
 * - Day/Month/Year drill-down selection
 * - Min/Max date constraints
 * - Responsive: Modal on mobile, Popover on desktop
 * - Auto-positioning (opens up if not enough space below)
 */
export function ThaiDatePicker({ 
  value, 
  onChange, 
  minDate, 
  maxDate,
  placeholder = 'เลือกวันที่'
}: ThaiDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [popupPosition, setPopupPosition] = useState<PopupPosition>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedDate = value ? dayjs(value) : null;
  const initialViewDate = selectedDate || (minDate ? dayjs(minDate) : dayjs());
  const [viewDate, setViewDate] = useState(initialViewDate);

  // Click outside handler (desktop only)
  useEffect(() => {
    if (!isOpen || window.innerWidth < 768) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Reset view when opened
  useEffect(() => {
    if (isOpen) {
      const targetView = value ? dayjs(value) : (minDate ? dayjs(minDate) : dayjs());
      setViewDate(targetView);
      setViewMode('day');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Calculate popup position
  const calculatePosition = useCallback(() => {
    if (!containerRef.current || window.innerWidth < 768) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    setPopupPosition(
      spaceBelow < POPUP_HEIGHT && spaceAbove > spaceBelow ? 'top' : 'bottom'
    );
  }, []);

  const handleOpen = () => {
    if (!isOpen) calculatePosition();
    setIsOpen(prev => !prev);
  };

  const handleClose = () => setIsOpen(false);

  const handleDateSelect = (day: number) => {
    const newDate = viewDate.date(day);
    onChange(newDate);
    setIsOpen(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setViewDate((prev: Dayjs) => prev.month(monthIndex));
    setViewMode('day');
  };

  const handleYearSelect = (year: number) => {
    setViewDate((prev: Dayjs) => prev.year(year));
    setViewMode('month');
  };

  const handlePrevMonth = () => setViewDate((prev: Dayjs) => prev.subtract(1, 'month'));
  const handleNextMonth = () => setViewDate((prev: Dayjs) => prev.add(1, 'month'));

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          "w-full px-4 py-3 text-left border rounded-xl flex items-center justify-between",
          "transition-all duration-200 h-12 bg-white border-slate-200",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500",
          isOpen && "ring-2 ring-violet-500/20 border-violet-500"
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-base truncate", 
          !selectedDate ? "text-slate-400" : "text-slate-900"
        )}>
          {selectedDate ? selectedDate.format('D MMMM BBBB') : placeholder}
        </span>
        <CalendarIcon className="h-5 w-5 text-violet-500 opacity-70 flex-shrink-0" />
      </button>

      {/* Popup */}
      <ResponsivePopup isOpen={isOpen} onClose={handleClose} position={popupPosition}>
        {viewMode === 'year' && (
          <YearView 
            viewDate={viewDate} 
            setViewDate={setViewDate} 
            onYearSelect={handleYearSelect} 
          />
        )}

        {viewMode === 'month' && (
          <MonthView 
            viewDate={viewDate} 
            setViewDate={setViewDate}
            selectedDate={selectedDate}
            onMonthSelect={handleMonthSelect}
            onHeaderClick={() => setViewMode('year')}
            highlightColor="violet"
          />
        )}

        {viewMode === 'day' && (
          <DayView
            viewDate={viewDate}
            selectedDate={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            onDateSelect={handleDateSelect}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onHeaderClick={() => setViewMode('month')}
          />
        )}
      </ResponsivePopup>
    </div>
  );
}
