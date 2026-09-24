import { useMemo, useState } from "react";
import "./App.css";

const resumeData = {
  name: "Xin Chen",
  title: "PhD Student in Computer Science and Technology",
  location: "Xi'an / Xidian University",
  email: "1354123040@qq.com",
  github: "https://github.com/cx-333",
  scholar: "#",
  cv: "#",
  summary:
    "I am a PhD student in Computer Science and Technology with research interests in artificial intelligence, machine learning systems, data mining, and intelligent computing. My work spans algorithm design and system implementation, with an emphasis on reproducibility, interpretability, and scalability.",
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Models and Agents",
    "Image and Video Coding",
    "Intelligent Semantic Communication",
    "High-Performance Computing",
  ],
  metrics: [
    { label: "Papers / Submissions", value: "2+" },
    { label: "Research Projects", value: "5" },
    { label: "Repositories", value: "12" },
    { label: "Collaborations", value: "3" },
  ],
  education: [
    {
      degree: "PhD in Computer Science and Technology",
      school: "Xidian University / Key Laboratory of Intelligent Perception and Image Understanding, Ministry of Education",
      period: "2024 - Present",
      description:
        "Research: video coding, intelligent semantic communication, artificial intelligence, machine learning systems, and data-driven optimization. Advisors: Prof. Biao Hou and Prof. Guangming Shi.",
    },
    {
      degree: "Master's Degree in a Computing-Related Discipline",
      school: "Zhengzhou University",
      period: "2021 - 2024",
      description:
        "Add your GPA, core courses, thesis, competitions, or research training here.",
    },
  ],
  skills: [
    {
      group: "Research Skills",
      items: ["Problem Formulation", "Experimental Design", "Academic Writing", "Research Presentations", "Reproducible Experiments"],
    },
    {
      group: "Programming Languages",
      items: ["Python", "C/C++", "Shell", "Matlab"],
    },
    {
      group: "Machine Learning",
      items: ["PyTorch/Tensorflow", "Scikit-learn", "Transformers"],
    },
    {
      group: "Systems and Tools",
      items: ["Linux", "Git", "Docker", "LaTeX"],
    },
  ],
  publications: [
    {
      cover: "/papers/rrsq-dvsc/cover.webp",
      title:
        "Semantic Space Reorganization for Robust Digital Video Semantic Communication",
      venue: "IEEE Transactions on Wireless Communications (TWC)",
      year: "2026",
      status: "Under Review",
      tags: ["Semantic Communication", "Video Coding", "Robust"],
      description:
        "Improves robustness in digital video semantic communication through semantic-aware clustering and codebook index reordering, with cross-window attention in SGR to enhance temporal semantic consistency.",
      link: "/papers/rrsq-dvsc/",
      code: "https://github.com/cx-333/rrsq_dvsc",
    },
    {
      cover: "/papers/fppa/cover.webp",
      title: "Fidelity-Preserving Perceptual Image Compression via a Rate-Aware Mixture of LoRA Experts",
      venue: "ICASSP 2027",
      year: "2027",
      status: "Under Review",
      tags: ["Image Compression", "Perceptual Coding", "LoRA", "Mixture of Experts"],
      description:
        "Freezes a pretrained codec and introduces a rate-aware mixture of LoRA experts for perceptual adaptation. The same bitstream supports fidelity and perception modes; bypassing the adapters restores the original decoder.",
      link: "/papers/fppa/",
      code: "https://github.com/cx-333/fppa",
    },
    {
      cover: "",
      title: "Efficient Training Pipeline for Large-scale AI Workloads",
      venue: "MLSys / SC / TPDS",
      year: "2024",
      status: "Preprint",
      tags: ["HPC", "AI Systems"],
      description:
        "Designs training pipelines for large-scale AI workloads to improve experiment management, resource scheduling, and training efficiency.",
      link: "#",
      code: "",
    },
  ],
  projects: [
    {
      name: "Reproducible Experiment Management Platform",
      period: "2025 - Present",
      tags: ["Python", "Dashboard", "Research Tool"],
      description:
        "A platform for managing experiment configurations, tracking metrics, comparing results, and reproducing research experiments.",
      impact: "Reduces experiment tracking overhead and improves team collaboration.",
    },
    {
      name: "Graph Learning Framework for Large-Scale Data",
      period: "2024 - 2025",
      tags: ["Graph ML", "PyTorch", "Scalability"],
      description:
        "Builds scalable data processing and graph learning pipelines for node classification, link prediction, and anomaly detection.",
      impact: "Supports experiments with millions of nodes.",
    },
    {
      name: "Intelligent Literature Analysis Assistant",
      period: "2024",
      tags: ["LLM", "NLP", "Visualization"],
      description:
        "Combines semantic search, information extraction, and visual analysis to help researchers explore related work.",
      impact: "Improves the efficiency of literature reviews.",
    },
  ],
  experiences: [
    {
      role: "PhD Student / Assistant Researcher",
      org: "Pengcheng Laboratory, Shenzhen",
      period: "2024 - Present",
      items: [
        "Develops algorithms, conducts experiments, and writes papers on robust video transmission at extremely low bitrates.",
        "Builds reproducible workflows for data processing, model training, evaluation, and visualization.",
        "Contributes to research projects, paper submissions, and system prototypes.",
      ],
    },
    {
      role: "Algorithm / R&D Intern",
      org: "Technology Company / Research Institute",
      period: "Summer 2025",
      items: [
        "Contributes to model optimization and system deployment for real-world applications.",
        "Turns research prototypes into reliable software modules to improve inference efficiency or model performance.",
      ],
    },
  ],
  awards: [
    "National Scholarship / First-Class Academic Scholarship / Outstanding Graduate Student",
    "University Outstanding Thesis / Outstanding Graduate / Research Competition Awards",
    "Student Travel Grant / Open Source Contribution Award / Research Presentation Award",
  ],
};

