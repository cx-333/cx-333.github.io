import { useState } from "react";
import { paper } from "../data/rrsq-dvsc.js";

function Figure({ src, alt, caption }) {
  return <figure className="research-figure">
    <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${alt}`}>
      <img src={src} alt={alt} loading="lazy" />
    </a>
    <figcaption>{caption} <a href={src} target="_blank" rel="noreferrer">View full-size image ↗</a></figcaption>
  </figure>;
}

export default function PaperDetail() {
  const [dark, setDark] = useState(false);
  const [comparison, setComparison] = useState(0);
  const selected = paper.comparisons[comparison];

  return <div className={`research-page${dark ? " research-dark" : ""}`}>
    <a className="skip-link" href="#overview">Skip to content</a>
    <header className="research-nav">
      <a className="research-brand" href="/#works">← Back to home</a>
      <nav aria-label="Paper navigation">
        <a href="#overview">Overview</a><a href="#method">Method</a><a href="#results">Results</a><a href="#visuals">Visuals</a>
      </nav>
      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-pressed={dark}>{dark ? "Light" : "Dark"}</button>
    </header>

    <main className="research-main">
      <section className="research-hero" aria-labelledby="paper-title">
        <div className="research-kicker">VIDEO SEMANTIC COMMUNICATION <span>{paper.year} · {paper.status}</span></div>
        <p className="research-acronym">RRSQ-DVSC</p>
        <h1 id="paper-title">{paper.title}</h1>
        <p className="research-subtitle">Reorganizing semantic space for more robust video transmission.</p>
        <p className="research-authors">{paper.authors.map((author, i) => <span key={author}>{i > 0 && ", "}{i === 0 ? <strong>{author}</strong> : author}</span>)}</p>
        <p className="research-affiliations">{paper.affiliations.join(" · ")}</p>
        <p className="research-venue">{paper.venue} · {paper.status}</p>
        <div className="research-links">
          <a className="research-button primary" href={paper.pdf} target="_blank" rel="noreferrer">Read Paper PDF ↗</a>
          <a className="research-button code" href={paper.code} target="_blank" rel="noreferrer"><span aria-hidden="true">〈/〉</span> Code · GitHub ↗</a>
          <a className="research-text-link" href="#results">Explore results ↓</a>
        </div>
      </section>

      <section id="overview" className="research-section overview-layout">
        <div><p className="section-index">01 / OVERVIEW</p><h2>From index perturbations<br />to bounded semantic distortion.</h2></div>
        <div className="research-prose">
          <p>Codebook-assisted semantic communication transmits only the indices of quantized semantic vectors. Over unreliable channels, index errors may select semantically distant codewords and degrade video reconstruction.</p>
          <p>RRSQ-DVSC combines residual stochastic quantization, semantic-aware clustering, and index reordering. Semantically similar codewords receive nearby indices, limiting the semantic impact of channel errors. At the receiver, semantic-guided reconstruction (SGR) uses cross-window fusion attention to improve temporal consistency in long videos.</p>
          <div className="research-keywords"><span>Residual stochastic quantization</span><span>Semantic-aware clustering</span><span>Cross-window attention</span></div>
        </div>
      </section>

      <section id="method" className="research-section">
        <p className="section-index">02 / METHOD</p><h2>Encode, Reorganize, Reconstruct</h2>
        <Figure src={paper.framework} alt="RRSQ-DVSC framework: encoder, dynamics extractor, residual codebooks, wireless channel, and SGR module" caption="Framework overview. Stage one jointly optimizes video encoding and reconstruction; stage two applies semantic-aware clustering and index reordering to the learned codebooks." />
        <div className="method-grid">
          <article><span>01</span><h3>Residual Stochastic Quantization</h3><p>Represents high-level video semantics with multistage codebooks and transmits discrete indices to balance transmission cost and representation capacity.</p></article>
          <article><span>02</span><h3>Semantic Space Reorganization</h3><p>Groups semantically similar codewords and reorders their indices so that nearby indices are more likely to represent similar semantics, reducing the impact of index errors.</p></article>
          <article><span>03</span><h3>Semantic-Guided Reconstruction</h3><p>SGR uses cross-window fusion attention to exploit temporal context and improve reconstruction quality and consistency over long sequences.</p></article>
        </div>
      </section>

      <section id="results" className="research-section">
        <p className="section-index">03 / RESULTS</p><h2>Reconstruction at Low SNR</h2>
        <p className="section-intro">HEVC Class B · SNR = 1 dB. Values below are relative changes for SGR + L2 against the CNN baseline in the manuscript ablation table, not absolute metric values.</p>
        <div className="result-grid">
          <article><span>PSNR ↑</span><strong>+4.91<span>%</span></strong><p>Improved pixel reconstruction quality</p></article>
          <article><span>MS-SSIM ↑</span><strong>+5.52<span>%</span></strong><p>Improved structural similarity</p></article>
          <article><span>LPIPS ↓</span><strong>−14.25<span>%</span></strong><p>Reduced perceptual distance</p></article>
        </div>
        <details className="ablation-details"><summary>Show full ablation comparison</summary>
          <div className="table-scroll"><table><caption>Relative changes against the CNN baseline (Table II: ablations of SGR and semantic-aware clustering)</caption><thead><tr><th scope="col">Configuration</th><th scope="col">PSNR ↑</th><th scope="col">MS-SSIM ↑</th><th scope="col">LPIPS ↓</th></tr></thead><tbody>{paper.ablations.map(row => <tr className={row[0] === "SGR + L2" ? "best-result" : ""} key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
        </details>
      </section>

      <section id="visuals" className="research-section">
        <div className="section-heading"><div><p className="section-index">04 / VISUAL COMPARISON</p><h2>Preserving Key Visual Structures</h2></div>
          <div className="snr-control" aria-label="Select signal-to-noise ratio">{paper.comparisons.map((item, i) => <button key={item.label} aria-pressed={comparison === i} onClick={() => setComparison(i)}>{item.label}</button>)}</div>
        </div>
        <Figure src={selected.image} alt={`${selected.label} SNR: video reconstructions and enlarged details across methods`} caption={selected.caption} />
        <div className="analysis-grid">
          <div><h3>Codebook Semantic Space</h3><Figure src={paper.codebook} alt="Codebook t-SNE comparison before and after semantic-aware clustering" caption="Two-dimensional t-SNE visualization showing the relationship between indices and semantic positions before and after reordering." /></div>
          <div><h3>Long-Sequence Reconstruction</h3><Figure src={paper.temporal} alt="Per-frame PSNR comparison of SGR and CNN under different GOP structures" caption="Per-frame PSNR under different GOP structures, illustrating temporal error accumulation and recovery." /></div>
        </div>
      </section>

      {paper.videos.length > 0 && <section className="research-section" id="videos"><p className="section-index">VIDEO</p><h2>Video Demonstrations</h2>{paper.videos.map(video => <figure className="research-figure" key={video.src}><video controls playsInline preload="metadata" poster={video.poster}><source src={video.src} type="video/mp4" />{video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English captions" default />}Your browser does not support video playback. Please download the video to watch it.</video><figcaption>{video.title} <a href={video.src}>Download video</a></figcaption></figure>)}</section>}

      <section className="research-resources"><div><p className="section-index">RESOURCES</p><h2>Read and Reproduce</h2><p>The manuscript, full experimental setup, and implementation.</p></div><div className="research-links"><a className="research-button primary" href={paper.pdf} target="_blank" rel="noreferrer">Paper PDF ↗</a><a className="research-button code" href={paper.code} target="_blank" rel="noreferrer">Code ↗</a></div></section>
      <footer className="research-footer"><span>RRSQ-DVSC · {paper.year} · {paper.status}</span><a href="/#works">Back to publications ↑</a></footer>
    </main>
  </div>;
}
