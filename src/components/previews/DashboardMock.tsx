import {
  Bell,
  CalendarDays,
  ChartNoAxesCombined,
  LayoutDashboard,
  Scissors,
  Users,
} from "lucide-react";

const revenueBars = [
  { day: "M", value: 34 },
  { day: "T", value: 48 },
  { day: "W", value: 42 },
  { day: "T", value: 66 },
  { day: "F", value: 58 },
  { day: "S", value: 88 },
  { day: "S", value: 72 },
];

const todayAppointments = [
  {
    time: "09:30",
    client: "Sophia Miller",
    service: "Cut & finish",
    status: "Confirmed",
    tone: "confirmed",
  },
  {
    time: "11:00",
    client: "Olivia Brown",
    service: "Gel manicure",
    status: "Pending",
    tone: "pending",
  },
  {
    time: "13:00",
    client: "Ava Wilson",
    service: "Radiance facial",
    status: "Confirmed",
    tone: "confirmed",
  },
  {
    time: "14:30",
    client: "Grace Taylor",
    service: "Colour touch-up",
    status: "Completed",
    tone: "completed",
  },
];

export function DashboardMock() {
  return (
    <div className="dash-mock" aria-hidden="true">
      <aside className="dash-sidebar">
        <div className="dash-logo">SF</div>
        <div className="dash-nav">
          <span className="dash-nav-item is-active">
            <LayoutDashboard size={12} />
            Dashboard
          </span>
          <span className="dash-nav-item">
            <CalendarDays size={12} />
            Appointments
          </span>
          <span className="dash-nav-item">
            <Users size={12} />
            Customers
          </span>
          <span className="dash-nav-item">
            <Scissors size={12} />
            Services
          </span>
          <span className="dash-nav-item">
            <ChartNoAxesCombined size={12} />
            Reports
          </span>
        </div>
        <div className="dash-sidebar-user">
          <span className="dash-avatar">AM</span>
          <span>Anna M.</span>
        </div>
      </aside>

      <div className="dash-main">
        <div className="dash-topbar">
          <div>
            <span className="dash-kicker">Monday, 9 November</span>
            <h3>Good morning, Anna</h3>
          </div>
          <span className="dash-notification">
            <Bell size={11} />
            <span>4</span>
          </span>
        </div>

        <div className="dash-metrics">
          <div className="dash-metric">
            <span>Revenue</span>
            <strong>4,320</strong>
            <small>
              <span className="dash-currency">EUR</span> sample week
            </small>
          </div>
          <div className="dash-metric">
            <span>Appointments</span>
            <strong>28</strong>
            <small>this week</small>
          </div>
          <div className="dash-metric">
            <span>New clients</span>
            <strong>12</strong>
            <small>this week</small>
          </div>
        </div>

        <div className="dash-lower">
          <div className="dash-panel">
            <div className="panel-head">
              <span>Revenue overview</span>
              <span>This week</span>
            </div>
            <div className="dash-bars">
              {revenueBars.map((bar, index) => (
                <span
                  key={`${bar.day}-${index}`}
                  className={`dash-bar${
                    index === revenueBars.length - 2 ? " is-current" : ""
                  }`}
                  style={{ height: `${bar.value}%` }}
                />
              ))}
            </div>
            <div className="dash-bar-labels" aria-hidden="true">
              {revenueBars.map((bar, index) => (
                <span key={`${bar.day}-label-${index}`}>{bar.day}</span>
              ))}
            </div>
          </div>

          <div className="dash-panel dash-schedule">
            <div className="panel-head">
              <span>Today</span>
              <span>9 bookings</span>
            </div>
            <ul>
              {todayAppointments.map((appointment) => (
                <li key={`${appointment.time}-${appointment.client}`}>
                  <span className="dash-time">{appointment.time}</span>
                  <span className="dash-appt">
                    <strong>{appointment.client}</strong>
                    <span>{appointment.service}</span>
                  </span>
                  <span className={`status status-${appointment.tone}`}>
                    {appointment.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
