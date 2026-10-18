import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "Instrumentos", href: "#instrumentos", number: "01" },
  { label: "Metodologia", href: "#metodologia", number: "02" },
  { label: "Contato", href: "#contato", number: "03" },
];

export default function StaggeredMenu({ onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = !isOpen;
    onOpenChange(isOpen);

    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onOpenChange]);

  return (
    <>
      <button
        ref={triggerRef}
        className="staggered-menu-trigger"
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="staggered-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="menu-trigger-icon" aria-hidden="true">
          <span />
          <span />
        </span>
        <span>{isOpen ? "Fechar" : "Menu"}</span>
      </button>

      <nav
        id="staggered-menu"
        ref={menuRef}
        className={`staggered-menu${isOpen ? " is-open" : ""}`}
        aria-label="Navegação principal"
        aria-hidden={!isOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <div className="staggered-menu-content">
          <p className="staggered-menu-eyebrow">Explore as aulas</p>
          <ul>
            {menuItems.map((item, index) => (
              <li key={item.href} style={{ "--menu-index": index }}>
                <a href={item.href} onClick={() => setIsOpen(false)}>
                  <span className="staggered-menu-number">{item.number}</span>
                  <span className="staggered-menu-label">{item.label}</span>
                  <span className="staggered-menu-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="staggered-menu-note">Técnica, criatividade e música para todos.</p>
        </div>
      </nav>
    </>
  );
}
