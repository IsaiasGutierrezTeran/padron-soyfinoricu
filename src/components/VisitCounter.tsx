import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'

// Contador de visitas únicas por IP (ver api/visit.ts). Se cuenta una vez
// por request a este endpoint, independiente del navegador/dispositivo:
// el backend es el que decide si la IP ya fue contada o no.
const STORAGE_KEY = 'sf-visit-count-cache'

let hasHit = false // evita doble llamada por el doble-mount de StrictMode en dev

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(() => {
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY)
      return cached ? Number(cached) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (hasHit) return
    hasHit = true

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)

    fetch('/api/visit', { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { count?: number | null }) => {
        if (typeof data.count === 'number') {
          setCount(data.count)
          try {
            sessionStorage.setItem(STORAGE_KEY, String(data.count))
          } catch {
            // ignorar si sessionStorage no está disponible
          }
        }
      })
      .catch(() => {
        // endpoint no disponible (ej. en `npm run dev` sin `vercel dev`, o
        // la base de datos todavía no está conectada): no mostramos nada
      })
      .finally(() => clearTimeout(timeout))
  }, [])

  if (count === null) return null

  return (
    <div
      className="no-print fixed bottom-3 right-3 z-40 flex items-center gap-1.5 rounded-full bg-brand-blue-dark/80 px-2.5 py-1.5 text-white shadow-soft backdrop-blur-sm"
      title="Visitantes únicos (por IP)"
      aria-label={`${count} visitantes únicos`}
    >
      <Eye className="size-3.5 opacity-80" strokeWidth={2.2} />
      <span className="text-[11px] font-semibold tabular-nums opacity-90">{count.toLocaleString('es-BO')}</span>
    </div>
  )
}
