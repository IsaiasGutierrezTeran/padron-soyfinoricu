import { Check, X } from 'lucide-react'

export function StatusBadge({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
        enabled ? 'border-brand-accent-light bg-brand-accent-light/25' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <span
        className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${
          enabled ? 'bg-brand-button/10 text-brand-button' : 'bg-slate-200/70 text-slate-500'
        }`}
      >
        {enabled ? <Check className="size-3.5" strokeWidth={3} /> : <X className="size-3.5" strokeWidth={3} />}
        {enabled ? 'Habilitado' : 'No habilitado'}
      </span>
    </div>
  )
}
