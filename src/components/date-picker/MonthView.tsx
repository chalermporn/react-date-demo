import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MonthViewProps } from './types';

/**
 * MonthView - Month selection grid
 * 
 * Displays 12 months in Thai format with Buddhist Era year header
 */
export function MonthView({ 
  viewDate, 
  setViewDate, 
  selectedDate, 
  onMonthSelect, 
  onHeaderClick, 
  highlightColor = 'slate' 
}: MonthViewProps) {
  const handlePrevYear = () => setViewDate(prev => prev.subtract(1, 'year'));
  const handleNextYear = () => setViewDate(prev => prev.add(1, 'year'));
  
  const bgSelected = highlightColor === 'violet' ? 'bg-violet-600' : 'bg-slate-900';
  const textHover = highlightColor === 'violet' ? 'hover:bg-violet-50 text-slate-700' : 'hover:bg-slate-100 text-slate-700';

  const monthsList = Array.from({ length: 12 }, (_, i) => viewDate.month(i).format('MMM'));

  return (
    <div className="animate-in fade-in-0 zoom-in-95">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button 
          onClick={handlePrevYear} 
          className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
          aria-label="ปีก่อนหน้า"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button 
          onClick={onHeaderClick}
          className="font-bold text-base hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          พ.ศ. {viewDate.format('BBBB')}
        </button>
        
        <button 
          onClick={handleNextYear} 
          className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
          aria-label="ปีถัดไป"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-3 gap-3">
        {monthsList.map((monthName, index) => {
          const isSelected = selectedDate 
            && selectedDate.month() === index 
            && selectedDate.year() === viewDate.year();
          
          return (
            <button
              key={index}
              onClick={() => onMonthSelect(index)}
              className={cn(
                "text-sm py-3 px-1 rounded-lg transition-colors border border-transparent", 
                isSelected ? `${bgSelected} text-white` : textHover
              )}
            >
              {monthName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
