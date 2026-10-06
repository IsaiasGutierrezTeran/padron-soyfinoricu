import { Printer, RotateCcw, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { consultarPadron, PadronApiError } from './api'
import { PARTY_NAME, PERIOD, SLOGAN } from './brand'
import { HeroBanner } from './components/HeroBanner'
import { Logo } from './components/Logo'
import { ResultCard } from './components/ResultCard'
import { ResultSkeleton } from './components/ResultSkeleton'
import { SearchForm } from './components/SearchForm'
import { SplashScreen } from './components/SplashScreen'
import { StatusMessage } from './components/StatusMessage'
import { VisitCounter } from './components/VisitCounter'
import type { PadronRecord } from './types'

type ViewState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; records: PadronRecord[] }
  | { status: 'error'; message: string; code?: string }

function App() {
  const [state, setState] = useState<ViewState>({ status: 'idle' })
  const [showSplash, setShowSplash] = useState(true)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => () => abortRef.current?.abort(), [])

  async function handleSearch(registro: string) {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState({ status: 'loading' })
    try {
      const res = await consultarPadron(registro, controller.signal)
      setState({ status: 'success', records: [res.data, ...res.adicionales] })
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      if (err instanceof PadronApiError) {
        setState({ status: 'error', message: err.message, code: err.code })
      } else {
        setState({ status: 'error', message: 'Ocurrió un error inesperado. Intenta nuevamente.' })
      }
    }
  }

  function handleReset() {
    abortRef.current?.abort()
    setState({ status: 'idle' })
  }

  const showingResult = state.status === 'success'

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <VisitCounter />
      <div className="min-h-dvh bg-app-field">
        <HeroBanner />

        <header className="no-print bg-brand-field">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex items-center gap-3.5">
              <Logo />
              <div>
                <p className="flex items-baseline gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-white/75 sm:text-sm">
                    {SLOGAN}
                  </span>
                </p>
                <h1 className="font-display text-2xl font-extrabold italic leading-tight text-white sm:text-[28px]">
                  Consulta al Padrón Electoral
                </h1>
                <p className="text-xs font-semibold text-brand-accent">
                  {PARTY_NAME} · {PERIOD}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-5 py-7 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-5">
            {state.status === 'idle' && (
              <div className="animate-card-in rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <ShieldCheck className="size-6" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-extrabold italic text-ink">Verifica tu habilitación</h2>
                    <p className="text-sm text-slate-500">Ingresa tu número de registro para ver tu lugar de votación.</p>
                  </div>
                </div>
                <SearchForm onSubmit={handleSearch} loading={false} />
              </div>
            )}

            {state.status === 'loading' && (
              <>
                <div className="animate-card-in rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card sm:p-7">
                  <SearchForm onSubmit={handleSearch} loading />
                </div>
                <ResultSkeleton />
              </>
            )}

            {state.status === 'error' && (
              <>
                <StatusMessage message={state.message} code={state.code} />
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  <RotateCcw className="size-4" />
                  Intentar con otro registro
                </button>
              </>
            )}

            {showingResult && (
              <>
                <div className="animate-card-in flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 shadow-soft">
                  <div className="flex items-center gap-2.5 text-brand-blue">
                    <UserRoundCheck className="size-6" strokeWidth={2.2} />
                    <div>
                      <h2 className="font-display text-lg font-extrabold italic leading-none text-ink">
                        {state.records[0].nombre}
                      </h2>
                      <p className="text-xs font-semibold text-slate-400">
                        {state.records.length > 1
                          ? `Registrado en ${state.records.length} carreras`
                          : 'Estudiante habilitado'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="no-print hidden shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:flex"
                  >
                    <Printer className="size-4" />
                    Imprimir
                  </button>
                </div>

                {state.records.length > 1 && (
                  <p className="no-print -mt-2 rounded-xl border border-brand-blue/15 bg-brand-blue/5 px-4 py-2.5 text-sm font-medium text-brand-blue-dark">
                    Tu registro figura en {state.records.length} carreras. Se muestran todas a continuación.
                  </p>
                )}

                {state.records.map((record, i) => (
                  <ResultCard key={`${record.fac}-${record.registro}`} record={record} index={i} />
                ))}

                <div className="no-print flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-button px-5 py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-brand-blue-dark active:scale-[0.99]"
                  >
                    <RotateCcw className="size-5" />
                    Nueva consulta
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-base font-bold text-slate-600 transition hover:bg-slate-50 sm:hidden"
                  >
                    <Printer className="size-5" />
                    Imprimir
                  </button>
                </div>
              </>
            )}
          </div>
        </main>

        <footer className="no-print px-5 pb-8 text-center text-xs font-medium text-slate-400">
          {PARTY_NAME} · {PERIOD} · {SLOGAN}
        </footer>
      </div>
    </>
  )
}

export default App
