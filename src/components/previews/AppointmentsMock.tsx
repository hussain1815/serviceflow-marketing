import { Plus } from "lucide-react";

const appointments = [
  {
    client: "Sophia Miller",
    service: "Cut & finish",
    staff: "Emma",
    time: "09:30",
    status: "Confirmed",
    tone: "confirmed",
  },
  {
    client: "Olivia Brown",
    service: "Gel manicure",
    staff: "Mia",
    time: "11:00",
    status: "Pending",
    tone: "pending",
  },
  {
    client: "Ava Wilson",
    service: "Radiance facial",
    staff: "Emma",
    time: "13:00",
    status: "Confirmed",
    tone: "confirmed",
  },
  {
    client: "Grace Taylor",
    service: "Colour touch-up",
    staff: "Noah",
    time: "14:30",
    status: "Completed",
    tone: "completed",
  },
  {
    client: "Lily Evans",
    service: "Gloss treatment",
    staff: "Mia",
    time: "16:00",
    status: "Confirmed",
    tone: "confirmed",
  },
];

export function AppointmentsMock() {
  return (
    <div className="mock-page" aria-hidden="true">
      <div className="mock-page-head">
        <div>
          <span className="mock-eyebrow">Schedule</span>
          <h3>Appointments</h3>
        </div>
        <span className="mock-button">
          <Plus size={11} />
          New appointment
        </span>
      </div>

      <div className="mock-stat-row">
        <span className="mock-stat">
          Today <strong>14</strong>
        </span>
        <span className="mock-stat">
          Confirmed <strong>9</strong>
        </span>
        <span className="mock-stat">
          Pending <strong>3</strong>
        </span>
      </div>

      <div className="mock-table">
        <div className="mock-table-head">
          <span>Client</span>
          <span>Service</span>
          <span>Staff</span>
          <span>Time</span>
          <span>Status</span>
        </div>
        {appointments.map((appointment) => (
          <div
            className="mock-table-row"
            key={`${appointment.time}-${appointment.client}`}
          >
            <strong>{appointment.client}</strong>
            <span>{appointment.service}</span>
            <span>{appointment.staff}</span>
            <span>{appointment.time}</span>
            <span className={`status status-${appointment.tone}`}>
              {appointment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
