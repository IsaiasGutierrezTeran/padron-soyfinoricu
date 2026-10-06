export function ResultSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-card">
      <div className="relative h-28 overflow-hidden bg-slate-100">
        <div className="relative size-full animate-shimmer" />
      </div>
      <div className="flex flex-col gap-6 p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="relative h-3 w-20 overflow-hidden rounded bg-slate-100">
                <div className="relative size-full animate-shimmer" />
              </div>
              <div className="relative h-4 w-36 overflow-hidden rounded bg-slate-100">
                <div className="relative size-full animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="relative h-16 overflow-hidden rounded-xl bg-slate-100">
              <div className="relative size-full animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
