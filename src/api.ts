import type { PadronResponse } from './types'

const API_URL = 'https://eleccionesuagrm.superficct.com/api/buscar.php'

export class PadronApiError extends Error {
  code?: string
  constructor(message: string, code?: string) {
    super(message)
    this.name = 'PadronApiError'
    this.code = code
  }
}

export async function consultarPadron(registro: string, signal?: AbortSignal) {
  const url = `${API_URL}?registro=${encodeURIComponent(registro)}`

  let res: Response
  try {
    res = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw new PadronApiError('No se pudo conectar con el servidor del padrón. Revisa tu conexión e intenta de nuevo.')
  }

  let json: PadronResponse
  try {
    json = (await res.json()) as PadronResponse
  } catch {
    throw new PadronApiError('El servidor respondió con datos inválidos. Intenta nuevamente en unos segundos.')
  }

  if (!json.success) {
    throw new PadronApiError(json.message || 'No se encontró información para ese registro.', json.code)
  }

  return json
}
