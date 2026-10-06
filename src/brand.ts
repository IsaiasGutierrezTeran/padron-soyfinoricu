import fotoAlan from './assets/candidatos/alan.jpg'
import fotoJhon from './assets/candidatos/jhon.jpg'
import fotoRoger from './assets/candidatos/roger.jpg'
import fotoRoman from './assets/candidatos/roman.jpg'

// ──────────────────────────────────────────────────────────────────────────
// Configuración de marca — Soy Finor (S.F.) · ICU 2026-2028
// ──────────────────────────────────────────────────────────────────────────

export const PARTY_NAME = 'Soy Finor'
export const PARTY_SIGLA = 'S.F.'
export const SLOGAN = 'Volvamos a hacer grande la FINOR otra vez'
export const PERIOD = 'ICU 2026 - 2028'

export interface Candidate {
  name: string
  role: string
  photo: string | null
}

export const CANDIDATES: Candidate[] = [
  { name: 'Alan Eduardo Coronado Olivarez', role: 'Candidato S.F. · ICU 2026-2028', photo: fotoAlan },
  { name: 'Jhon Carlos Cotrina Trujillo', role: 'Candidato S.F. · ICU 2026-2028', photo: fotoJhon },
  { name: 'Roger Adrian Ugarte Torrejon', role: 'Candidato S.F. · ICU 2026-2028', photo: fotoRoger },
  { name: 'Roman Llanos Leon', role: 'Candidato S.F. · ICU 2026-2028', photo: fotoRoman },
]
