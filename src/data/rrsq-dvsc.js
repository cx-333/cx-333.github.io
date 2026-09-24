const media = "/papers/rrsq-dvsc/";

export const paper = {
  title: "Semantic Space Reorganization for Robust Digital Video Semantic Communication",
  authors: ["Xin Chen", "Shuai Ma", "Youlong Wu", "Zhongqiang Zhang", "Bo Ren", "Biao Hou", "Guangming Shi"],
  affiliations: ["Xidian University", "Peng Cheng Laboratory", "ShanghaiTech University"],
  status: "Under Review",
  venue: "IEEE Transactions on Wireless Communications",
  year: "2026",
  code: "https://github.com/cx-333/rrsq_dvsc",
  pdf: `${media}paper.pdf`,
  framework: `${media}framework.webp`,
  codebook: `${media}tsne-codebook1.webp`,
  temporal: `${media}gop_analysis_psnr.webp`,
  comparisons: [
    { label: "1 dB", image: `${media}comparison-1db.webp`, caption: "At 1 dB, the conventional separate coding schemes in the manuscript fail to reconstruct the scene, while RRSQ-DVSC recovers the main structures. Values and enlarged details are reproduced from the manuscript." },
    { label: "5 dB", image: `${media}comparison-5db.webp`, caption: "Texture and structural reconstruction across methods at 5 dB. Open the full-size image to inspect details." },
  ],
  // Add a local video, for example { src: `${media}demo.mp4`, poster: `${media}comparison-1db.webp`, title: "Video reconstruction comparison" }。
  // For narrated videos, set captions: `${media}demo-en.vtt` using a WebVTT caption file.
  videos: [],
  ablations: [
    ["Baseline (CNN)", "0.00%", "0.00%", "0.00%"],
    ["CNN + Cosine", "+2.79%", "+2.01%", "−1.64%"],
    ["CNN + L2", "+2.81%", "+2.10%", "−2.46%"],
    ["SGR + Cosine", "+4.31%", "+4.72%", "−12.23%"],
    ["SGR + L2", "+4.91%", "+5.52%", "−14.25%"],
    ["SGR", "+3.99%", "+3.96%", "−10.65%"],
  ],
};
