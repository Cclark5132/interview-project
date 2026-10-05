export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl space-y-5" aria-busy="true" aria-label="Loading question">
      <div className="skeleton h-3 w-24" />
      <div className="skeleton h-11 w-3/4" />
      <div className="skeleton h-16 w-full" />
      <div className="skeleton h-32 w-full" />
      <div className="skeleton h-56 w-full" />
    </div>
  );
}
