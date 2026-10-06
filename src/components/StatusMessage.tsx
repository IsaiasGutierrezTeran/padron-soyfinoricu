import { AlertTriangle, SearchX } from 'lucide-react'

export function StatusMessage({ message, code }: { message: string; code?: string }) {
  const notFound = code === 'NOT_FOUND'
  const Icon = notFound ? SearchX : AlertTriangle

  return (
    <div className="flex animate-card-in flex-col items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-6 py-10 text-center shadow-card">
      <div
        className={`flex size-14 items-center justify-center rounded-full ${
          notFound ? 'bg-brand-accent-light/40 text-brand-button' : 'bg-red-50 text-red-500'
        }`}
      >
        <Icon className="size-7" strokeWidth={2} />
      </div>
      <h2 className="font-display text-2xl font-extrabold italic text-ink">
        {notFound ? 'Registro no encontrado' : 'Ocurrió un problema'}
      </h2>
      <p className="max-w-sm text-[15px] leading-relaxed text-slate-500">{message}</p>
    </div>
  )
}
