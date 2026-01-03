import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import type { DayViewProps } from './types';

const WEEKDAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

/**
 * DayView - Day selection calendar grid
 * 
 * Displays a monthly calendar with Thai weekday headers
 * Supports min/max date constraints
 */
export function DayView({ 
  viewDate, 
  selectedDate, 
  minDate, 
  maxDate, 
  onDateSelect, 
  onPrevMonth, 
  onNextMonth, 
  onHeaderClick 
}: DayViewProps) {
  const daysInMonth = viewDate.daysInMonth();
  const startDayOfWeek = viewDate.startOf('month').day();
  
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: startDayOfWeek }, (_, i) => i);

  return (
    <div className="animate-in fade-in-0 zoom-in-95">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onPrevMonth} 
          className="h-8 w-8 hover:bg-violet-50 text-violet-600 rounded-full transition-colors flex items-center justify-center"
          aria-label="เดือนก่อนหน้า"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button 
          onClick={onHeaderClick}
          className="font-bold text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors text-base"
        >
          {viewDate.format('MMMM BBBB')}
        </button>
        
        <button 
          onClick={onNextMonth} 
          className="h-8 w-8 hover:bg-violet-50 text-violet-600 rounded-full transition-colors flex items-center justify-center"
          aria-label="เดือนถัดไป"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs text-slate-400 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {/* Empty cells for alignment */}
        {blanksArray.map(i => (
          <div key={`blank-${i}`} />
        ))}
        
        {/* Day buttons */}
        {daysArray.map(day => {
          const currentDayObj = viewDate.date(day);
          const isSelected = selectedDate?.isSame(currentDayObj, 'day');
          const isToday = dayjs().isSame(currentDayObj, 'day');
          
          let isDisabled = false;
          if (minDate && currentDayObj.isBefore(minDate, 'day')) isDisabled = true;
          if (maxDate && currentDayObj.isAfter(maxDate, 'day')) isDisabled = true;

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => !isDisabled && onDateSelect(day)}
              className={cn(
                "h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-sm transition-all relative",
                isSelected && !isDisabled && "bg-violet-600 text-white shadow-md shadow-violet-200 z-10",
                !isSelected && !isDisabled && "hover:bg-violet-50 text-slate-700",
                isToday && !isSelected && !isDisabled && "text-violet-600 font-bold bg-violet-50",
                isDisabled && "text-slate-300 cursor-not-allowed hover:bg-transparent"
              )}
              aria-label={currentDayObj.format('D MMMM BBBB')}
              aria-selected={isSelected}
              aria-disabled={isDisabled}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
