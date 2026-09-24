import samples from "./fppa-samples.json";

const media = "/papers/fppa/";

export const fppa = {
  title: "Fidelity-Preserving Perceptual Image Compression via a Rate-Aware Mixture of LoRA Experts",
  authors: ["Xin Chen", "Ruibo Fan", "Zitao Wang", "Bo Ren", "Biao Hou"],
  affiliations: ["School of Artificial Intelligence, Xidian University", "Department of Network Intelligence, Pengcheng Laboratory"],
  venue: "ICASSP 2027",
  status: "Under Review",
  code: "https://github.com/cx-333/fppa",
  pdf: `${media}paper.pdf`,
  cover: `${media}cover.webp`,
  framework: `${media}framework.webp`,
  evaluation: `${media}evaluation.webp`,
  visualComparison: `${media}visual_comparison.webp`,
  samples,
  // Manuscript Table 1. Params counts additional adapter parameters; the base model has 45.71 M.
  ablations: [
    { method: "Single LoRA", params: "4.49 M", lpips: "+50.50%", dists: "+40.69%" },
    { method: "Multi-LoRA", params: "4.49 × 8 M", lpips: "−1.54%", dists: "−1.88%" },
    { method: "Ours", params: "11.62 M", lpips: "0.00%", dists: "0.00%" },
  ],
};
