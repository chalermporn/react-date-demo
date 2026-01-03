import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

// --- Config Day.js ---
dayjs.extend(buddhistEra);
dayjs.locale('th');

// --- Utility สำหรับ Tailwind ---
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [monthDate, setMonthDate] = useState(dayjs());
  const [dateMinOnly, setDateMinOnly] = useState<dayjs.Dayjs | null>(null);
  const [dateRange, setDateRange] = useState<dayjs.Dayjs | null>(null);
  
  const today = dayjs().startOf('day');
  const twoMonthsLater = dayjs().add(2, 'month').endOf('day');
  
  // ลบส่วนโหลด Script decimal.js ออก เพราะใช้ Math ปกติแทน

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900 overflow-y-auto">
      
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200 my-8">
        
        {/* --- ส่วนที่ 1: Month Picker --- */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight">1. เลือกเดือน (Month Picker)</h1>
            <p className="text-xs text-slate-500">Responsive Modal/Popover</p>
          </div>
          <ThaiMonthPicker 
            value={monthDate} 
            onChange={setMonthDate} 
          />
        </div>

        <hr className="border-slate-100" />

        {/* --- ส่วนที่ 2: Date Picker (Min Date) --- */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-violet-900">2. กำหนดขั้นต่ำ (Min Date)</h1>
            <p className="text-xs text-slate-500">
               Mobile First: แสดงเป็น Modal บนมือถือ
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              วันที่เริ่มงาน
            </label>
            
            <ThaiDatePicker 
              value={dateMinOnly} 
              onChange={setDateMinOnly}
              minDate={today}
            />
          </div>
        </div>

        <hr className="border-slate-100" />

         {/* --- ส่วนที่ 3: Date Picker (Range) --- */}
         <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-indigo-900">3. กำหนดช่วง (Range Limit)</h1>
            <p className="text-xs text-slate-500">
               Desktop: แสดงเป็น Popover
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              วันที่นัดหมาย
            </label>
            
            <ThaiDatePicker 
              value={dateRange} 
              onChange={setDateRange}
              minDate={today}
              maxDate={twoMonthsLater}
            />
          </div>
          
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-sm">
             <p className="font-semibold mb-1 text-indigo-900">ช่วงที่เลือกได้:</p>
             <div className="flex justify-between text-xs text-indigo-700">
                <span>Min: {today.format('D MMM YY')}</span>
                <span>Max: {twoMonthsLater.format('D MMM YY')}</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Shared Component: YearView
// ----------------------------------------------------------------------
interface YearViewProps {
  viewDate: dayjs.Dayjs;
  setViewDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  onYearSelect: (year: number) => void;
}

function YearView({ viewDate, setViewDate, onYearSelect }: YearViewProps) {
    // กลับมาใช้ Math มาตรฐาน เพื่อแก้ปัญหา CDN โหลดไม่ติด
    const currentYear = viewDate.year();
    const startYear = Math.floor(currentYear / 12) * 12;
    const endYear = startYear + 11;
    
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);
  
    const handlePrevDecade = () => setViewDate(prev => prev.subtract(12, 'year'));
    const handleNextDecade = () => setViewDate(prev => prev.add(12, 'year'));
  
    return (
      <div className="animate-in fade-in-0 zoom-in-95">
        <div className="flex items-center justify-between mb-4 px-1">
          <button onClick={handlePrevDecade} className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <div className="font-semibold text-base cursor-default">
             {startYear + 543} - {endYear + 543}
          </div>
          <button onClick={handleNextDecade} className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"><ChevronRight className="h-5 w-5" /></button>
        </div>
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
  
  // ----------------------------------------------------------------------
  // Shared Component: MonthView
  // ----------------------------------------------------------------------
  interface MonthViewProps {
    viewDate: dayjs.Dayjs;
    setViewDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
    selectedDate: dayjs.Dayjs | null;
    onMonthSelect: (monthIndex: number) => void;
    onHeaderClick: () => void;
    highlightColor?: "slate" | "violet";
  }

  function MonthView({ viewDate, setViewDate, selectedDate, onMonthSelect, onHeaderClick, highlightColor = "slate" }: MonthViewProps) {
    const handlePrevYear = () => setViewDate(prev => prev.subtract(1, 'year'));
    const handleNextYear = () => setViewDate(prev => prev.add(1, 'year'));
    
    const bgSelected = highlightColor === 'violet' ? 'bg-violet-600' : 'bg-slate-900';
    const textHover = highlightColor === 'violet' ? 'hover:bg-violet-50 text-slate-700' : 'hover:bg-slate-100 text-slate-700';
  
    const monthsList = Array.from({ length: 12 }, (_, i) => viewDate.month(i).format('MMM'));
  
    return (
      <div className="animate-in fade-in-0 zoom-in-95">
         <div className="flex items-center justify-between mb-4 px-1">
            <button onClick={handlePrevYear} className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
            <button 
                onClick={onHeaderClick}
                className="font-bold text-base hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
            >
                พ.ศ. {viewDate.format('BBBB')}
            </button>
            <button onClick={handleNextYear} className="h-8 w-8 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 transition-colors"><ChevronRight className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {monthsList.map((monthName, index) => (
              <button
                key={index}
                onClick={() => onMonthSelect(index)}
                className={cn(
                  "text-sm py-3 px-1 rounded-lg transition-colors border border-transparent", 
                  selectedDate && selectedDate.month() === index && selectedDate.year() === viewDate.year() 
                    ? `${bgSelected} text-white` 
                    : textHover
                )}
              >
                {monthName}
              </button>
            ))}
          </div>
      </div>
    );
  }

// --- Helper: Responsive Modal/Popover Wrapper ---
interface ResponsivePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function ResponsivePopup({ isOpen, onClose, children, className }: ResponsivePopupProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* 1. Backdrop (Mobile Only) */}
            <div 
                className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />
            
            {/* 2. Container */}
            <div className={cn(
                // Common
                "z-50 bg-white shadow-2xl border border-slate-100 overflow-hidden",
                
                // Mobile: Fixed Centered Modal
                "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[360px] rounded-2xl p-5",
                "md:p-4", // reset padding desktop
                
                // Desktop: Absolute Popover
                "md:absolute md:left-0 md:top-full md:translate-x-0 md:translate-y-0 md:w-auto md:min-w-[320px] md:mt-2 md:rounded-xl",

                // Animations
                "animate-in fade-in-0 zoom-in-95 duration-200 slide-in-from-bottom-4 md:slide-in-from-top-2",
                
                className
            )}>
                {/* Mobile Close Button Header */}
                <div className="md:hidden flex justify-end mb-2">
                    <button onClick={onClose} className="p-1 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {children}
            </div>
        </>
    );
}

// --- Component 1: ThaiMonthPicker (เลือกเดือน) ---
interface ThaiMonthPickerProps {
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs) => void;
}

