import { Compass } from "lucide-react";

export default function Footer({ navItems, scrollTo }) {
  return (
    <footer className="footer section-wrap">
      <button className="brand" onClick={() => scrollTo("home")}>
        <span className="brand-mark">
          <Compass size={20} />
        </span>
        <span>
          visitly<span className="brand-period">.</span>
        </span>
      </button>

      <p>Less waiting. Better conversations.</p>

      <div className="footer-links">
        {navItems.slice(0, 4).map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
      </div>

      <span className="copyright">RD Project- Mrs Swarna</span>
    </footer>
  );
}
