import { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { dayjs, type Dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { ResponsivePopup } from '@/components/ui/ResponsivePopup';
import { YearView } from './YearView';
import { MonthView } from './MonthView';
import type { ThaiMonthPickerProps, PopupPosition } from './types';

type MonthViewMode = 'month' | 'year';
const POPUP_HEIGHT = 350;

/**
 * ThaiMonthPicker - Thai Buddhist Era month picker
 * 
 * Features:
 * - Month/Year drill-down selection
 * - Responsive: Modal on mobile, Popover on desktop
 * - Auto-positioning (opens up if not enough space below)
 */
export function ThaiMonthPicker({ 
  value, 
  onChange,
  placeholder = 'เลือกเดือน'
}: ThaiMonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<MonthViewMode>('month');
  const [popupPosition, setPopupPosition] = useState<PopupPosition>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedDate = value ? dayjs(value) : dayjs();
  const [viewDate, setViewDate] = useState(selectedDate);

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
      setViewDate(value ? dayjs(value) : dayjs());
      setViewMode('month');
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

  const handleYearSelect = (year: number) => {
    setViewDate((prev: Dayjs) => prev.year(year));
    setViewMode('month');
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = viewDate.month(monthIndex).startOf('month');
    onChange(newDate);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border",
          "border-slate-200 bg-white px-4 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 transition-all"
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-slate-500" />
          <span className="text-base">
            {value ? dayjs(value).format('MMMM BBBB') : placeholder}
          </span>
        </span>
      </button>

      {/* Popup */}
      <ResponsivePopup isOpen={isOpen} onClose={handleClose} position={popupPosition}>
        {viewMode === 'year' ? (
          <YearView 
            viewDate={viewDate} 
            setViewDate={setViewDate} 
            onYearSelect={handleYearSelect} 
          />
        ) : (
          <MonthView 
            viewDate={viewDate} 
            setViewDate={setViewDate} 
            selectedDate={value ? dayjs(value) : null}
            onMonthSelect={handleMonthSelect}
            onHeaderClick={() => setViewMode('year')}
          />
        )}
      </ResponsivePopup>
    </div>
  );
}
