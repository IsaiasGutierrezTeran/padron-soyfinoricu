export interface PadronRecord {
  fac: string
  facultad: string
  carrera: string
  lugar_1: string
  registro: string
  nombre: string
  centro_interno: 'SI' | 'NO' | string
  icu_facultativo: 'SI' | 'NO' | string
  ful: 'SI' | 'NO' | string
  mesa: string
  recinto: string
  lugar_2: string
  aula: string
}

export interface PadronSuccessResponse {
  success: true
  data: PadronRecord
  total: number
  adicionales: PadronRecord[]
}

export interface PadronErrorResponse {
  success: false
  code?: string
  message: string
}

export type PadronResponse = PadronSuccessResponse | PadronErrorResponse
