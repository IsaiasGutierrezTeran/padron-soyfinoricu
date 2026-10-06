import { CheckCircle2, Info, ListChecks } from 'lucide-react'
import { PARTY_SIGLA, PERIOD, SLOGAN } from '../brand'

const steps = [
  'Ingresa tu número de registro universitario sin espacios ni guiones.',
  'Verifica tu mesa, recinto y aula antes del día de la elección.',
  'Lleva tu carnet universitario o cédula de identidad para votar.',
  'Si tus datos son incorrectos, acude al Comité Electoral de tu facultad.',
]

export function InfoPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-brand-accent/30 bg-white p-5 shadow-soft">
        <div className="mb-2 flex items-center gap-2.5">
          <Info className="size-5 text-brand-button" strokeWidth={2.5} />
          <h2 className="font-display text-xl font-extrabold text-ink">Aviso Importante</h2>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-600">
          No te olvides marcar dentro del cuadro de la papeleta.
        </p>
      </div>

      <div className="rounded-2xl border border-brand-blue/15 bg-white p-5 shadow-soft">
        <div className="mb-3 flex items-center gap-2.5">
          <ListChecks className="size-5 text-brand-blue" strokeWidth={2.5} />
          <div>
            <h2 className="font-display text-xl font-extrabold text-ink">Recomendaciones</h2>
            <p className="text-xs font-semibold text-slate-400">Lee antes de realizar tu consulta</p>
          </div>
        </div>
        <ol className="flex flex-col gap-3.5">
          {steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-[15px] leading-snug text-slate-600">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[11px] font-bold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="hidden items-center gap-2.5 rounded-2xl bg-brand-accent-light/25 p-4 text-sm text-brand-blue-dark sm:flex">
        <CheckCircle2 className="size-5 shrink-0" strokeWidth={2.5} />
        <span className="font-semibold">
          {PARTY_SIGLA} · {PERIOD} · {SLOGAN}
        </span>
      </div>
    </div>
  )
}
