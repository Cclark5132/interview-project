export default function Loading() {
  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_1fr]" aria-busy="true" aria-label="Loading library">
      <div className="skeleton hidden h-96 lg:block" />
      <div className="space-y-3">
        <div className="skeleton h-10 w-40" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-20" />
        ))}
      </div>
    </div>
  );
}
