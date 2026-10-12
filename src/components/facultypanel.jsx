import {
  ArrowRight,
  Check,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";

export default function FacultyPanel({
  SectionHeading,
  mode,
  setMode,
  scrollTo,
  visits,
  pendingVisits,
  faculty,
  unreadCount,
  redirectChoice,
  setRedirectChoice,
  responseNote,
  setResponseNote,
  respondToVisit,
  Status,
}) {
  const followupVisits = visits.filter((visit) =>
    ["Accepted", "Rescheduled", "Redirected"].includes(visit.status),
  );

  return (
    <section className="section-wrap section-space" id="faculty-panel">
      <SectionHeading
        eyebrow="A TWO-SIDED EXPERIENCE"
        title={
          <>
            One request.
            <br />
            <span>Clearer communication.</span>
          </>
        }
        description="Switch between student and faculty demo modes to demonstrate the full request lifecycle. No separate page or account is needed."
      />

      <div className="demo-panel">
        <div className="demo-panel-head">
          <div>
            <span className="eyebrow">INTERACTIVE DEMO</span>
            <h3>Visit coordination desk</h3>
            <p>Use this panel to try the complete workflow.</p>
          </div>

          <div className="mode-switch">
            <button
              className={mode === "student" ? "selected" : ""}
              onClick={() => setMode("student")}
            >
              Student view
            </button>
            <button
              className={mode === "faculty" ? "selected" : ""}
              onClick={() => setMode("faculty")}
            >
              Faculty view
            </button>
          </div>
        </div>

        {mode === "student" ? (
          <div className="demo-student">
            <div className="demo-info">
              <div className="demo-big-icon">
                <GraduationCap />
              </div>
              <h4>You're in student mode.</h4>
              <p>
                Submit a request from the faculty directory, then switch to
                faculty mode to respond to it.
              </p>
              <button
                className="button button-primary"
                onClick={() => scrollTo("faculty")}
              >
                Find faculty <ArrowRight size={15} />
              </button>
            </div>

            <div className="demo-mini-stats">
              <div>
                <span>Requests submitted</span>
                <strong>{visits.length}</strong>
              </div>
              <div>
                <span>Awaiting response</span>
                <strong>{pendingVisits.length}</strong>
              </div>
              <div>
                <span>Unread notifications</span>
                <strong>{unreadCount}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="faculty-mode">
            <div className="faculty-mode-banner">
              <div className="demo-big-icon">
                <LayoutDashboard />
              </div>
              <div>
                <h4>Faculty response queue</h4>
                <p>
                  Responding here updates the student's request status and
                  timeline.
                </p>
              </div>
            </div>

            {pendingVisits.length === 0 ? (
              <div className="empty-state">
                <CheckCircle2 size={26} />
                <h3>All caught up</h3>
                <p>
                  There are no pending requests. Submit a new request in student
                  mode to try again.
                </p>
              </div>
            ) : (
              <div className="faculty-queue">
                {pendingVisits.map((visit) => (
                  <article className="queue-item" key={visit.id}>
                    <div className="queue-item-top">
                      <div>
                        <strong>{visit.faculty}</strong>
                        <small>
                          {visit.id} · {visit.duration}
                        </small>
                      </div>
                      <Status status={visit.status} />
                    </div>

                    <p className="queue-purpose">{visit.purpose}</p>

                    {visit.message && (
                      <p className="queue-message">“{visit.message}”</p>
                    )}

                    <div className="response-actions">
                      <button
                        className="button button-primary"
                        onClick={() => respondToVisit(visit, "Come now")}
                      >
                        <Check size={15} /> Come now
                      </button>

                      <button
                        className="button button-outline"
                        onClick={() =>
                          respondToVisit(visit, "Suggest 20 minutes later")
                        }
                      >
                        Suggest +20 min
                      </button>

                      <button
                        className="button button-danger"
                        onClick={() => respondToVisit(visit, "Not available")}
                      >
                        Not available
                      </button>
                    </div>

                    <div className="redirect-controls">
                      <label>
                        Redirect to{" "}
                        <select
                          value={redirectChoice}
                          onChange={(event) =>
                            setRedirectChoice(event.target.value)
                          }
                        >
                          {faculty
                            .filter((person) => person.id !== visit.facultyId)
                            .map((person) => (
                              <option key={person.id} value={String(person.id)}>
                                {person.name}
                              </option>
                            ))}
                        </select>
                      </label>

                      <input
                        value={responseNote}
                        onChange={(event) =>
                          setResponseNote(event.target.value)
                        }
                        placeholder="Optional redirect message"
                      />

                      <button
                        className="button button-outline"
                        onClick={() => respondToVisit(visit, "Redirect")}
                      >
                        Redirect
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {followupVisits.map((visit) => (
              <div className="queue-followup" key={visit.id}>
                <div>
                  <strong>{visit.faculty}</strong>
                  <small>
                    {visit.id} · {visit.purpose}
                  </small>
                </div>

                <Status status={visit.status} />

                {visit.status !== "Redirected" && (
                  <button
                    className="button button-outline"
                    onClick={() => respondToVisit(visit, "Mark completed")}
                  >
                    Mark completed
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="demo-disclaimer">
        Demo note: the faculty records and interactions are illustrative.
        Availability and notifications are not connected to a real college
        system.
      </p>
    </section>
  );
}
