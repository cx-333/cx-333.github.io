import { useMemo, useState } from "react";
import "./App.css";

const resumeData = {
  name: "你的姓名",
  title: "计算机科学与技术博士生",
  location: "城市 / 学校",
  email: "your.email@university.edu",
  github: "https://gitee.com/yourname",
  scholar: "#",
  cv: "#",
  summary:
    "我是一名计算机科学与技术专业在读博士生，研究兴趣包括人工智能、机器学习系统、数据挖掘与智能计算。我关注从算法建模到系统实现的完整研究链路，重视可复现、可解释与可扩展的科研实践。",
  interests: [
    "人工智能",
    "机器学习",
    "大模型与智能体",
    "图学习",
    "数据挖掘",
    "高性能计算",
  ],
  metrics: [
    { label: "论文 / 投稿", value: "8+" },
    { label: "科研项目", value: "5" },
    { label: "代码仓库", value: "12" },
    { label: "合作经历", value: "3" },
  ],
  education: [
    {
      degree: "博士 · 计算机科学与技术",
      school: "某某大学 / 某某实验室",
      period: "2023 - 至今",
      description:
        "研究方向：人工智能、机器学习系统、数据驱动优化。导师：XXX 教授。",
    },
    {
      degree: "硕士 / 本科 · 计算机相关专业",
      school: "某某大学",
      period: "2019 - 2023",
      description:
        "可填写 GPA、核心课程、毕业论文、竞赛经历或科研训练经历。",
    },
  ],
  skills: [
    {
      group: "研究能力",
      items: ["问题建模", "实验设计", "论文写作", "学术报告", "可复现实验"],
    },
    {
      group: "编程语言",
      items: ["Python", "C/C++", "JavaScript", "SQL", "Shell"],
    },
    {
      group: "机器学习",
      items: ["PyTorch", "Scikit-learn", "Transformers", "Graph ML"],
    },
    {
      group: "系统工具",
      items: ["Linux", "Git", "Docker", "LaTeX", "Slurm"],
    },
  ],
  publications: [
    {
      title:
        "A Data-Centric Framework for Robust and Efficient Machine Learning Systems",
      venue: "NeurIPS / ICML / AAAI / CCF-A Conference",
      year: "2026",
      status: "Under Review",
      tags: ["Machine Learning", "AI Systems"],
      description:
        "围绕高效、鲁棒的机器学习系统提出数据中心化框架，支持模型训练、评估与部署优化。",
      link: "#",
    },
    {
      title: "Graph-based Representation Learning for Scientific Data Mining",
      venue: "KDD / WWW / TKDE",
      year: "2025",
      status: "Published",
      tags: ["Graph Learning", "Data Mining"],
      description:
        "面向科学数据挖掘任务，构建图表示学习方法并验证其在多类预测任务中的有效性。",
      link: "#",
    },
    {
      title: "Efficient Training Pipeline for Large-scale AI Workloads",
      venue: "MLSys / SC / TPDS",
      year: "2024",
      status: "Preprint",
      tags: ["HPC", "AI Systems"],
      description:
        "设计大规模 AI 工作负载训练流程，提升实验管理、资源调度与训练效率。",
      link: "#",
    },
  ],
  projects: [
    {
      name: "可复现实验管理平台",
      period: "2025 - 至今",
      tags: ["Python", "Dashboard", "Research Tool"],
      description:
        "面向科研实验的配置管理、指标记录、结果对比与复现实验平台。",
      impact: "降低实验追踪成本，提升团队协作效率。",
    },
    {
      name: "面向大规模数据的图学习框架",
      period: "2024 - 2025",
      tags: ["Graph ML", "PyTorch", "Scalability"],
      description:
        "构建可扩展的数据处理与图学习流程，用于节点分类、链接预测与异常检测。",
      impact: "支持百万级节点规模实验。",
    },
    {
      name: "智能文献分析助手",
      period: "2024",
      tags: ["LLM", "NLP", "Visualization"],
      description:
        "结合语义检索、信息抽取与可视化分析，辅助研究者梳理相关工作。",
      impact: "提升文献调研效率。",
    },
  ],
  experiences: [
    {
      role: "博士研究生 / 研究助理",
      org: "某某大学 某某实验室",
      period: "2023 - 至今",
      items: [
        "围绕 XXX 问题开展算法建模、实验验证与论文撰写。",
        "搭建可复现实验流程，支持数据处理、模型训练、评估与可视化。",
        "参与课题组科研项目，推进论文投稿与系统原型实现。",
      ],
    },
    {
      role: "算法实习生 / 研发实习生",
      org: "某科技公司 / 研究院",
      period: "2025 夏季",
      items: [
        "参与真实业务场景中的模型优化与系统部署。",
        "将研究原型改造为稳定工程模块，提升模型推理效率或指标表现。",
      ],
    },
  ],
  awards: [
    "国家奖学金 / 学业一等奖学金 / 优秀研究生",
    "校级优秀论文 / 优秀毕业生 / 科研竞赛奖项",
    "会议学生旅行奖 / 开源贡献奖 / 学术报告奖",
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
  const [activeTab, setActiveTab] = useState("论文");
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState("全部");

  const publicationTags = useMemo(() => {
    const tags = resumeData.publications.flatMap((item) => item.tags);
    return ["全部", ...new Set(tags)];
  }, []);

  const filteredPublications = useMemo(() => {
    return resumeData.publications.filter((item) => {
      const matchTag = activeTag === "全部" || item.tags.includes(activeTag);
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
          <a href="#about">简介</a>
          <a href="#research">研究</a>
          <a href="#works">成果</a>
          <a href="#experience">经历</a>
          <a href="#contact">联系</a>
        </nav>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "浅色" : "深色"}
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
                联系我
              </a>
              <a className="secondary-btn" href={resumeData.cv}>
                下载 CV
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
              <h4>研究兴趣</h4>
              <div className="tags">
                {resumeData.interests.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <Section id="about" label="About" title="教育背景与个人定位">
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

        <Section id="research" label="Research" title="技能栈与研究能力">
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

        <Section id="works" label="Works" title="论文、项目与成果展示">
          <div className="toolbar">
            <div className="tabs">
              {["论文", "项目", "荣誉"].map((tab) => (
                <Tag
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Tag>
              ))}
            </div>

            {activeTab === "论文" && (
              <input
                className="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索论文、会议、年份、关键词..."
              />
            )}
          </div>

          {activeTab === "论文" && (
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
                    <div>
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
                    <a className="paper-link" href={paper.link}>
                      查看
                    </a>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === "项目" && (
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

          {activeTab === "荣誉" && (
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

        <Section id="experience" label="Experience" title="科研与工程经历">
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

        <Section id="contact" label="Contact" title="开放合作与联系">
          <div className="contact-card">
            <div>
              <h3>欢迎交流科研合作、实习机会与开源项目</h3>
              <p>
                你可以把这里改成更具体的合作意向，例如联合论文、工业界研究实习、开源项目或学术访问。
              </p>
            </div>
            <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
          </div>
        </Section>
      </main>
    </div>
  );
}