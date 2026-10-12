import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, CheckCircle2, X, ShieldCheck } from "lucide-react";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/hero";
//import WhyVisitly from "./components/WhyVisitly";
import FacultyDirectory from "./components/facultydirectory";
import MyVisits from "./components/myvisits";
import DemoMode from "./components/demomode";
//import HowItWorks from "./components/HowItWorks";
// import FacultyPanel from "./components/facultypanel";
import Footer from "./components/footer";

const initialFaculty = [
  {
    id: 1,
    name: "Dr. Ananya Rao",
    role: "Associate Professor",
    department: "Computer Science",
    room: "C-204",
    status: "Available",
    initials: "AR",
    color: "lavender",
    expertise: "AI & Machine Learning",
  },
  {
    id: 2,
    name: "Prof. Rahul Varma",
    role: "Assistant Professor",
    department: "Computer Science",
    room: "C-108",
    status: "Busy",
    initials: "RV",
    color: "peach",
    expertise: "Data Structures & Algorithms",
  },
  {
    id: 3,
    name: "Dr. Meera Krishnan",
    role: "Professor",
    department: "Electronics",
    room: "E-301",
    status: "Available",
    initials: "MK",
    color: "mint",
    expertise: "Embedded Systems",
  },
  {
    id: 4,
    name: "Prof. Arjun Reddy",
    role: "Assistant Professor",
    department: "Information Technology",
    room: "IT-205",
    status: "Away",
    initials: "AR",
    color: "blue",
    expertise: "Cloud Computing",
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    role: "Associate Professor",
    department: "Mathematics",
    room: "M-102",
    status: "Available",
    initials: "PS",
    color: "pink",
    expertise: "Applied Mathematics",
  },
  {
    id: 6,
    name: "Prof. Kiran Kumar",
    role: "Assistant Professor",
    department: "Computer Science",
    room: "C-210",
    status: "Busy",
    initials: "KK",
    color: "yellow",
    expertise: "Cybersecurity",
  },
];

const initialVisits = [
  {
    id: "VIS-1001",
    facultyId: 2,
    faculty: "Prof. Rahul Varma",
    purpose: "Project discussion",
    duration: "15 minutes",
    message: "I would like to discuss my final-year project direction.",
    status: "Pending",
    createdAt: Date.now() - 1000 * 60 * 18,
    timeline: [
      {
        label: "Request submitted",
        detail: "Your request has been sent.",
        time: Date.now() - 1000 * 60 * 18,
      },
    ],
  },
  {
    id: "VIS-1002",
    facultyId: 1,
    faculty: "Dr. Ananya Rao",
    purpose: "Research guidance",
    duration: "20 minutes",
    message: "Questions about machine learning research.",
    status: "Accepted",
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    timeline: [
      {
        label: "Request submitted",
        detail: "Your request has been sent.",
        time: Date.now() - 1000 * 60 * 60 * 3,
      },
      {
        label: "Come now",
        detail: "The faculty member is ready to meet.",
        time: Date.now() - 1000 * 60 * 45,
      },
    ],
  },
];

const navItems = [
  ["Home", "home"],
  //["Why Visitly?", "why-visitly"],
  ["Find Faculty", "faculty"],
  ["My Visits", "my-visits"],
  ["Demo Mode", "demo-mode"],
  //["How It Works", "how-it-works"],
];

function readSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Status({ status }) {
  const cls = status.toLowerCase().replaceAll(" ", "-");

  return (
    <span className={`status status-${cls}`}>
      <span />
      {status}
    </span>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function App() {
  const [faculty] = useState(initialFaculty);
  const [visits, setVisits] = useState(() =>
    readSaved("visitly-visits", initialVisits),
  );
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [availability, setAvailability] = useState("All statuses");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [purpose, setPurpose] = useState("Academic guidance");
  const [duration, setDuration] = useState("15 minutes");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [activeNav, setActiveNav] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(() =>
    readSaved("visitly-notifications", []),
  );
  const [mode, setMode] = useState("student");
  const [redirectChoice, setRedirectChoice] = useState("3");
  const [responseNote, setResponseNote] = useState("");
  const [notice, setNotice] = useState("");
  const [detailVisit, setDetailVisit] = useState(null);

  useEffect(() => {
    localStorage.setItem("visitly-visits", JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem(
      "visitly-notifications",
      JSON.stringify(notifications),
    );
  }, [notifications]);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveNav(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const filteredFaculty = useMemo(
    () =>
      faculty.filter((person) => {
        const matchesQuery =
          `${person.name} ${person.department} ${person.expertise}`
            .toLowerCase()
            .includes(query.toLowerCase());

        const matchesDepartment =
          department === "All departments" || person.department === department;

        const matchesStatus =
          availability === "All statuses" || person.status === availability;

        return matchesQuery && matchesDepartment && matchesStatus;
      }),
    [faculty, query, department, availability],
  );

  const pendingVisits = visits.filter((visit) => visit.status === "Pending");
  const acceptedVisits = visits.filter((visit) => visit.status === "Accepted");
  const completedVisits = visits.filter(
    (visit) => visit.status === "Completed",
  );

  const unreadCount = notifications.filter((item) => !item.read).length;

  function scrollTo(id) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    setMobileMenu(false);
  }

  function addNotification(title, detail, visitId) {
    setNotifications((previous) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        title,
        detail,
        visitId,
        read: false,
        time: Date.now(),
      },
      ...previous,
    ]);
  }

  function submitRequest(event) {
    event.preventDefault();

    if (!selectedFaculty) return;

    if (!purpose.trim()) {
      setFormError("Please enter the purpose of your visit.");
      return;
    }

    const id = `VIS-${Date.now().toString().slice(-6)}`;
    const now = Date.now();

    const visit = {
      id,
      facultyId: selectedFaculty.id,
      faculty: selectedFaculty.name,
      purpose,
      duration,
      message: message.trim(),
      status: "Pending",
      createdAt: now,
      timeline: [
        {
          label: "Request submitted",
          detail: "Your request has been sent to the faculty member.",
          time: now,
        },
      ],
    };

    setVisits((previous) => [visit, ...previous]);

    addNotification(
      "Visit request submitted",
      `Your request to ${selectedFaculty.name} is pending.`,
      id,
    );

    setSelectedFaculty(null);
    setPurpose("Academic guidance");
    setDuration("15 minutes");
    setMessage("");
    setFormError("");
    showNotice("Your visit request has been submitted.");
    scrollTo("my-visits");
  }

  function respondToVisit(visit, action) {
    let status = visit.status;
    let label = action;
    let detail = "";

    if (action === "Come now") {
      status = "Accepted";
      detail = "The faculty member is ready to meet you now.";
    } else if (action === "Suggest 20 minutes later") {
      status = "Rescheduled";
      detail = "Please visit in approximately 20 minutes.";
    } else if (action === "Not available") {
      status = "Declined";
      detail = "The faculty member is not available for this visit.";
    } else if (action === "Redirect") {
      const target = faculty.find(
        (person) => String(person.id) === redirectChoice,
      );

      if (target) {
        detail = `Please contact ${target.name}${
          responseNote.trim() ? `: ${responseNote.trim()}` : "."
        }`;
        label = `Redirected to ${target.name}`;
      }

      status = "Redirected";
    } else if (action === "Mark completed") {
      status = "Completed";
      detail = "The visit has been marked as completed.";
    }

    const now = Date.now();

    setVisits((previous) =>
      previous.map((item) =>
        item.id === visit.id
          ? {
              ...item,
              status,
              timeline: [...item.timeline, { label, detail, time: now }],
            }
          : item,
      ),
    );

    addNotification(
      "Visit request updated",
      `${visit.id}: ${detail}`,
      visit.id,
    );

    setResponseNote("");
    showNotice(`${visit.id} updated successfully.`);
  }

  function openNotification(item) {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === item.id
          ? { ...notification, read: true }
          : notification,
      ),
    );

    setNotificationsOpen(false);

    if (item.visitId) {
      setDetailVisit(visits.find((visit) => visit.id === item.visitId) || null);
      scrollTo("my-visits");
    }
  }

  function showNotice(text) {
    setNotice(text);
    setTimeout(() => setNotice(""), 3500);
  }

  function resetDemo() {
    if (!window.confirm("Reset all demo requests and notifications?")) return;

    setVisits(initialVisits);
    setNotifications([]);
    setMode("student");
    showNotice("Demo data has been reset.");
  }

  return (
    <div className="app-shell">
      <Navbar
        navItems={navItems}
        activeNav={activeNav}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        notificationsOpen={notificationsOpen}
        setNotificationsOpen={setNotificationsOpen}
        notifications={notifications}
        setNotifications={setNotifications}
        unreadCount={unreadCount}
        openNotification={openNotification}
        scrollTo={scrollTo}
        formatTime={formatTime}
      />

      <main>
        <Hero faculty={faculty} Status={Status} scrollTo={scrollTo} />

        {/* <WhyVisitly SectionHeading={SectionHeading} /> */}

        <FacultyDirectory
          faculty={faculty}
          filteredFaculty={filteredFaculty}
          query={query}
          setQuery={setQuery}
          department={department}
          setDepartment={setDepartment}
          availability={availability}
          setAvailability={setAvailability}
          setSelectedFaculty={setSelectedFaculty}
          setFormError={setFormError}
          Status={Status}
        />

        <MyVisits
          visits={visits}
          pendingVisits={pendingVisits}
          acceptedVisits={acceptedVisits}
          completedVisits={completedVisits}
          formatTime={formatTime}
          scrollTo={scrollTo}
          setDetailVisit={setDetailVisit}
          Status={Status}
        />

        {/* <HowItWorks SectionHeading={SectionHeading} /> */}

        <DemoMode
          mode={mode}
          setMode={setMode}
          scrollTo={scrollTo}
          visits={visits}
          pendingVisits={pendingVisits}
          faculty={faculty}
          unreadCount={unreadCount}
          redirectChoice={redirectChoice}
          setRedirectChoice={setRedirectChoice}
          responseNote={responseNote}
          setResponseNote={setResponseNote}
          respondToVisit={respondToVisit}
          Status={Status}
        />

        {/* Technology is intentionally not rendered yet,
            matching your original commented-out section. */}
      </main>

      <Footer navItems={navItems} scrollTo={scrollTo} />

      {notice && (
        <div className="toast">
          <CheckCircle2 size={18} />
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={15} />
          </button>
        </div>
      )}

      {selectedFaculty && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedFaculty(null);
            }
          }}
        >
          <form className="request-modal" onSubmit={submitRequest}>
            <div className="modal-heading">
              <div>
                <span className="eyebrow">NEW VISIT REQUEST</span>
                <h2>Let's make it happen.</h2>
                <p>Send a short request to your faculty member.</p>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setSelectedFaculty(null)}
                aria-label="Close modal"
              >
                <X />
              </button>
            </div>

            <div className="selected-person">
              <div className={`person-avatar ${selectedFaculty.color}`}>
                {selectedFaculty.initials}
              </div>
              <div>
                <strong>{selectedFaculty.name}</strong>
                <small>
                  {selectedFaculty.department} · Room {selectedFaculty.room}
                </small>
              </div>
              <Status status={selectedFaculty.status} />
            </div>

            <label className="form-label">
              Purpose of visit
              <select
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
              >
                <option>Academic guidance</option>
                <option>Project discussion</option>
                <option>Research guidance</option>
                <option>Assignment clarification</option>
                <option>Administrative enquiry</option>
                <option>Other</option>
              </select>
            </label>

            <label className="form-label">
              Preferred duration
              <select
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              >
                <option>10 minutes</option>
                <option>15 minutes</option>
                <option>20 minutes</option>
                <option>30 minutes</option>
              </select>
            </label>

            <label className="form-label">
              Message <span className="optional-label">OPTIONAL</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Briefly explain what you'd like to discuss..."
                rows={3}
              />
            </label>

            {formError && <p className="form-error">{formError}</p>}

            <p className="form-footnote">
              <ShieldCheck size={15} />
              This creates a demo request, not a real appointment.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={() => setSelectedFaculty(null)}
              >
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Send request <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {detailVisit && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDetailVisit(null);
            }
          }}
        >
          <div className="request-modal detail-modal">
            <div className="modal-heading">
              <div>
                <span className="eyebrow">{detailVisit.id}</span>
                <h2>Visit details</h2>
                <p>Request timeline and latest status.</p>
              </div>
              <button
                className="icon-button"
                onClick={() => setDetailVisit(null)}
                aria-label="Close details"
              >
                <X />
              </button>
            </div>

            <div className="detail-summary">
              <div>
                <span>Faculty member</span>
                <strong>{detailVisit.faculty}</strong>
              </div>
              <div>
                <span>Purpose</span>
                <strong>{detailVisit.purpose}</strong>
              </div>
              <div>
                <span>Duration</span>
                <strong>{detailVisit.duration}</strong>
              </div>
              <div>
                <span>Status</span>
                <Status status={detailVisit.status} />
              </div>
            </div>

            {detailVisit.message && (
              <div className="detail-message">
                <span>Your message</span>
                <p>{detailVisit.message}</p>
              </div>
            )}

            <h3 className="timeline-heading">Request timeline</h3>

            <div className="timeline">
              {detailVisit.timeline.map((item, index) => (
                <div className="timeline-entry" key={`${item.time}-${index}`}>
                  <span className="timeline-marker">
                    <Check size={13} />
                  </span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.detail}</p>
                    <small>{formatTime(item.time)}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="button button-primary"
                onClick={() => setDetailVisit(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="reset-demo"
        onClick={resetDemo}
        title="Reset demo data"
      >
        Reset demo
      </button>
    </div>
  );
}
