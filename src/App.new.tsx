import { useState } from 'react';
import { dayjs } from '@/lib/dayjs';
import { ThaiMonthPicker, ThaiDatePicker } from '@/components/date-picker';

export default function App() {
  const [monthDate, setMonthDate] = useState(dayjs());
  const [dateMinOnly, setDateMinOnly] = useState<ReturnType<typeof dayjs> | null>(null);
  const [dateRange, setDateRange] = useState<ReturnType<typeof dayjs> | null>(null);
  
  const today = dayjs().startOf('day');
  const twoMonthsLater = dayjs().add(2, 'month').endOf('day');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900 overflow-y-auto">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200 my-8">
        
        {/* --- Section 1: Month Picker --- */}
        <section className="space-y-4">
          <header className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight">
              1. เลือกเดือน (Month Picker)
            </h1>
            <p className="text-xs text-slate-500">
              Responsive Modal/Popover
            </p>
          </header>
          
          <ThaiMonthPicker 
            value={monthDate} 
            onChange={setMonthDate} 
          />
        </section>

        <hr className="border-slate-100" />

        {/* --- Section 2: Date Picker (Min Date) --- */}
        <section className="space-y-4">
          <header className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-violet-900">
              2. กำหนดขั้นต่ำ (Min Date)
            </h1>
            <p className="text-xs text-slate-500">
              Mobile First: แสดงเป็น Modal บนมือถือ
            </p>
          </header>

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
        </section>

        <hr className="border-slate-100" />

        {/* --- Section 3: Date Picker (Range) --- */}
        <section className="space-y-4">
          <header className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-indigo-900">
              3. กำหนดช่วง (Range Limit)
            </h1>
            <p className="text-xs text-slate-500">
              Desktop: แสดงเป็น Popover
            </p>
          </header>

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
        </section>

      </div>
    </div>
  );
}
