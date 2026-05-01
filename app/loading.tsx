export default function RootLoading() {
  return (
    <main className="shell section" aria-busy="true" aria-live="polite">
      <div className="loading-card">
        <div className="loading-skeleton heading" />
        <div className="loading-skeleton line" />
        <div className="loading-skeleton line short" />
        <div className="loading-grid">
          <div className="loading-skeleton block" />
          <div className="loading-skeleton block" />
          <div className="loading-skeleton block" />
        </div>
        <span className="visually-hidden">Loading Bootcamp Companion…</span>
      </div>
    </main>
  );
}
