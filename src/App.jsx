import { useState } from "react";
import InstrumentCarousel from "./InstrumentCarousel.jsx";
import SplashCursor from "./components/SplashCursor.tsx";
import StaggeredMenu from "./StaggeredMenu.jsx";

const whatsappUrl =
  "https://wa.me/5521966689615?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20aulas%20de%20m%C3%BAsica.";

const instruments = [
  {
    icon: "🎷",
    name: "Mini Sax",
    description: "Melodia, respiração e técnica com aulas pensadas para quem quer sons bonitos e expressivos.",
  },
  {
    icon: "🎼",
    name: "Flauta",
    description: "Desenvolvimento de ritmo, afinação e controle respiratório com abordagem prática e agradável.",
  },
  {
    icon: "🎹",
    name: "Piano",
    description: "Aprenda leitura, coordenação, teoria e repertório em um caminho gradual e estimulante.",
  },
  {
    icon: "🎸",
    name: "Ukulele",
    description: "Uma ferramenta divertida e versátil para quem deseja tocar músicas de forma leve e musicalmente rica.",
  },
  {
    icon: "🎸",
    name: "Guitarra",
    description: "Explore acordes, solos, ritmos e técnica com aulas focadas na sua evolução musical.",
  },
  {
    icon: "🪕",
    name: "Violão",
    description: "Um dos instrumentos mais completos para cantar e tocar, com foco em harmonia, ritmo e musicalidade.",
  },
];

const methodology = [
  {
    title: "Avaliação inicial",
    description: "Entendo seu nível, objetivos e preferências para traçar um caminho certeiro.",
  },
  {
    title: "Base sólida",
    description: "Trabalhamos postura, técnica, ritmos e afinação para garantir evolução real.",
  },
  {
    title: "Repertório e criatividade",
    description: "Você aprende músicas que gosta e desenvolve sua musicalidade de maneira natural.",
  },
  {
    title: "Acompanhamento constante",
    description: "Com orientação contínua, você avança com mais confiança e disciplina.",
  },
];

function WhatsAppLink({ children, className = "button button-primary" }) {
  return (
    <a className={className} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SplashCursor
        rainbow
        size={1}
        force={1}
        swirl={3}
        trail={1}
        clickSplash
        quality="medium"
        intro={false}
        zIndex={1}
      />
      <header className={`header${menuOpen ? " menu-open" : ""}`}>
        <div className="container nav">
          <a className="logo" href="#inicio" aria-label="Professor de Música, início">
            <span className="logo-mark" aria-hidden="true">♪</span>
            <span>Prof. Música</span>
          </a>
          <div className="header-actions">
            <WhatsAppLink className="button button-primary header-cta">Falar no WhatsApp</WhatsAppLink>
            <StaggeredMenu onOpenChange={setMenuOpen} />
          </div>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <p className="eyebrow">Aulas de música para todos os níveis</p>
              <h1>Aprenda a tocar com diversão, técnica e confiança.</h1>
              <p className="lead">
                Seja para iniciar sua jornada musical ou evoluir no instrumento que você
                ama, aqui você encontra um ensino acolhedor, prático e focado em resultados.
              </p>
              <div className="hero-actions">
                <WhatsAppLink>Agendar aula</WhatsAppLink>
                <a className="button button-secondary" href="#instrumentos">Ver instrumentos</a>
              </div>
              <ul className="hero-points" aria-label="Benefícios das aulas">
                <li>✔ Aulas personalizadas</li>
                <li>✔ Ensino leve e motivador</li>
                <li>✔ Progressão real no instrumento</li>
              </ul>
            </div>

            <div className="hero-card" aria-label="Resumo do professor">
              <div className="card-badge">Professor de Música</div>
              <h2>Instrumentos que você pode aprender</h2>
              <div className="mini-list">
                {instruments.map(({ name }) => <span key={name}>{name}</span>)}
              </div>
              <p>
                Ensino completo e individualizado para quem quer desenvolver técnica,
                musicalidade e gosto pela prática.
              </p>
            </div>
          </div>
        </section>

        <section id="instrumentos" className="section instruments-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Instrumentos</p>
              <h2>Escolha o instrumento que te inspira</h2>
            </div>
            <InstrumentCarousel instruments={instruments} />
          </div>
        </section>

        <section id="metodologia" className="section methodology-section">
          <div className="container">
            <div className="section-heading align-center">
              <p className="eyebrow">Metodologia</p>
              <h2>Ensino que combina técnica, criatividade e progresso</h2>
            </div>
            <div className="methodology-grid">
              {methodology.map(({ title, description }, index) => (
                <article className="method-card" key={title}>
                  <span className="step">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section cta-section">
          <div className="container cta-box">
            <div>
              <p className="eyebrow">Vamos tocar juntos</p>
              <h2>Seu próximo passo é simples: fale comigo no WhatsApp.</h2>
            </div>
            <WhatsAppLink>Quero saber mais</WhatsAppLink>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} Prof. Música</p>
          <WhatsAppLink className="footer-link">WhatsApp</WhatsAppLink>
        </div>
      </footer>
    </>
  );
}
