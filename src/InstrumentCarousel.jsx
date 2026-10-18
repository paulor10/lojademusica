import { useMemo, useState } from "react";
import FlexCarousel from "./components/FlexCarousel.tsx";

const artworkPalettes = [
  ["#151026", "#563d8a", "#f4b942"],
  ["#101c2e", "#287b83", "#9ee4d5"],
  ["#17152d", "#4e53a3", "#f1c970"],
  ["#23132b", "#8d4b82", "#f4b942"],
  ["#101c31", "#426bba", "#a9c9ff"],
  ["#20172e", "#8a5b44", "#f6c878"],
];

function createArtwork(icon, index) {
  const [background, foreground, accent] = artworkPalettes[index % artworkPalettes.length];
  const number = String(index + 1).padStart(2, "0");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="1200" viewBox="0 0 960 1200">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${foreground}"/>
          <stop offset="1" stop-color="${background}"/>
        </linearGradient>
        <radialGradient id="glow">
          <stop stop-color="${accent}" stop-opacity=".32"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="960" height="1200" fill="url(#background)"/>
      <circle cx="760" cy="270" r="430" fill="url(#glow)"/>
      <circle cx="480" cy="520" r="282" fill="none" stroke="${accent}" stroke-opacity=".32" stroke-width="2"/>
      <circle cx="480" cy="520" r="228" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1"/>
      <path d="M120 880 C300 780 660 780 840 880" fill="none" stroke="${accent}" stroke-opacity=".48" stroke-width="2"/>
      <text x="480" y="560" text-anchor="middle" dominant-baseline="middle" font-size="270">${icon}</text>
      <text x="70" y="1090" fill="#fff" fill-opacity=".72" font-family="Arial, sans-serif" font-size="24" letter-spacing="8">AULA DE MÚSICA</text>
      <text x="890" y="1090" text-anchor="end" fill="${accent}" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="5">${number}</text>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function InstrumentCarousel({ instruments }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = useMemo(
    () => instruments.map(({ icon, name }, index) => ({
      src: createArtwork(icon, index),
      alt: `Ilustração artística do instrumento ${name}`,
      title: name,
      subtitle: "Aulas personalizadas",
    })),
    [instruments],
  );
  const activeInstrument = instruments[activeIndex] || instruments[0];

  return (
    <div className="instrument-carousel">
      <div className="instrument-flex-carousel">
        <FlexCarousel
          items={items}
          preset="liquid"
          intro="rise"
          cardHeight={0.52}
          gap={18}
          squeeze={0.2}
          focusOnClick
          captions
          captureWheel
          onChange={(index) => setActiveIndex(index)}
        />
      </div>

      <article className="carousel-selection" aria-live="polite">
        <span className="carousel-selection-icon" aria-hidden="true">{activeInstrument.icon}</span>
        <div>
          <p className="carousel-selection-label">Instrumento selecionado</p>
          <h3>{activeInstrument.name}</h3>
          <p className="carousel-selection-description">{activeInstrument.description}</p>
        </div>
      </article>
    </div>
  );
}
