export function SiteLoader() {
  return <main className="site-loader" role="status" aria-live="polite" aria-label="Loading YAP">
    <div className="site-loader__mark" aria-hidden="true"><span>Y</span></div>
    <p className="site-loader__name">YOUTH ASSOCIATION <span>OF PAKISTAN</span></p>
    <div className="site-loader__track" aria-hidden="true"><span /></div>
    <p className="site-loader__message">A brighter future is loading</p>
  </main>;
}
