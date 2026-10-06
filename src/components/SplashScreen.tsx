import { useEffect, useState } from 'react'
import { PARTY_NAME, SLOGAN } from '../brand'
import { Logo } from './Logo'

const HOLD_MS = 1200
const FADE_MS = 500

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaving(true)
      setTimeout(onFinish, FADE_MS)
    }, HOLD_MS)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`no-print bg-brand-field fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ease-out ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-[splash-pop_0.7s_cubic-bezier(0.16,1,0.3,1)_both] text-center">
        <Logo className="mx-auto h-24 w-24 drop-shadow-xl" />
        <p className="mt-4 font-display text-2xl font-extrabold italic text-white sm:text-3xl">{PARTY_NAME}</p>
        <p className="mt-1 text-sm font-semibold text-white/75">{SLOGAN}</p>
      </div>
      <div className="h-1 w-32 overflow-hidden rounded-full bg-white/20">
        <div className="h-full w-full origin-left animate-[splash-bar_1.1s_ease-in-out_0.2s_both] rounded-full bg-brand-accent" />
      </div>
    </div>
  )
}
