import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ResponsivePopupProps } from '@/components/date-picker/types';

/**
 * ResponsivePopup - A responsive modal/popover wrapper
 * 
 * - Mobile: Displays as a centered modal with backdrop
 * - Desktop: Displays as an absolute positioned popover
 * - Supports top/bottom positioning with auto-detection
 */
export function ResponsivePopup({ 
  isOpen, 
  onClose, 
  children, 
  className, 
  position = 'bottom' 
}: ResponsivePopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop (Mobile Only) */}
      <div 
        className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Container */}
      <div 
        className={cn(
          // Common styles
          "z-50 bg-white shadow-2xl border border-slate-100 overflow-hidden",
          
          // Mobile: Fixed Centered Modal
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[90%] max-w-[360px] rounded-2xl p-5",
          "md:p-4",
          
          // Desktop: Absolute Popover
          "md:absolute md:left-0 md:right-auto md:w-auto md:min-w-[320px] md:rounded-xl",
          "md:translate-x-0 md:translate-y-0",
          
          // Position: top or bottom
          position === 'bottom' 
            ? "md:top-full md:bottom-auto md:mt-2" 
            : "md:bottom-full md:top-auto md:mb-2",

          // Animations
          "animate-in fade-in-0 zoom-in-95 duration-200",
          position === 'bottom' 
            ? "slide-in-from-bottom-4 md:slide-in-from-top-2"
            : "slide-in-from-bottom-4 md:slide-in-from-bottom-2",
          
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-2">
          <button 
            onClick={onClose} 
            className="p-1 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {children}
      </div>
    </>
  );
}
