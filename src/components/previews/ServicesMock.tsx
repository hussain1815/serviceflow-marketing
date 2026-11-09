import { Plus } from "lucide-react";

const services = [
  {
    name: "Signature cut & finish",
    category: "Hair",
    duration: "45 min",
    price: "65.00",
  },
  {
    name: "Gel manicure",
    category: "Nails",
    duration: "60 min",
    price: "48.00",
  },
  {
    name: "Radiance facial",
    category: "Skincare",
    duration: "75 min",
    price: "92.00",
  },
  {
    name: "Balayage",
    category: "Colour",
    duration: "150 min",
    price: "180.00",
  },
];

export function ServicesMock() {
  return (
    <div className="mock-page" aria-hidden="true">
      <div className="mock-page-head">
        <div>
          <span className="mock-eyebrow">Service menu</span>
          <h3>Services</h3>
        </div>
        <div className="mock-page-actions">
          <span className="mock-currency">EUR</span>
          <span className="mock-button">
            <Plus size={11} />
            New service
          </span>
        </div>
      </div>

      <div className="mock-services-grid">
        {services.map((service) => (
          <div className="mock-service-card" key={service.name}>
            <div className="mock-service-top">
              <span className="tag tag-category">{service.category}</span>
              <span className="mock-service-price">{service.price}</span>
            </div>
            <h4>{service.name}</h4>
            <span className="mock-service-duration">{service.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
