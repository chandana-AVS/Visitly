import {
  ArrowDownRight,
  ArrowRight,
  CalendarClock,
  Check,
  Compass,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Hero({ faculty, Status, scrollTo }) {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <div className="announcement">
          <span className="announcement-dot" />A smarter way to connect on
          campus
        </div>

        <h1>
          Stop walking
          <br />
          to <span>closed doors.</span>
        </h1>

        <p className="hero-description">
          Your time matters. Check faculty availability, request a visit, and
          know when to show up — all before leaving your seat.
        </p>

        <div className="hero-actions">
          <button
            className="button button-primary button-large"
            onClick={() => scrollTo("faculty")}
          >
            Find your faculty <ArrowRight size={17} />
          </button>

          <button
            className="button button-quiet button-large"
            onClick={() => scrollTo("how-it-works")}
          >
            See how it works <ArrowDownRight size={17} />
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />

        <div className="schedule-card">
          <div className="schedule-top">
            <span className="tiny-label">YOUR CAMPUS, IN SYNC</span>
            <span className="live-tag">
              <span /> LIVE DEMO
            </span>
          </div>

          <div className="schedule-title">
            <div>
              <h3>Today's availability</h3>
              <p>Faculty directory · Demo data</p>
            </div>
            <CalendarClock size={22} />
          </div>

          {faculty.slice(0, 3).map((person) => (
            <div className="schedule-person" key={person.id}>
              <div className={`person-avatar ${person.color}`}>
                {person.initials}
              </div>
              <div className="schedule-person-info">
                <strong>{person.name}</strong>
                <small>{person.department}</small>
              </div>
              <Status status={person.status} />
            </div>
          ))}

          <div className="schedule-footer">
            <ShieldCheck size={15} />
            <span>Plan ahead. Meet with confidence.</span>
          </div>
        </div>

        <div className="floating-note">
          <span className="floating-icon">
            <Check size={17} />
          </span>
          <span>
            <strong>Request received</strong>
            <small>No more guesswork.</small>
          </span>
        </div>

        <span className="hero-spark spark-one">
          <Sparkles size={23} />
        </span>
        <span className="hero-spark spark-two">
          <Zap size={19} />
        </span>
      </div>
    </section>
  );
}
