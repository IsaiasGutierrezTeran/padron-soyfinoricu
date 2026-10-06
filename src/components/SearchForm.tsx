import { Loader2, Search } from 'lucide-react'
import { type FormEvent, useId, useState } from 'react'

interface SearchFormProps {
  onSubmit: (registro: string) => void
  loading: boolean
}

export function SearchForm({ onSubmit, loading }: SearchFormProps) {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const inputId = useId()

  const digitsOnly = value.replace(/\D/g, '')
  const hasInvalidChars = touched && value !== '' && value !== digitsOnly
  const tooShort = touched && digitsOnly.length > 0 && digitsOnly.length < 5

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value.replace(/\D/g, ''))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (digitsOnly.length < 5 || loading) return
    onSubmit(digitsOnly)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
      <label htmlFor={inputId} className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
        Número de Registro <span className="text-brand-button">*</span>
      </label>

      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="Ej: 218012345"
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        disabled={loading}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-button focus:bg-white focus:ring-4 focus:ring-brand-button/10 disabled:opacity-60"
      />

      <p className="text-sm text-slate-500">Ingresa únicamente los números de tu registro universitario.</p>
      {hasInvalidChars && <p className="text-sm font-semibold text-red-600">No incluyas espacios, puntos ni guiones.</p>}
      {tooShort && <p className="text-sm font-semibold text-red-600">Tu registro debe tener al menos 5 dígitos.</p>}

      <button
        type="submit"
        disabled={loading || digitsOnly.length < 5}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-button px-5 py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-brand-blue-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-button"
      >
        {loading ? <Loader2 className="size-5 animate-spin" /> : <Search className="size-5" />}
        {loading ? 'Consultando…' : 'Consultar'}
      </button>
    </form>
  )
}
