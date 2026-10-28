import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function StatCard({
  icon: Icon,
  iconBg = 'bg-blue-50 text-blue-600',
  title,
  value,
  trend,
  trendLabel = 'vs. previous 7 days',
  badgeText,
  badgeType = 'warning',
  compact = true
}) {
  if (compact) {
    return (
      <div className="bg-white rounded-xl px-3 py-1.5 border border-slate-200/80 shadow-2xs flex items-center space-x-2.5 hover:border-slate-300 transition-all shrink-0">
        {Icon && (
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
        <div className="leading-tight">
          <span className="text-[10px] font-semibold text-slate-400 block">{title}</span>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="text-xs font-extrabold text-[#17324D]">{value}</span>
            {badgeText && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  badgeType === 'danger'
                    ? 'bg-[#FEECEB] text-[#D32F2F]'
                    : badgeType === 'success'
                    ? 'bg-[#E9F5EE] text-[#227244]'
                    : 'bg-[#FEF7E6] text-[#B87C06]'
                }`}
              >
                {badgeText}
              </span>
            )}
            {trend && (
              <span className="text-[10px] font-bold text-[#2E945A] ml-0.5">
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block mb-1">{title}</span>
          <h3 className="text-2xl font-bold text-[#17324D] tracking-tight">{value}</h3>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="mt-4 pt-2 flex items-center">
        {trend && (
          <div className="flex items-center text-xs font-semibold text-[#2E945A] gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{trend}</span>
            <span className="text-slate-400 font-normal ml-1">{trendLabel}</span>
          </div>
        )}

        {badgeText && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
              badgeType === 'danger'
                ? 'bg-[#FEECEB] text-[#D32F2F]'
                : badgeType === 'success'
                ? 'bg-[#E9F5EE] text-[#227244]'
                : 'bg-[#FEF7E6] text-[#B87C06]'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>{badgeText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
