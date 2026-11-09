import { Eye } from "lucide-react";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { previewContent } from "../content/siteContent";
import type { PreviewTabId } from "../content/siteContent";
import { AppointmentsMock } from "./previews/AppointmentsMock";
import { BrowserFrame } from "./previews/BrowserFrame";
import { CustomersMock } from "./previews/CustomersMock";
import { DashboardMock } from "./previews/DashboardMock";
import { ServicesMock } from "./previews/ServicesMock";

function PreviewContent({ tab }: { tab: PreviewTabId }) {
  switch (tab) {
    case "appointments":
      return <AppointmentsMock />;
    case "customers":
      return <CustomersMock />;
    case "services":
      return <ServicesMock />;
    case "dashboard":
    default:
      return <DashboardMock />;
  }
}

export function ProductPreviewSection() {
  const [activeTabId, setActiveTabId] = useState<PreviewTabId>("dashboard");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTab =
    previewContent.tabs.find((tab) => tab.id === activeTabId) ??
    previewContent.tabs[0];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % previewContent.tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + previewContent.tabs.length) % previewContent.tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = previewContent.tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTabId(previewContent.tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      className="section product-preview"
      id="product"
      aria-labelledby="product-preview-title"
    >
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{previewContent.eyebrow}</span>
          <h2 className="section-title" id="product-preview-title">
            {previewContent.title}
          </h2>
          <p className="section-description">{previewContent.description}</p>
        </div>

        <div
          className="preview-tabs"
          role="tablist"
          aria-label="ServiceFlow product preview screens"
        >
          {previewContent.tabs.map((tab, index) => {
            const isActive = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                className="preview-tab"
                id={`preview-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`preview-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="product-frame-wrap">
          <BrowserFrame label={activeTab.description}>
            <div
              className="preview-panel"
              id={`preview-panel-${activeTab.id}`}
              role="tabpanel"
              aria-labelledby={`preview-tab-${activeTab.id}`}
              tabIndex={0}
            >
              <PreviewContent tab={activeTab.id} />
            </div>
          </BrowserFrame>
          <p className="preview-demo-note">
            <Eye size={14} aria-hidden="true" />
            {previewContent.note}
          </p>
        </div>
      </div>
    </section>
  );
}
