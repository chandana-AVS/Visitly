import {
  ArrowRight,
  ChevronDown,
  Compass,
  GraduationCap,
  Search,
} from "lucide-react";

export default function FacultyDirectory({
  faculty,
  filteredFaculty,
  query,
  setQuery,
  department,
  setDepartment,
  availability,
  setAvailability,
  setSelectedFaculty,
  setFormError,
  Status,
}) {
  const departments = [...new Set(faculty.map((person) => person.department))];

  function clearFilters() {
    setQuery("");
    setDepartment("All departments");
    setAvailability("All statuses");
  }

  return (
    <section className="faculty-section section-space" id="faculty">
      <div className="section-wrap">
        <div className="section-heading">
          <span className="eyebrow">THE FACULTY DIRECTORY</span>
          <h2>
            Find the right person.
            <br />
            <span>At the right time.</span>
          </h2>
          <p>
            Explore our fictional demo directory and see displayed availability
            before you request a visit.
          </p>
        </div>

        <div className="directory-toolbar">
          <label className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, subject or expertise..."
            />
          </label>

          <label className="select-wrap">
            <span className="sr-only">Department</span>
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option>All departments</option>
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </label>

          <label className="select-wrap">
            <span className="sr-only">Availability</span>
            <select
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
            >
              <option>All statuses</option>
              <option>Available</option>
              <option>Busy</option>
              <option>Away</option>
            </select>
            <ChevronDown size={16} />
          </label>
        </div>

        <div className="directory-meta">
          <span>{filteredFaculty.length} faculty members</span>
          <span>
            <span className="live-dot" /> Demo availability · illustrative only
          </span>
        </div>

        <div className="faculty-grid">
          {filteredFaculty.map((person) => (
            <article className="faculty-card" key={person.id}>
              <div className="faculty-card-top">
                <div className={`person-avatar avatar-large ${person.color}`}>
                  {person.initials}
                </div>
                <Status status={person.status} />
              </div>

              <h3>{person.name}</h3>
              <p className="faculty-role">{person.role}</p>

              <div className="faculty-divider" />

              <div className="faculty-detail">
                <GraduationCap size={16} />
                <span>{person.department}</span>
              </div>

              <div className="faculty-detail">
                <Compass size={16} />
                <span>Room {person.room}</span>
              </div>

              <div className="expertise-tag">{person.expertise}</div>

              <button
                className="button button-outline card-cta"
                onClick={() => {
                  setSelectedFaculty(person);
                  setFormError("");
                }}
              >
                Request a visit <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="empty-state">
            <Search size={27} />
            <h3>No faculty found</h3>
            <p>Try another search term or change your filters.</p>
            <button className="button button-outline" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
