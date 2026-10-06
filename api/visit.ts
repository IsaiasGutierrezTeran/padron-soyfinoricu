/// <reference types="node" />
import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'

// Contador de visitas ÚNICAS por IP. Cada IP solo cuenta una vez (para
// siempre, vía un set en Redis) sin importar cuántas veces recargue la
// página o desde cuántos dispositivos/navegadores distintos entre con la
// misma IP (ej. la misma red wifi).
//
// Requiere una base de datos Redis conectada al proyecto en Vercel:
// Project → Storage → Create Database → Upstash for Redis → Connect.
// Según la integración, las env vars quedan como UPSTASH_REDIS_REST_* o
// (la variante más común hoy) KV_REST_API_* — soportamos ambas.

const SET_KEY = 'sf_unique_visitor_hashes'
const SALT = process.env.VISIT_SALT || 'soy-finor-icu-2026'
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN

function getClientIp(req: { headers: Record<string, string | string[] | undefined> }) {
  const fwd = req.headers['x-forwarded-for']
  const first = Array.isArray(fwd) ? fwd[0] : fwd
  const ip = first?.split(',')[0]?.trim()
  return ip || (req.headers['x-real-ip'] as string) || 'unknown'
}

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store')

  const url = REDIS_URL
  const token = REDIS_TOKEN

  if (!url || !token) {
    // Todavía no se conectó la base de datos: no rompemos nada, solo
    // avisamos para que quien lo despliegue sepa qué falta.
    res.status(200).json({ count: null, configured: false })
    return
  }

  try {
    const redis = new Redis({ url, token })
    const ip = getClientIp(req)
    const hash = createHash('sha256').update(ip + SALT).digest('hex')

    await redis.sadd(SET_KEY, hash)
    const count = await redis.scard(SET_KEY)

    res.status(200).json({ count, configured: true })
  } catch {
    res.status(200).json({ count: null, configured: true, error: true })
  }
}
