import { GraduationCap, MapPin } from 'lucide-react'
import type { PadronRecord } from '../types'
import { StatusBadge } from './StatusBadge'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 font-semibold text-ink">{value}</p>
    </div>
  )
}

export function ResultCard({ record, index }: { record: PadronRecord; index: number }) {
  const isSi = (v: string) => v?.trim().toUpperCase() === 'SI'

  return (
    <section
      className="animate-card-in overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-card"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="relative overflow-hidden bg-brand-blue px-5 py-5 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 85% 20%, rgba(255,255,255,0.5) 0, transparent 45%), radial-gradient(circle at 15% 90%, rgba(255,255,255,0.35) 0, transparent 40%)',
          }}
        />
        <div className="relative flex flex-wrap items-center gap-x-8 gap-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">Mesa</p>
            <p className="font-display text-5xl font-black italic leading-none text-white">{record.mesa}</p>
          </div>
          <div className="flex flex-col gap-1.5 text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              Recinto · {record.lugar_1}
            </span>
            <span className="font-display text-xl font-bold italic leading-none">{record.recinto}</span>
            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold backdrop-blur-sm">
              {record.lugar_2} {record.aula}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-5 sm:p-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <GraduationCap className="size-[18px] text-brand-blue" strokeWidth={2.5} />
            <h3 className="text-sm font-extrabold uppercase tracking-wide">Datos académicos</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Registro" value={record.registro} />
            <Field label="Carrera" value={record.carrera} />
            <div className="sm:col-span-2">
              <Field label="Facultad" value={record.facultad} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-slate-700">
            Habilitado para votar en
          </h3>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <StatusBadge label="FUL" enabled={isSi(record.ful)} />
            <StatusBadge label="Centro Interno" enabled={isSi(record.centro_interno)} />
            <StatusBadge label="ICU Facultativo" enabled={isSi(record.icu_facultativo)} />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <MapPin className="size-[18px] text-brand-blue" strokeWidth={2.5} />
            <h3 className="text-sm font-extrabold uppercase tracking-wide">Ubicación de votación</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-4">
            <Field label="Sede" value={record.lugar_1} />
            <Field label="Recinto" value={record.recinto} />
            <Field label="Mesa" value={record.mesa} />
            <Field label="Aula" value={record.aula} />
          </div>
        </div>
      </div>
    </section>
  )
}
