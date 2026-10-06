import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'

// Contador de visitas compartido entre dispositivos vía Abacus (gratuito,
// sin backend propio). Si el servicio no responde, el badge simplemente no
// se muestra — nunca bloquea ni rompe el resto de la página.
const NAMESPACE = 'soyfinoricu-padron-icu-2026'
const KEY = 'visitas'
const COUNTER_URL = `https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`
const STORAGE_KEY = 'sf-visit-count-cache'

let hasHit = false // evita doble conteo por el doble-mount de StrictMode en dev

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

    // Sin AbortController atado al unmount: en dev, StrictMode monta→limpia→
    // vuelve a montar el efecto, y abortar en el cleanup mataba el fetch real
    // antes de que resolviera. El timeout de abajo solo cubre el caso de que
    // el servicio esté realmente colgado.
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)

    fetch(COUNTER_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { value?: number }) => {
        if (typeof data.value === 'number') {
          setCount(data.value)
          try {
            sessionStorage.setItem(STORAGE_KEY, String(data.value))
          } catch {
            // ignorar si sessionStorage no está disponible
          }
        }
      })
      .catch(() => {
        // servicio caído o sin conexión: no mostramos nada, no rompemos la UI
      })
      .finally(() => clearTimeout(timeout))
  }, [])

  if (count === null) return null

  return (
    <div
      className="no-print fixed bottom-3 right-3 z-40 flex items-center gap-1.5 rounded-full bg-brand-blue-dark/80 px-2.5 py-1.5 text-white shadow-soft backdrop-blur-sm"
      title="Visitas a esta página"
      aria-label={`${count} visitas`}
    >
      <Eye className="size-3.5 opacity-80" strokeWidth={2.2} />
      <span className="text-[11px] font-semibold tabular-nums opacity-90">{count.toLocaleString('es-BO')}</span>
    </div>
  )
}