function ThaiMonthPicker({ value, onChange }: ThaiMonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month'); 
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedDate = value ? dayjs(value) : dayjs();
  const [viewDate, setViewDate] = useState(selectedDate);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // ใช้ mousedown เฉพาะ desktop เพราะ mobile มี backdrop
    if (window.innerWidth >= 768) {
       document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => { 
      if (isOpen) {
          setViewDate(value ? dayjs(value) : dayjs());
          setViewMode('month');
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleYearSelect = (year: number) => {
      const newView = viewDate.year(year);
      setViewDate(newView);
      setViewMode('month');
  };

  const handleMonthSelect = (monthIndex: number) => {
      const newDate = viewDate.month(monthIndex).startOf('month');
      onChange(newDate);
      setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 transition-all",
        )}
      >
        <span className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-slate-500" />
          <span className="text-base">
            {value ? dayjs(value).format('MMMM BBBB') : 'เลือกเดือน'}
          </span>
        </span>
      </button>

      <ResponsivePopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
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

// --- Component 2: ThaiDatePicker (เลือกวันที่) ---
interface ThaiDatePickerProps {
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs) => void;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
}

function ThaiDatePicker({ value, onChange, minDate, maxDate }: ThaiDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day'); 
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedDate = value ? dayjs(value) : null;
  const initialViewDate = selectedDate || (minDate ? dayjs(minDate) : dayjs());
  const [viewDate, setViewDate] = useState(initialViewDate);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    // Desktop only click outside detection
    if (window.innerWidth >= 768) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => { 
      if (isOpen) {
          const targetView = value ? dayjs(value) : (minDate ? dayjs(minDate) : dayjs());
          setViewDate(targetView);
          setViewMode('day'); 
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handlePrevMonth = () => setViewDate(prev => prev.subtract(1, 'month'));
  const handleNextMonth = () => setViewDate(prev => prev.add(1, 'month'));

  const handleDateSelect = (day: number): void => {
    const newDate = viewDate.date(day);
    onChange(newDate);
    setIsOpen(false);
  };
  
  const handleMonthSelect = (monthIndex: number) => {
      setViewDate(prev => prev.month(monthIndex));
      setViewMode('day');
  };

  const handleYearSelect = (year: number) => {
      setViewDate(prev => prev.year(year));
      setViewMode('month');
  };

  const daysInMonth = viewDate.daysInMonth();
  const startDayOfWeek = viewDate.startOf('month').day();
  
  // กลับมาใช้ Array.from ปกติ
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: startDayOfWeek }, (_, i) => i);
  const weekDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 text-left border rounded-xl flex items-center justify-between transition-all duration-200 h-12",
          "bg-white border-slate-200",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500",
          isOpen && "ring-2 ring-violet-500/20 border-violet-500"
        )}
      >
        <span className={cn("text-base truncate", !selectedDate ? "text-slate-400" : "text-slate-900")}>
           {selectedDate ? selectedDate.format('D MMMM BBBB') : "เลือกวันที่"}
        </span>
        <CalendarIcon className="h-5 w-5 text-violet-500 opacity-70 flex-shrink-0" />
      </button>

      <ResponsivePopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
          
          {/* 1. Year View */}
          {viewMode === 'year' && (
              <YearView 
                viewDate={viewDate} 
                setViewDate={setViewDate} 
                onYearSelect={handleYearSelect} 
              />
          )}

          {/* 2. Month View */}
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

          {/* 3. Day View (Default) */}
          {viewMode === 'day' && (
            <div className="animate-in fade-in-0 zoom-in-95">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="h-8 w-8 hover:bg-violet-50 text-violet-600 rounded-full transition-colors flex items-center justify-center">
                       <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    <button 
                        onClick={() => setViewMode('month')}
                        className="font-bold text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors text-base"
                    >
                        {viewDate.format('MMMM BBBB')}
                    </button>
                    
                    <button onClick={handleNextMonth} className="h-8 w-8 hover:bg-violet-50 text-violet-600 rounded-full transition-colors flex items-center justify-center">
                       <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map(d => (
                    <div key={d} className="text-center text-xs text-slate-400 font-medium">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {blanksArray.map(i => <div key={`blank-${i}`} />)}
                    {daysArray.map(day => {
                    const currentDayObj = viewDate.date(day);
                    
                    const isSelected = selectedDate && selectedDate.isSame(currentDayObj, 'day');
                    const isToday = dayjs().isSame(currentDayObj, 'day');

                    let isDisabled = false;
                    if (minDate && currentDayObj.isBefore(minDate, 'day')) isDisabled = true;
                    if (maxDate && currentDayObj.isAfter(maxDate, 'day')) isDisabled = true;

                    return (
                        <button
                        key={day}
                        disabled={isDisabled}
                        onClick={() => !isDisabled && handleDateSelect(day)}
                        className={cn(
                            "h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-sm transition-all relative",
                            isSelected && !isDisabled ? "bg-violet-600 text-white shadow-md shadow-violet-200 z-10" : "",
                            !isSelected && !isDisabled ? "hover:bg-violet-50 text-slate-700" : "",
                            isToday && !isSelected && !isDisabled && "text-violet-600 font-bold bg-violet-50",
                            isDisabled && "text-slate-300 cursor-not-allowed hover:bg-transparent decoration-slate-300"
                        )}
                        >
                        {day}
                        </button>
                    );
                    })}
                </div>
            </div>
          )}
          
      </ResponsivePopup>
    </div>
  );
}