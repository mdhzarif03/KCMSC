export function PageHeader({ heading, intro }: { heading: string; intro?: string }) {
  return <section className="kc-standard-header"><div className="kc-section-wide"><span className="kc-overline">K C MODEL SCHOOL &amp; COLLEGE</span><div className="kc-standard-header-grid"><h1>{heading}</h1>{intro ? <p>{intro}</p> : <span />}</div></div></section>;
}
