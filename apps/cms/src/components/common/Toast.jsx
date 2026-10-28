import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
        let borderClass = 'border-emerald-200 bg-emerald-50/95 text-emerald-900';

        if (toast.type === 'error' || toast.type === 'danger') {
          icon = <AlertCircle className="w-4 h-4 text-red-600" />;
          borderClass = 'border-red-200 bg-red-50/95 text-red-900';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-4 h-4 text-amber-600" />;
          borderClass = 'border-amber-200 bg-amber-50/95 text-amber-900';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-blue-600" />;
          borderClass = 'border-blue-200 bg-blue-50/95 text-blue-900';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg backdrop-blur-sm text-xs font-medium transition-all transform duration-200 animate-slideUp ${borderClass}`}
          >
            <div className="flex items-center space-x-2.5">
              {icon}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
