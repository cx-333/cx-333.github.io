import { useState } from "react";
import { fppa as paper } from "../data/fppa.js";

function Figure({ src, alt, children }) {
  return <figure className="research-figure">
    <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${alt}`}>
      <img src={src} alt={alt} loading="lazy" />
    </a>
    <figcaption>{children} <a href={src} target="_blank" rel="noreferrer">View full-size image ↗</a></figcaption>
  </figure>;
}

function ReconstructionComparison() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const sample = paper.samples[sampleIndex];

  return <div className="fppa-comparison">
    <div className="fppa-sample-picker" role="group" aria-label="Select a reconstruction sample">
      {paper.samples.map((item, index) => <button
        key={item.id} aria-pressed={sampleIndex === index}
        onClick={() => { setSampleIndex(index); setSplit(50); }}
      >{String(index + 1).padStart(2, "0")} / {item.name}</button>)}
    </div>
    <div className="fppa-comparison-layout">
      <div>
        <div className="fppa-image-compare" style={{ "--split": `${split}%` }}>
          <img className="fppa-compare-image" src={sample.perception} alt={`${sample.name}: perception-mode reconstruction`} loading="lazy" />
          <img className="fppa-compare-image fppa-fidelity-layer" src={sample.fidelity} alt={`${sample.name}: fidelity-mode reconstruction`} loading="lazy" />
          <span className="fppa-image-label fidelity-label">Fidelity</span>
          <span className="fppa-image-label perception-label">Perception</span>
          <div className="fppa-divider" aria-hidden="true"><span>↔</span></div>
          <input type="range" min="0" max="100" value={split}
            aria-label="Drag to compare fidelity and perception reconstructions" aria-valuetext={`Fidelity on the left: ${split}%; perception on the right: ${100 - split}%`}
            onChange={event => setSplit(Number(event.target.value))} />
        </div>
        <p className="fppa-slider-help">Drag the divider or use the arrow keys to inspect details. Images are stored as lossless WebP at their original resolution.</p>
      </div>
      <aside className="fppa-sample-info" aria-live="polite">
        <p className="section-index">SAME BITSTREAM / TWO MODES</p>
        <h3>{sample.name}</h3>
        <p>QP = {sample.fidelityMetrics.qp} · Both modes: <strong>{sample.fidelityMetrics.bpp.toFixed(4)} bpp</strong></p>
        <div className="table-scroll"><table>
          <caption>Sample Metrics · QP = 15</caption>
          <thead><tr><th scope="col">Metric</th><th scope="col">Fidelity</th><th scope="col">Perception</th></tr></thead>
          <tbody>{[["PSNR ↑", "psnr"], ["SSIM ↑", "ssim"], ["LPIPS ↓", "lpips"]].map(([label, key]) => <tr key={key}><th scope="row">{label}</th><td>{sample.fidelityMetrics[key].toFixed(4)}</td><td>{sample.perceptionMetrics[key].toFixed(4)}</td></tr>)}</tbody>
        </table></div>
        <p>Perception mode reduces LPIPS but may also reduce PSNR and SSIM. Bypassing the adapters restores the original fidelity reconstruction.</p>
        <div className="fppa-source-links"><a href={sample.original} target="_blank" rel="noreferrer">View original ↗</a><a href={sample.fidelity} target="_blank" rel="noreferrer">Full-size fidelity ↗</a><a href={sample.perception} target="_blank" rel="noreferrer">Full-size perception ↗</a></div>
      </aside>
    </div>
  </div>;
}

export default function FppaDetail() {
  const [dark, setDark] = useState(false);
  return <div className={`research-page fppa-page${dark ? " research-dark" : ""}`}>
    <a className="skip-link" href="#overview">Skip to content</a>
    <header className="research-nav">
      <a className="research-brand" href="/#works">← Back to home</a>
      <nav aria-label="Paper navigation"><a href="#overview">Overview</a><a href="#method">Method</a><a href="#results">Results</a><a href="#comparison">Comparison</a></nav>
      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-pressed={dark}>{dark ? "Light" : "Dark"}</button>
    </header>
    <main className="research-main">
      <section className="research-hero fppa-hero" aria-labelledby="paper-title">
        <div className="research-kicker">FIDELITY × PERCEPTION <span>{paper.venue} ·  {paper.status}</span></div>
        <p className="research-acronym">FPPA</p>
        <h1 id="paper-title">{paper.title}</h1>
        <p className="research-subtitle">One bitstream, two reconstructions. Perceptual adaptation with recoverable fidelity.</p>
        <p className="research-authors">{paper.authors.map((author, i) => <span key={author}>{i > 0 && ", "}{i === 0 ? <strong>{author}</strong> : author}<sup>{i < 3 ? "1,2" : "1"}{i === 4 ? ",*" : ""}</sup></span>)}</p>
        {paper.affiliations.map((affiliation, i) => <p className="research-affiliations" key={affiliation}>{i + 1}. {affiliation}</p>)}
        <p className="research-venue">* Corresponding author: Biao Hou · {paper.venue} submission under review</p>
        <div className="research-links"><a className="research-button primary" href={paper.pdf} target="_blank" rel="noreferrer">Read Paper PDF ↗</a><a className="research-button code" href={paper.code} target="_blank" rel="noreferrer">〈/〉 Code · GitHub ↗</a><a className="research-text-link" href="#comparison">Compare reconstructions ↓</a></div>
      </section>

      <section id="overview" className="research-section fppa-overview">
        <div><p className="section-index">01 / OVERVIEW</p><h2>Improve perception.<br />Keep fidelity recoverable.</h2>
          <div className="research-prose"><p>Perceptual fine-tuning can improve textures and realism at low bitrates, but it typically changes pretrained codec parameters, making the original fidelity operating point difficult to recover.</p><p>We freeze the entire codec and learn only low-rank updates in the decoder. Enabling the updates produces perceptually enhanced reconstructions; disabling them restores the original decoder without re-encoding the bitstream.</p><p>Fidelity preservation means that the original fidelity mode remains recoverable; it does not imply identical pixel distortion in perception mode.</p></div>
          <div className="research-keywords"><span>Learned image compression</span><span>LoRA</span><span>Rate-aware routing</span></div>
        </div>
        <Figure src={paper.cover} alt="Figure 1: fidelity optimization, perceptual optimization, and fidelity-preserving perceptual adaptation">Figure 1. Three optimization approaches. Freezing the original parameters decouples perceptual updates from fidelity parameters.</Figure>
      </section>

      <section id="method" className="research-section"><p className="section-index">02 / METHOD</p><h2>Freeze the Base Model, Mix Experts by Quality Level</h2>
        <Figure src={paper.framework} alt="Figure 2: frozen codec and rate-aware mixture of LoRA experts">Figure 2. The router combines low-rank expert updates using the quality index. Updates can be merged into convolution kernels and cached by quality level.</Figure>
        <div className="method-grid"><article><span>01 / FREEZE</span><h3>Preserve the Original Decoder</h3><p>Freeze the base codec and inference state, leaving the transmitted representation and entropy model unchanged. Bypassing the adapters restores the original synthesis transform.</p></article><article><span>02 / ADAPT</span><h3>Low-Rank Perceptual Updates</h3><p>Optimize only the LoRA parameters injected into the decoder, separating the perceptual objective from the original fidelity parameters without retraining the full decoder.</p></article><article><span>03 / ROUTE</span><h3>Quality-Conditioned Soft Routing</h3><p>Generate expert weights from the quality index q to adapt reconstruction across bitrates. The index q is a rate-control condition, not the actual bpp.</p></article></div>
        <div className="fppa-equation"><span>Fidelity</span><code>W(q, 0) = W₀</code><span>Perception</span><code>W(q, 1) = W₀ + ΔW(q)</code></div>
      </section>

      <section id="results" className="research-section"><p className="section-index">03 / RESULTS</p><h2>Two Operating Curves: Fidelity and Perception</h2>
        <p className="section-intro">Results on Kodak and CLIC2020. Higher PSNR and lower LPIPS are better. Compare both decoding modes at similar bitrates.</p>
        <Figure src={paper.evaluation} alt="PSNR and LPIPS versus bpp on Kodak and CLIC2020">Rate-distortion and rate-perception curves. Red stars indicate fidelity mode; blue stars indicate perception mode.</Figure>
        <div className="result-grid"><article><span>Additional Adapter Parameters</span><strong>11.62<span> M</span></strong><p>Base model: 45.71 M parameters</p></article><article><span>Fewer Adapter Parameters than Multi-LoRA</span><strong>67.7<span>% ↓</span></strong><p>Computed from 4.49 × 8 M versus 11.62 M</p></article><article><span>One Bitstream</span><strong>2<span> modes</span></strong><p>Switch decoding modes without re-encoding</p></article></div>
        <div className="table-scroll"><table><caption>Table 1. Component ablations. BD-Rate uses Ours as the reference; lower is better. Parameter counts include only additional adapters.</caption><thead><tr><th scope="col">Method</th><th scope="col">Adapter Parameters</th><th scope="col">BD-Rate / LPIPS ↓</th><th scope="col">BD-Rate / DISTS ↓</th></tr></thead><tbody>{paper.ablations.map(row => <tr key={row.method} className={row.method === "Ours" ? "best-result" : ""}><th scope="row">{row.method}</th><td>{row.params}</td><td>{row.lpips}</td><td>{row.dists}</td></tr>)}</tbody></table></div>
        <p className="section-intro">Multi-LoRA achieves slightly better BD-Rate with roughly three times as many adapter parameters. The mixture of experts offers a trade-off between storage cost and perceptual compression performance.</p>
      </section>

      <section id="comparison" className="research-section"><p className="section-index">04 / RECONSTRUCTION LAB</p><h2>Drag to Compare Fidelity and Perception</h2><p className="section-intro">Three supplementary samples at QP = 15. Both modes use the same bitrate for each sample. These per-image metrics are not averages over the Kodak or CLIC2020 test sets.</p><ReconstructionComparison /></section>
      <section className="research-section"><p className="section-index">05 / VISUAL COMPARISON</p><h2>Reconstructing Details at Similar Bitrates</h2><Figure src={paper.visualComparison} alt="Reconstruction comparison of H.266, EF-LIC, OSCAR, and our method on motorcycle and bicycle scenes">Supplementary visual comparison. Labels below each image show BPP / LPIPS / DISTS. Bitrates are not identical, and the two perceptual metrics may rank methods differently.</Figure></section>

      <section className="research-resources"><div><p className="section-index">RESOURCES</p><h2>Paper and Implementation</h2><p>{paper.venue} ·  {paper.status}</p></div><div className="research-links"><a className="research-button primary" href={paper.pdf} target="_blank" rel="noreferrer">Paper PDF ↗</a><a className="research-button code" href={paper.code} target="_blank" rel="noreferrer">Code ↗</a></div></section>
      <footer className="research-footer"><span>FPPA · {paper.venue} · {paper.status}</span><a href="/#works">Back to publications ↑</a></footer>
    </main>
  </div>;
}
