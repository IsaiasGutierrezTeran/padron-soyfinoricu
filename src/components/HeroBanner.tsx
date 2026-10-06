import banner from '../assets/banner.jpg'
import { PARTY_NAME } from '../brand'

export function HeroBanner() {
  return (
    <section className="no-print bg-brand-field">
      <div className="mx-auto flex max-w-5xl justify-center px-5 py-6 sm:px-8 sm:py-8">
        <img
          src={banner}
          alt={`Afiche de campaña — ${PARTY_NAME}`}
          className="w-full max-w-xs rounded-2xl shadow-card sm:max-w-sm md:max-w-md"
        />
      </div>
    </section>
  )
}