function Tag({ children, active, onClick }) {
  return (
    <button className={`tag ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="section">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("Publications");
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const publicationTags = useMemo(() => {
    const tags = resumeData.publications.flatMap((item) => item.tags);
    return ["All", ...new Set(tags)];
  }, []);

  const filteredPublications = useMemo(() => {
    return resumeData.publications.filter((item) => {
      const matchTag = activeTag === "All" || item.tags.includes(activeTag);
      const q = keyword.trim().toLowerCase();
      const matchKeyword =
        !q ||
        [
          item.title,
          item.venue,
          item.year,
          item.status,
          item.description,
          ...item.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return matchTag && matchKeyword;
    });
  }, [activeTag, keyword]);

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <header className="nav">
        <a className="brand" href="#top">
          <span className="brand-logo">CS</span>
          <span>
            <strong>{resumeData.name}</strong>
            <small>Interactive Resume</small>
          </span>
        </a>

        <nav>
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#works">Works</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </header>

      <main id="top" className="container">
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">PhD Candidate · Computer Science</p>
            <h1>
              {resumeData.name}
              <span>{resumeData.title}</span>
            </h1>
            <p className="summary">{resumeData.summary}</p>

            <div className="hero-actions">
              <a className="primary-btn" href={`mailto:${resumeData.email}`}>
                Contact Me
              </a>
              <a className="secondary-btn" href={resumeData.cv}>
                Download CV
              </a>
            </div>

            <div className="meta">
              <span>{resumeData.location}</span>
              <a href={resumeData.github}>Gitee / GitHub</a>
              <a href={resumeData.scholar}>Google Scholar</a>
            </div>
          </div>

          <aside className="profile-card">
            <div className="focus-card">
              <p>Research Focus</p>
              <h3>AI · ML Systems · Data Mining</h3>
            </div>

            <div className="metrics">
              {resumeData.metrics.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="interest-box">
              <h4>Research Interests</h4>
              <div className="tags">
                {resumeData.interests.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <Section id="about" label="About" title="Education and Background">
          <div className="grid two">
            {resumeData.education.map((item) => (
              <article className="card" key={item.degree}>
                <p className="card-time">{item.period}</p>
                <h3>{item.degree}</h3>
                <h4>{item.school}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="research" label="Research" title="Technical and Research Skills">
          <div className="grid four">
            {resumeData.skills.map((skill) => (
              <article className="card compact" key={skill.group}>
                <h3>{skill.group}</h3>
                <div className="tags">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="works" label="Works" title="Publications, Projects, and Awards">
          <div className="toolbar">
            <div className="tabs">
              {["Publications", "Projects", "Awards"].map((tab) => (
                <Tag
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Tag>
              ))}
            </div>

            {activeTab === "Publications" && (
              <input
                className="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search papers, venues, years, keywords..."
              />
            )}
          </div>

          {activeTab === "Publications" && (
            <>
              <div className="filter-row">
                {publicationTags.map((tag) => (
                  <Tag
                    key={tag}
                    active={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>

              <div className="list">
                {filteredPublications.map((paper) => (
                  <article className="paper-card" key={paper.title}>
                    <div className="paper-cover">
                      {paper.cover?.trim() ? (
                        <a href={paper.link} aria-label={`View ${paper.title}`}>
                          <img
                            src={paper.cover}
                            alt={`${paper.title} cover`}
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <span className="paper-cover-placeholder">Paper cover</span>
                      )}
                    </div>
                    <div className="paper-content">
                      <div className="paper-meta">
                        <span>{paper.status}</span>
                        <span>{paper.year}</span>
                      </div>
                      <h3>{paper.title}</h3>
                      <h4>{paper.venue}</h4>
                      <p>{paper.description}</p>
                      <div className="tags">
                        {paper.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="paper-actions">
                      <a className="paper-link" href={paper.link}>
                        View
                      </a>
                      {paper.code?.trim() && (
                        <a
                          className="paper-link paper-code"
                          href={paper.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View code for ${paper.title}`}
                        >
                          Code
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === "Projects" && (
            <div className="grid three">
              {resumeData.projects.map((project) => (
                <article className="card project-card" key={project.name}>
                  <p className="card-time">{project.period}</p>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <strong>{project.impact}</strong>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "Awards" && (
            <div className="grid three">
              {resumeData.awards.map((award) => (
                <article className="card compact" key={award}>
                  <h3>🏆</h3>
                  <p>{award}</p>
                </article>
              ))}
            </div>
          )}
        </Section>

        <Section id="experience" label="Experience" title="Research and Engineering Experience">
          <div className="timeline">
            {resumeData.experiences.map((exp) => (
              <article className="timeline-item" key={exp.role}>
                <p className="card-time">{exp.period}</p>
                <h3>{exp.role}</h3>
                <h4>{exp.org}</h4>
                <ul>
                  {exp.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" label="Contact" title="Collaboration and Contact">
          <div className="contact-card">
            <div>
              <h3>Let's discuss research, internships, and open source projects</h3>
              <p>
                Add specific collaboration interests here, such as joint papers, industry research internships, open source projects, or academic visits.
              </p>
            </div>
            <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
          </div>
        </Section>
      </main>
    </div>
  );
}
