export function PageHeader({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <section className="kc-page-intro">
      <div className="kc-page-intro-inner">
        <div className="kc-page-intro-grid">
          <div>
            <p className="kc-page-kicker">K C MODEL SCHOOL &amp; COLLEGE</p>
          </div>
          <div>
            <h1 className="kc-page-title">{heading}</h1>
            {intro ? <p className="kc-page-lede mt-6">{intro}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
