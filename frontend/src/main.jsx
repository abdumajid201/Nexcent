import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, Menu, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import headerLogo from "../../header.svg";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

const apiBaseUrl = (import.meta.env.DEV ? "http://localhost:3000" : import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const assetUrl = (url = "") => /^https?:\/\//i.test(url) ? url : `${import.meta.env.DEV ? "" : apiBaseUrl}${url}`;

function Brand({ name = "Nexcent", light = false, imageOnly = false }) {
  return <a href="#home" className={`brand${light ? " brand-light" : ""}`} aria-label={`${name} home`}>
    {imageOnly ? <img className="brand-image" src={headerLogo} alt="" /> : <>
      <svg className="brand-mark" viewBox="0 0 42 34" aria-hidden="true">
        <path d="M2 2h16L10 15zM22 2h16l-8 13zM12 18h16l-8 13z" fill="#4caf4f" />
        <path d="M20 2h16l-8 13zM2 18h16l-8 13zM30 18h10l-5 8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span>{name}</span>
    </>}
  </a>;
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login amalga oshmadi.");
      sessionStorage.setItem("nexcent_token", result.token);
      onLogin(result.user);
    } catch (requestError) {
      setError(requestError.message || "Server bilan bog‘lanib bo‘lmadi.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="login-page">
    <div className="login-card">
      <Brand />
      <h1>Tizimga kirish</h1>
      <p className="login-intro">Hisobingizga kirish uchun email va parolingizni kiriting.</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" autoComplete="username" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="login-password">Parol</label>
        <input id="login-password" type="password" autoComplete="current-password" required maxLength={1024} value={password} onChange={(event) => setPassword(event.target.value)} />
        {error && <p className="login-message login-error" role="alert">{error}</p>}
        {message && <p className="login-message login-success" role="status">{message}</p>}
        <button className="button login-submit" type="submit" disabled={busy}>{busy ? "Tekshirilmoqda…" : "Kirish"}</button>
      </form>
      <a className="login-back" href="#home">← Bosh sahifaga qaytish</a>
    </div>
  </main>;
}

function DashboardPage({ user, stats, onLogout }) {
  return <main className="dashboard-page">
    <header className="dashboard-topbar">
      <Brand />
      <div className="dashboard-user"><span>{user.email}</span><button type="button" onClick={onLogout}>Chiqish</button></div>
    </header>
    <section className="dashboard-content wrap">
      <p className="dashboard-eyebrow">{user.role === "manager" ? "NEXCENT MENEJER PANELI" : "NEXCENT ADMIN PANELI"}</p>
      <h1>Xush kelibsiz!</h1>
      <p className="dashboard-lead">Saytingizning umumiy ko‘rsatkichlari shu yerda.</p>
      <div className="dashboard-welcome-art">
        <img src={assetUrl("/assets/img/placeholder.svg")} alt="Nexcent dashboard uchun vaqtinchalik tasvir" />
        <div><span>Jamoangiz bilan birga o‘sing</span><p>Hamjamiyat, tadbirlar va to‘lovlar ko‘rsatkichlarini shu sahifada kuzating.</p></div>
      </div>
      <div className="dashboard-stats">
        {stats.length ? stats.map((stat) => <article className="dashboard-stat" key={stat.id}>
          <img src={assetUrl(stat.iconUrl)} alt="" />
          <div><strong>{stat.value}</strong><span>{stat.label}</span></div>
        </article>) : <p className="dashboard-loading">Ko‘rsatkichlar yuklanmoqda…</p>}
      </div>
      <section className="dashboard-stories" aria-labelledby="dashboard-stories-title">
        <div className="dashboard-section-title"><div><p className="dashboard-eyebrow">ILHOM UCHUN</p><h2 id="dashboard-stories-title">Hamjamiyat yangiliklari</h2></div><a href="#blog">Barcha maqolalar <ArrowRight size={17} /></a></div>
        <div className="dashboard-story-grid">
          {[1, 2, 3].map((number) => <article className="dashboard-story" key={number}>
            <img src={assetUrl(`/assets/img/article-${number}.jpg`)} alt={`Nexcent maqolasi ${number} uchun vaqtinchalik rasm`} />
            <div><span>HAMJAMIYAT</span><h3>{["A’zolarni faol jalb qilish", "Hamjamiyatni mustahkamlash", "Yangi g‘oyalar va imkoniyatlar"][number - 1]}</h3></div>
          </article>)}
        </div>
      </section>
      <a className="button dashboard-home" href="#home">Ommaviy saytni ko‘rish <ArrowRight size={18} /></a>
    </section>
  </main>;
}

const featureDetails = {
  pixelgrade: {
    intro: "A well-managed membership experience makes it easier for people to stay involved and for teams to focus on their community.",
    points: ["Make renewals and member payments easier to manage.", "Keep member information organized in one place.", "Give your team more time to support the people behind the membership."]
  },
  "footer-design": {
    intro: "A thoughtful footer helps visitors find the next step, whether they want to learn about your organization, get in touch, or join.",
    points: ["Group important links into clear sections.", "Make contact and signup options easy to find.", "Keep the experience consistent across desktop and mobile."]
  }
};

function FeatureModal({ feature, onDismiss }) {
  const closeButtonRef = React.useRef(null);
  const details = featureDetails[feature.id] || featureDetails.pixelgrade;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus instanceof HTMLElement && previousFocus.focus();
    };
  }, [onDismiss]);

  return <div className="feature-modal-backdrop" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onDismiss();
  }}>
    <section className="feature-modal" role="dialog" aria-modal="true" aria-labelledby="feature-modal-title" tabIndex={-1}>
      <button className="feature-modal-close" ref={closeButtonRef} type="button" aria-label="Close details" onClick={onDismiss}><X size={21} /></button>
      <p className="section-eyebrow">NEXCENT</p>
      <h2 id="feature-modal-title">{feature.title}</h2>
      <p className="feature-modal-intro">{details.intro}</p>
      <ul>{details.points.map((point) => <li key={point}>{point}</li>)}</ul>
      <button className="button feature-modal-done" type="button" onClick={onDismiss}>Got it</button>
    </section>
  </div>;
}

