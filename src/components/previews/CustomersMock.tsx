import { Search } from "lucide-react";

const customers = [
  {
    initials: "SM",
    name: "Sophia Miller",
    email: "sophia.m@example.com",
    type: "Returning",
    tone: "returning",
    visits: "18",
    lastVisit: "2 Nov 2026",
  },
  {
    initials: "OB",
    name: "Olivia Brown",
    email: "olivia.b@example.com",
    type: "New",
    tone: "new",
    visits: "2",
    lastVisit: "28 Oct 2026",
  },
  {
    initials: "AW",
    name: "Ava Wilson",
    email: "ava.w@example.com",
    type: "Returning",
    tone: "returning",
    visits: "12",
    lastVisit: "24 Oct 2026",
  },
  {
    initials: "GT",
    name: "Grace Taylor",
    email: "grace.t@example.com",
    type: "Returning",
    tone: "returning",
    visits: "31",
    lastVisit: "19 Oct 2026",
  },
  {
    initials: "LE",
    name: "Lily Evans",
    email: "lily.e@example.com",
    type: "New",
    tone: "new",
    visits: "1",
    lastVisit: "17 Oct 2026",
  },
];

export function CustomersMock() {
  return (
    <div className="mock-page" aria-hidden="true">
      <div className="mock-page-head">
        <div>
          <span className="mock-eyebrow">Client book</span>
          <h3>Customers</h3>
        </div>
        <span className="mock-search">
          <Search size={11} />
          Search customers
        </span>
      </div>

      <div className="mock-list">
        <div className="mock-customer-head">
          <span>Customer</span>
          <span>Status</span>
          <span>Visits</span>
          <span>Last visit</span>
        </div>
        {customers.map((customer) => (
          <div className="mock-customer-row" key={customer.email}>
            <span className="mock-customer">
              <span className="mock-avatar">{customer.initials}</span>
              <span>
                <strong>{customer.name}</strong>
                <span>{customer.email}</span>
              </span>
            </span>
            <span className={`tag tag-${customer.tone}`}>{customer.type}</span>
            <span>{customer.visits}</span>
            <span>{customer.lastVisit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
