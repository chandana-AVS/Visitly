import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function MyVisits({
  visits,
  pendingVisits,
  acceptedVisits,
  completedVisits,
  formatTime,
  scrollTo,
  setDetailVisit,
  Status,
}) {
  return (
    <section className="section-wrap section-space" id="my-visits">
      <div className="section-heading">
        <span className="eyebrow">YOUR VISIT ACTIVITY</span>
        <h2>
          Every request,
          <br />
          <span>all in one place.</span>
        </h2>
        <p>
          Keep track of your visit requests and follow the latest response. This
          demo stores its data in this browser.
        </p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span>Pending</span>
          <strong>{String(pendingVisits.length).padStart(2, "0")}</strong>
          <Clock3 />
        </div>
        <div className="metric-card">
          <span>Accepted</span>
          <strong>{String(acceptedVisits.length).padStart(2, "0")}</strong>
          <CheckCircle2 />
        </div>
        <div className="metric-card">
          <span>Completed</span>
          <strong>{String(completedVisits.length).padStart(2, "0")}</strong>
          <ShieldCheck />
        </div>
      </div>

      <div className="visits-panel">
        <div className="panel-heading">
          <div>
            <h3>My visit requests</h3>
            <p>View the status of each request.</p>
          </div>
          <button
            className="button button-primary"
            onClick={() => scrollTo("faculty")}
          >
            New request <ArrowRight size={15} />
          </button>
        </div>

        {visits.length === 0 ? (
          <div className="empty-state">
            <CalendarClock size={28} />
            <h3>No visits yet</h3>
            <p>Your new requests will appear here.</p>
          </div>
        ) : (
          <div className="visit-list">
            {visits.map((visit) => (
              <button
                className="visit-row"
                key={visit.id}
                onClick={() => setDetailVisit(visit)}
              >
                <span className="visit-row-icon">
                  <CalendarClock size={19} />
                </span>
                <span className="visit-main">
                  <strong>{visit.purpose}</strong>
                  <small>
                    {visit.faculty} · {visit.id}
                  </small>
                  <small>Requested {formatTime(visit.createdAt)}</small>
                </span>
                <Status status={visit.status} />
                <ArrowRight size={16} className="visit-arrow" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
