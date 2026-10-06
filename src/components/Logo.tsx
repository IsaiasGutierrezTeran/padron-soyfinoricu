import logo from '../assets/logo.png'
import { PARTY_NAME } from '../brand'

export function Logo({ className = 'h-11 w-11' }: { className?: string }) {
  return <img src={logo} alt={PARTY_NAME} className={`shrink-0 object-contain ${className}`} />
}