function App() {
  const [homeData, setHomeData] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(window.location.hash === "#login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateRoute = () => setIsLoginPage(window.location.hash === "#login");
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/api/homepage`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Homepage API responded ${response.status}`);
        return response.json();
      })
      .then(({ data }) => {
        if (!data?.hero || !data?.clients || !data?.audiences || !data?.featureSections || !data?.stats || !data?.articles || !data?.footer) {
          throw new Error("Homepage API response is incomplete");
        }
        setHomeData(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setApiUnavailable(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("nexcent_token");
    if (!token) return;
    fetch(`${apiBaseUrl}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Sessiya tugadi.");
        setUser(result.user);
      })
      .catch(() => {
        sessionStorage.removeItem("nexcent_token");
      });
  }, []);

  useEffect(() => {
    if (!homeData || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(
      "main > section, footer, .audience-card, .stat-item, .story-card, .footer-top > *"
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -36px 0px" });
    targets.forEach((target, index) => {
      target.classList.add("reveal-on-scroll");
      target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 75}ms`);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, [homeData]);

  if (user && window.location.hash !== "#home") return <DashboardPage user={user} stats={homeData?.stats || []} onLogout={() => {
    sessionStorage.removeItem("nexcent_token");
    setUser(null);
    window.location.hash = "#home";
  }} />;

  if (isLoginPage) return <LoginPage onLogin={setUser} />;

  if (!homeData) {
    return apiUnavailable ? <main className="api-error">Backend ma’lumotlari yuklanmadi. Ikkala serverni loyiha papkasida <code>npm run dev</code> bilan ishga tushiring.</main> : <main className="page-loading" aria-label="Sahifa yuklanmoqda" />;
  }

  const { navigation, hero, clients, audienceSection, audiences, featureSections, statsSection, stats, secondaryFeature, testimonial, blogSection, articles, finalCta, socialLinks, footer } = homeData;

  return <>
    <header className="topbar">
      <div className="nav wrap">
        <Brand name={homeData.brandName} imageOnly />
        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
        </nav>
        <div className="nav-actions"><a className="login-link" href={homeData.auth.loginHref}>{homeData.auth.loginLabel}</a><a className="button button-small" href={homeData.auth.signupHref}>{homeData.auth.signupLabel}</a></div>
        <button className="menu-button" aria-label="Open menu"><Menu /></button>
      </div>
    </header>

    <main>
      <section className="hero hero-reference" id="home">
        <Swiper className="hero-swiper" modules={[Pagination, A11y, Keyboard]} slidesPerView={1} loop pagination={{ clickable: true }} keyboard={{ enabled: true }} a11y={{ enabled: true }}>
          {hero.slides.map((slide) => <SwiperSlide key={slide.id}>
            <div className="hero-inner wrap">
              <div className="hero-copy">
                <h1>{slide.titleLines[0]}<br /><span>{slide.titleLines[1]}</span></h1>
                <p className="hero-text">{slide.description}</p>
                <a href={slide.buttonHref} className="button register-button">{slide.buttonLabel}</a>
              </div>
              <div className="hero-art"><img src={assetUrl(slide.imageUrl)} alt={slide.imageAlt} /></div>
            </div>
          </SwiperSlide>)}
        </Swiper>
      </section>

      <section className="client-section" aria-labelledby="clients-title">
        <div className="wrap">
          <h2 className="client-title" id="clients-title">{clients.heading}</h2>
          <p className="client-heading">{clients.subheading}</p>
          <div className="client-logo-window" aria-label={clients.heading}>
            <div className="client-logos">
              {[0, 1].map((copy) => <div className="client-logo-group" aria-hidden={copy ? "true" : undefined} key={copy}>
                {clients.logos.map((logo, index) => <img className="client-logo" alt={copy ? "" : logo.name} src={assetUrl(logo.imageUrl)} key={`${logo.name}-${index}`} />)}
              </div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="audience-section" id="services" aria-labelledby="audience-title">
        <div className="wrap">
          <div className="section-heading centered"><p className="section-eyebrow">{audienceSection.eyebrow}</p><h2 id="audience-title">{audienceSection.heading}</h2><p>{audienceSection.subheading}</p></div>
          <div className="audience-grid">{audiences.map((card) => <article className="audience-card" key={card.id}>
            <div className="audience-icon"><img src={assetUrl(card.iconUrl)} alt="" /></div>
            <h3>{card.title}</h3><p>{card.description}</p>
          </article>)}</div>
        </div>
      </section>

      {featureSections.map((feature, index) => <section className={`feature-section${index % 2 ? " feature-reverse" : ""}`} id="features" key={feature.id}>
        <div className="wrap feature-layout"><div className="feature-visual"><img src={assetUrl(feature.imageUrl)} alt={feature.imageAlt} /></div>
          <div className="feature-copy"><h2>{feature.title}</h2><p>{feature.description}</p><button type="button" className="button" onClick={() => setActiveFeature(feature)}>{feature.buttonLabel}</button></div>
        </div>
      </section>)}

      <section className="stats-section" aria-label="Nexcent community statistics">
        <div className="wrap stats-layout"><div className="stats-intro"><p className="section-eyebrow">{statsSection.eyebrow}</p><h2>{statsSection.headingLines[0]}<br /><span>{statsSection.headingLines[1]}</span></h2><p>{statsSection.subheading}</p></div>
          <div className="stats-grid">{stats.map((stat) => <div className="stat-item" key={stat.id}><img className="stat-icon" src={assetUrl(stat.iconUrl)} alt="" /><div><strong>{stat.value}</strong><span>{stat.label}</span></div></div>)}</div>
        </div>
      </section>

      <section className="feature-section feature-secondary" id="product">
        <div className="wrap feature-layout"><div className="feature-visual"><img src={assetUrl(secondaryFeature.imageUrl)} alt={secondaryFeature.imageAlt} /></div>
          <div className="feature-copy"><h2>{secondaryFeature.title}</h2><p>{secondaryFeature.description}</p><button type="button" className="button" onClick={() => setActiveFeature({ ...secondaryFeature, id: "footer-design" })}>{secondaryFeature.buttonLabel}</button></div>
        </div>
      </section>

      <section className="testimonial-section" id="testimonials">
        <div className="wrap testimonial-layout"><img className="testimonial-image" src={assetUrl(testimonial.imageUrl)} alt={testimonial.imageAlt} />
          <div className="testimonial-content"><p>{testimonial.quote}</p><h3>{testimonial.name}</h3><span>{testimonial.organization}</span>
            <div className="testimonial-clients">{clients.logos.slice(0, 6).map((logo, index) => <img key={`${logo.name}-${index}`} src={assetUrl(logo.imageUrl)} alt={logo.name} />)}<a href={testimonial.clientsHref}>{testimonial.clientsHeading}<ArrowRight size={18} /></a></div>
          </div>
        </div>
      </section>

      <section className="stories-section" id="blog" aria-labelledby="blog-title">
        <div className="wrap">
          <div className="stories-header"><h2 id="blog-title">{blogSection.heading}</h2><p>{blogSection.description}</p></div>
          <div className="story-grid">{articles.map((article) => <article className="story-card" key={article.id}>
            <a href={article.href} className="story-image-link" aria-label={article.title}><img className="story-image" src={assetUrl(article.imageUrl)} alt={article.imageAlt} loading="lazy" /></a>
            <div className="story-body"><h3>{article.title}</h3><a href={article.href} className="read-link">Readmore <ArrowRight size={17} /></a></div>
          </article>)}</div>
        </div>
      </section>

      <section className="final-cta" id="contact"><div className="wrap"><h2>{finalCta.heading}</h2><a href={finalCta.buttonHref} className="button">{finalCta.buttonLabel}<ArrowRight size={18} /></a></div></section>
    </main>

    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-brand"><Brand name={homeData.brandName} light /><p>{footer.copyrightLines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</p>
          <div className="socials">{socialLinks.map((link) => <a href={link.href} aria-label={link.name} key={link.name}><img src={assetUrl(link.iconUrl)} alt="" /></a>)}</div>
        </div>
        {footer.columns.map((column) => <div className="footer-column" key={column.heading}><h3>{column.heading}</h3>{column.links.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}</div>)}
        <div className="footer-news"><h3>{footer.newsletter.heading}</h3><form onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="email">{footer.newsletter.placeholder}</label><input id="email" type="email" placeholder={footer.newsletter.placeholder} /><button type="submit" aria-label={footer.newsletter.buttonLabel}><ArrowRight size={20} /></button>
        </form></div>
      </div>
    </footer>
    {activeFeature && <FeatureModal feature={activeFeature} onDismiss={() => setActiveFeature(null)} />}
  </>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
