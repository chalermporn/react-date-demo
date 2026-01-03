import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import type { YearViewProps } from './types';

/**
 * YearView - Year selection grid (12 years per page)
 * 
 * Displays years in Buddhist Era format (พ.ศ.)
 */
export function YearView({ viewDate, setViewDate, onYearSelect }: YearViewProps) {
  const currentYear = viewDate.year();
  const startYear = Math.floor(currentYear / 12) * 12;
  const endYear = startYear + 11;
  
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  const handlePrevDecade = () => setViewDate(prev => prev.subtract(12, 'year'));
  const handleNextDecade = () => setViewDate(prev => prev.add(12, 'year'));

  return (
    <div className="animate-in fade-in-0 zoom-in-95">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button 
          onClick={handlePrevDecade} 
          className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
          aria-label="12 ปีก่อนหน้า"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="font-semibold text-base cursor-default">
          {startYear + 543} - {endYear + 543}
        </div>
        
        <button 
          onClick={handleNextDecade} 
          className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
          aria-label="12 ปีถัดไป"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Year Grid */}
      <div className="grid grid-cols-3 gap-3">
        {years.map((year) => {
          const isSelected = viewDate.year() === year;
          const isCurrentYear = dayjs().year() === year;
          
          return (
            <button
              key={year}
              onClick={() => onYearSelect(year)}
              className={cn(
                "text-sm py-3 px-1 rounded-lg transition-colors border",
                isSelected 
                  ? "bg-slate-900 text-white border-slate-900" 
                  : "hover:bg-slate-50 text-slate-700 border-transparent",
                isCurrentYear && !isSelected && "text-slate-900 font-bold bg-slate-50 border-slate-200"
              )}
            >
              {year + 543}
            </button>
          );
        })}
      </div>
    </div>
  );
}
