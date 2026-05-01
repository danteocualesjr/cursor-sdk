export default function CourseLoading() {
  return (
    <main className="ide-shell" aria-busy="true" aria-live="polite">
      <header className="ide-topbar">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="ide-command-center">
          <span>Loading…</span>
        </div>
        <div className="ide-status-strip">
          <span>Preparing workspace</span>
        </div>
      </header>

      <div className="ide-workbench ide-workbench-loading">
        <aside className="ide-activitybar" aria-hidden="true">
          <div className="loading-skeleton dark logo" />
          <div className="loading-skeleton dark icon" />
          <div className="loading-skeleton dark icon" />
          <div className="loading-skeleton dark icon" />
        </aside>
        <aside className="ide-explorer" aria-hidden="true">
          <div className="loading-skeleton dark heading" />
          <div className="loading-skeleton dark line" />
          <div className="loading-skeleton dark line" />
          <div className="loading-skeleton dark line short" />
          <div className="loading-skeleton dark line" />
        </aside>
        <section className="ide-editor-panel">
          <div className="ide-tabs">
            <span className="ide-tab active">loading.md</span>
          </div>
          <div className="ide-panel-content">
            <div className="loading-skeleton dark heading" />
            <div className="loading-skeleton dark line" />
            <div className="loading-skeleton dark line" />
            <div className="loading-skeleton dark line short" />
          </div>
        </section>
      </div>
      <span className="visually-hidden">Loading course workspace…</span>
    </main>
  );
}
