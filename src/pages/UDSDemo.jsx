import React, { useState, useEffect, useRef } from "react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import { formatLastUpdated } from "../utils/formatDate";
import Flex from "../ui/Flex/Flex";
import CopyButton from "../ui/CopyButton/CopyButton";
import Button from "../ui/Button/Button";
import Toggle from "../ui/Toggle/Toggle";
import Icon from "../ui/Icon/Icon";
import Avatar from "../ui/Avatar/Avatar";
import Tag from "../ui/Tag/Tag";
import Status from "../ui/Status/Status";
import Modal from "../ui/Modal/Modal";
import Field from "../ui/Field/Field";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "./UDSDemo.scss";
import UDS from "../ui/UDS/UDS";
import Menu from "../ui/Menu/Menu";

// ── Navigation for the embedded demo menu ──────────────────────────
const DEMO_NAV_ITEMS = [
        { label: "Dashboard", icon: "Layout", path: "/dashboard" },
        { label: "Schedule", icon: "Calendar", path: "/schedule" },
        { label: "Job Board", icon: "Briefcase", path: "/job-board" },
        { label: "Application", icon: "NotePencil", path: "/application" },
        {
            label: "Documents",
            icon: "Folder",
            children: [
                { label: "Credentialing", path: "/credentialing" },
                { label: "Financials", path: "/financials" },
            ],
        },
        { label: "Time Entry", icon: "Clock", path: "/time-entries" },
    ];

// ── Code examples ──────────────────────────────────────────────────

const BASIC_USAGE_CODE = `import { UDS, Menu } from "@mich8060/chg-design-system";
import "@mich8060/chg-design-system/styles.css";

function App() {
  return (
    <UDS>
      <UDS.Menu>
        <Menu
          navigation={navigation}
          identity="comphealth"
          user={{ name: "Jane Doe", initials: "JD" }}
        />
      </UDS.Menu>
      <UDS.Content>
        <UDS.Listview>
          {/* List panel content */}
        </UDS.Listview>
        <UDS.Main>
          {/* Main content area */}
        </UDS.Main>
      </UDS.Content>
    </UDS>
  );
}`;

const WITH_PANEL_CODE = `<UDS>
  <UDS.Menu>
    <Menu navigation={navigation} identity="comphealth" />
  </UDS.Menu>
  <UDS.Content>
    <UDS.Main>
      {/* Main content */}
    </UDS.Main>
    <UDS.Panel>
      {/* Right side panel */}
    </UDS.Panel>
  </UDS.Content>
</UDS>`;

const WITH_MODAL_CODE = `import { Modal, Button } from "@mich8060/chg-design-system";

const [modalOpen, setModalOpen] = useState(false);

<Button onClick={() => setModalOpen(true)}>Open Modal</Button>

<Modal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Edit Assignment"
  subtitle="Update the provider assignment details."
  size="default"
  footer={
    <>
      <Button appearance="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
      <Button appearance="primary" onClick={handleSave}>Save Changes</Button>
    </>
  }
>
  <Field label="Provider Name" required>
    <Input placeholder="Enter provider name" />
  </Field>
  <Field label="Notes">
    <Textarea placeholder="Add notes..." />
  </Field>
</Modal>`;

const WITH_FULLSCREEN_MODAL_CODE = `<Modal
  open={fullOpen}
  onClose={() => setFullOpen(false)}
  title="Document Viewer"
  subtitle="Review and annotate uploaded documents."
  size="fullscreen"
  footer={
    <>
      <Button appearance="outline" onClick={() => setFullOpen(false)}>Close</Button>
      <Button appearance="primary" onClick={handleApprove}>Approve</Button>
    </>
  }
>
  {/* Full-width content area */}
</Modal>`;

const NAVIGATION_CODE = `const navigation = [
  {
    label: "Dashboard",
    icon: "Layout",
    items: [{ path: "/dashboard", label: "Overview", exact: true }],
  },
  {
    label: "Schedule",
    icon: "Calendar",
    items: [
      { path: "/schedule", label: "My Schedule" },
      { path: "/availability", label: "Availability" },
    ],
  },
  {
    label: "Documents",
    icon: "Folder",
    items: [
      { path: "/credentialing", label: "Credentialing" },
      { path: "/financials", label: "Financials" },
    ],
  },
];`;

// ── Sample list data ───────────────────────────────────────────────
const SAMPLE_ITEMS = [
  { id: 1, name: "Sarah Chen", specialty: "Cardiology", location: "Denver, CO", status: "active", date: "Mar 15 – Apr 12" },
  { id: 2, name: "James Miller", specialty: "Radiology", location: "Salt Lake City, UT", status: "pending", date: "Apr 1 – May 30" },
  { id: 3, name: "Emily Park", specialty: "Emergency Med", location: "Portland, OR", status: "active", date: "Feb 20 – Mar 18" },
  { id: 4, name: "Michael Torres", specialty: "Anesthesiology", location: "Phoenix, AZ", status: "completed", date: "Jan 5 – Feb 28" },
  { id: 5, name: "Lisa Nguyen", specialty: "Pediatrics", location: "Seattle, WA", status: "active", date: "Mar 1 – Jun 30" },
  { id: 6, name: "Robert Kim", specialty: "Orthopedics", location: "Boise, ID", status: "pending", date: "May 10 – Jul 15" },
];

export default function UDSDemo() {
  const [showListview, setShowListview] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(SAMPLE_ITEMS[0]);
  const previewRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const statusColorMap = {
    active: "green",
    pending: "amber",
    completed: "blue",
  };

  return (
    <section className="page uds-demo">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Application Shell</h1>
              <p className="page__header-description">
                A comprehensive application wrapper (UDS) that provides collapsible sidebar navigation,
                content areas with list-detail layout, side panels, and full responsiveness.
              </p>
            </div>
            <div className="page__header-metadata">
              <div className="page__metadata-row">
                <p className="page__metadata-label">Author</p>
                <a
                  href="https://chgit.slack.com/team/U06V9C0K06S"
                  className="page__metadata-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Michael-Stevens
                </a>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Last updated</p>
                <p className="page__metadata-value">{formatLastUpdated()}</p>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Version</p>
                <Flex direction="row" gap="8" alignItems="center">
                  <p className="page__metadata-value">2.0.0</p>
                  <span className="page__version-badge">BETA</span>
                </Flex>
              </div>
              <div className="page__metadata-row">
                <p className="page__metadata-label">Prototype</p>
                <a
                  href="https://height-blanch-43641663.figma.site"
                  className="page__metadata-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Figma Prototype ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page__content">
        {/* ── Interactive Controls ─────────────────────────────── */}
        <div className="uds-demo__section">
          <h2 className="uds-demo__section-title">Live Preview</h2>
          <p className="uds-demo__text">
            Toggle the layout panels to see how the <code>&lt;UDS&gt;</code> application shell adapts.
            The menu collapses independently via its built-in hamburger button.
          </p>

          <div className="uds-demo__controls">
            <Flex gap="24" alignItems="center" wrap>
              <Flex gap="8" alignItems="center">
                <Toggle
                  checked={showListview}
                  size="small"
                  onChange={setShowListview}
                />
                <span className="uds-demo__control-label">ListView</span>
              </Flex>
              <Flex gap="8" alignItems="center">
                <Toggle
                  checked={showPanel}
                  size="small"
                  onChange={setShowPanel}
                />
                <span className="uds-demo__control-label">Side Panel</span>
              </Flex>
              <Button
                label="Open Modal"
                appearance="outline"
                size="small"
                icon="FrameCorners"
                onClick={() => setShowModal(true)}
              />
              <Button
                label="Open Full Modal"
                appearance="outline"
                size="small"
                icon="ArrowsOut"
                onClick={() => setShowFullModal(true)}
              />
            </Flex>
          </div>
        </div>

        {/* ── Live Preview ────────────────────────────────────── */}
        <div className="uds-demo__main" data-brand="comphealth" ref={previewRef}>
          <UDS>
            <UDS.Menu>
              <Menu navItems={DEMO_NAV_ITEMS} identity="comphealth" />
            </UDS.Menu>
            <UDS.Content>
              {showListview && (
                <UDS.Listview>
                  <div className="uds-demo__listview-header">
                    <span className="uds-demo__listview-title">Assignments</span>
                    <Tag label={`${SAMPLE_ITEMS.length}`} color="neutral" solid />
                  </div>
                  <div className="uds-demo__listview-items">
                    {SAMPLE_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        className={`uds-demo__listview-item ${selectedItem?.id === item.id ? "uds-demo__listview-item--selected" : ""}`}
                        onClick={() => setSelectedItem(item)}
                      >
                        <Flex gap="12" alignItems="center">
                          <Avatar initials={item.name.split(" ").map(n => n[0]).join("")} />
                          <div className="uds-demo__listview-item-content">
                            <span className="uds-demo__listview-item-name">{item.name}</span>
                            <span className="uds-demo__listview-item-meta">{item.specialty} · {item.location}</span>
                          </div>
                        </Flex>
                      </button>
                    ))}
                  </div>
                </UDS.Listview>
              )}
              <UDS.Main>
                <div className="uds-demo__detail-header">
                  <Flex gap="8" alignItems="center">
                    <Avatar
                      initials={selectedItem.name.split(" ").map(n => n[0]).join("")}

                    />
                    <div>
                      <h2 className="uds-demo__detail-name">{selectedItem.name}</h2>
                      <p className="uds-demo__detail-subtitle">
                        {selectedItem.specialty} · {selectedItem.location}
                      </p>
                    </div>
                  </Flex>
                  <Flex gap="8">
                    <Button label="Message" appearance="outline" icon="ChatCircle" size="small" />
                    <Button label="Edit" appearance="primary" icon="PencilSimple" size="small" />
                  </Flex>
                </div>
                <div className="uds-demo__detail-body">
                  <div className="uds-demo__detail-section">
                    <h3 className="uds-demo__detail-section-title">Assignment Details</h3>
                    <div className="uds-demo__detail-grid">
                      <div className="uds-demo__detail-field">
                        <span className="uds-demo__detail-label">Duration</span>
                        <span className="uds-demo__detail-value">{selectedItem.date}</span>
                      </div>
                      <div className="uds-demo__detail-field">
                        <span className="uds-demo__detail-label">Status</span>
                        <Status
                          label={selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                          color={statusColorMap[selectedItem.status]}
                        />
                      </div>
                      <div className="uds-demo__detail-field">
                        <span className="uds-demo__detail-label">Location</span>
                        <span className="uds-demo__detail-value">{selectedItem.location}</span>
                      </div>
                      <div className="uds-demo__detail-field">
                        <span className="uds-demo__detail-label">Specialty</span>
                        <span className="uds-demo__detail-value">{selectedItem.specialty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="uds-demo__detail-section">
                    <h3 className="uds-demo__detail-section-title">Notes</h3>
                    <div className="uds-demo__placeholder-line" />
                    <div className="uds-demo__placeholder-line" />
                    <div className="uds-demo__placeholder-line uds-demo__placeholder-line--short" />
                  </div>
                </div>
              </UDS.Main>
              {showPanel && (
                <UDS.Panel>
                  <div className="uds-demo__panel-header">
                    <span className="uds-demo__panel-title">Activity</span>
                    <Icon name="X" size={16} />
                  </div>
                  <div className="uds-demo__panel-body">
                    {[
                      { icon: "CheckCircle", text: "Credentialing approved", time: "2 hours ago", color: "var(--uds-system-success-primary)" },
                      { icon: "Upload", text: "Documents uploaded", time: "Yesterday", color: "var(--uds-text-brand-primary)" },
                      { icon: "ChatCircle", text: "Message from coordinator", time: "2 days ago", color: "var(--uds-text-secondary)" },
                      { icon: "PencilSimple", text: "Assignment updated", time: "3 days ago", color: "var(--uds-text-secondary)" },
                      { icon: "UserPlus", text: "Provider added", time: "1 week ago", color: "var(--uds-text-brand-primary)" },
                    ].map((activity, i) => (
                      <div key={i} className="uds-demo__activity-item">
                        <Icon name={activity.icon} size={16} style={{ color: activity.color }} />
                        <div className="uds-demo__activity-content">
                          <span className="uds-demo__activity-text">{activity.text}</span>
                          <span className="uds-demo__activity-time">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </UDS.Panel>
              )}
            </UDS.Content>
          </UDS>

          {/* ── Standard Modal (portaled into preview) ────────── */}
          {previewRef.current && (
            <Modal
              open={showModal}
              onClose={() => setShowModal(false)}
              title="Edit Assignment"
              subtitle="Update the provider assignment details."
              size="default"
              container={previewRef.current}
              footer={
                <Flex gap="8" justifyContent="flex-end" style={{ width: "100%" }}>
                  <Button appearance="outline" label="Cancel" onClick={() => setShowModal(false)} />
                  <Button appearance="primary" label="Save Changes" onClick={() => setShowModal(false)} />
                </Flex>
              }
            >
              <Flex direction="column" gap="16">
                <Field label="Provider Name" required>
                  <Input placeholder="Sarah Chen" />
                </Field>
                <Field label="Specialty">
                  <Input placeholder="Cardiology" />
                </Field>
                <Field label="Location">
                  <Input placeholder="Denver, CO" />
                </Field>
                <Field label="Notes">
                  <Textarea placeholder="Add assignment notes..." />
                </Field>
              </Flex>
            </Modal>
          )}

          {/* ── Fullscreen Modal (portaled into preview) ──────── */}
          {previewRef.current && (
            <Modal
              open={showFullModal}
              onClose={() => setShowFullModal(false)}
              title="Document Viewer"
              subtitle="Review and annotate uploaded documents."
              size="fullscreen"
              container={previewRef.current}
              footer={
                <Flex gap="8" justifyContent="flex-end" style={{ width: "100%" }}>
                  <Button appearance="outline" label="Close" onClick={() => setShowFullModal(false)} />
                  <Button appearance="primary" label="Approve" icon="CheckCircle" onClick={() => setShowFullModal(false)} />
                </Flex>
              }
            >
              <div className="uds-demo__fullmodal-content">
                <div className="uds-demo__fullmodal-sidebar">
                  <h4 className="uds-demo__fullmodal-sidebar-title">Documents</h4>
                  {["Medical License", "Board Certification", "DEA License", "Malpractice Insurance", "CV / Resume"].map((doc, i) => (
                    <div
                      key={i}
                      className={`uds-demo__fullmodal-doc-item ${i === 0 ? "uds-demo__fullmodal-doc-item--active" : ""}`}
                    >
                      <Icon name="File" size={16} />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
                <div className="uds-demo__fullmodal-viewer">
                  <div className="uds-demo__fullmodal-placeholder">
                    <Icon name="FileText" size={48} />
                    <p>Medical License</p>
                    <span>Document preview area</span>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>

        {/* ── Architecture Diagram ────────────────────────────── */}
        <div className="uds-demo__section">
          <h2 className="uds-demo__section-title">Architecture</h2>
          <p className="uds-demo__text">
            The <code>&lt;UDS&gt;</code> wrapper creates a horizontal flex layout.
            Nest the sub-components to compose your application shell.
          </p>

          <div className="uds-demo__architecture-diagram">
            <div className="uds-demo__arch-shell">
              <div className="uds-demo__arch-sidebar">
                <span className="uds-demo__arch-label">UDS.Menu</span>
                <div className="uds-demo__arch-sub-items">
                  <span>Menu</span>
                  <span>Navigation</span>
                  <span>Account</span>
                </div>
              </div>
              <div className="uds-demo__arch-content-area">
                <span className="uds-demo__arch-label" style={{ marginBottom: "var(--uds-spacing-12)" }}>UDS.Content</span>
                <div className="uds-demo__arch-content-inner">
                  <div className="uds-demo__arch-listview">
                    <span className="uds-demo__arch-label">UDS.Listview</span>
                  </div>
                  <div className="uds-demo__arch-main">
                    <div className="uds-demo__arch-content-layout">
                      <span className="uds-demo__arch-label">UDS.Main</span>
                      <div className="uds-demo__arch-grid">
                        <span>Content</span>
                        <span>Content</span>
                      </div>
                    </div>
                  </div>
                  <div className="uds-demo__arch-sidepanel">
                    <span className="uds-demo__arch-label">UDS.Panel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Usage ───────────────────────────────────────────── */}
        <div className="uds-demo__section">
          <h2 className="uds-demo__section-title">Usage</h2>

          <h3 className="uds-demo__subsection-title">Basic Setup</h3>
          <p className="uds-demo__text">
            Wrap your application with <code>&lt;UDS&gt;</code> and compose the layout using sub-components.
          </p>
          <div className="uds-demo__code-wrapper">
            <CopyButton codeString={BASIC_USAGE_CODE} />
            <pre className="uds-demo__code-block">
              <code className="language-jsx">{BASIC_USAGE_CODE}</code>
            </pre>
          </div>

          <h3 className="uds-demo__subsection-title">With Side Panel</h3>
          <p className="uds-demo__text">
            Add a <code>&lt;UDS.Panel&gt;</code> inside <code>&lt;UDS.Content&gt;</code> for a right-side detail or activity panel.
          </p>
          <div className="uds-demo__code-wrapper">
            <CopyButton codeString={WITH_PANEL_CODE} />
            <pre className="uds-demo__code-block">
              <code className="language-jsx">{WITH_PANEL_CODE}</code>
            </pre>
          </div>

          <h3 className="uds-demo__subsection-title">With Modal</h3>
          <p className="uds-demo__text">
            The <code>&lt;Modal&gt;</code> component is standalone — it renders via a portal and doesn't need
            to be nested inside <code>&lt;UDS&gt;</code>. Use it anywhere in your component tree.
          </p>
          <div className="uds-demo__code-wrapper">
            <CopyButton codeString={WITH_MODAL_CODE} />
            <pre className="uds-demo__code-block">
              <code className="language-jsx">{WITH_MODAL_CODE}</code>
            </pre>
          </div>

          <h3 className="uds-demo__subsection-title">Fullscreen Modal</h3>
          <p className="uds-demo__text">
            Set <code>size="fullscreen"</code> for immersive experiences like document viewers, editors, or multi-step wizards.
          </p>
          <div className="uds-demo__code-wrapper">
            <CopyButton codeString={WITH_FULLSCREEN_MODAL_CODE} />
            <pre className="uds-demo__code-block">
              <code className="language-jsx">{WITH_FULLSCREEN_MODAL_CODE}</code>
            </pre>
          </div>

          <h3 className="uds-demo__subsection-title">Navigation Structure</h3>
          <p className="uds-demo__text">
            The <code>navigation</code> prop accepts an array of section objects with accordion groups and nav items.
          </p>
          <div className="uds-demo__code-wrapper">
            <CopyButton codeString={NAVIGATION_CODE} />
            <pre className="uds-demo__code-block">
              <code className="language-jsx">{NAVIGATION_CODE}</code>
            </pre>
          </div>
        </div>

        {/* ── Sub-Components ──────────────────────────────────── */}
        <div className="uds-demo__section">
          <h2 className="uds-demo__section-title">Sub-Components</h2>

          <div className="uds-demo__component-grid">
            {[
              {
                name: "<UDS>",
                desc: "Root wrapper. Creates the horizontal flex container that holds the sidebar and content area. All other UDS sub-components should be direct children.",
              },
              {
                name: "<UDS.Menu>",
                desc: "Sidebar slot. Place the Menu component inside this wrapper. Handles the sidebar positioning and ensures it stays fixed on the left.",
              },
              {
                name: "<UDS.Content>",
                desc: "Main content area wrapper. Contains the Listview, Main, and Panel sub-components. Takes up all remaining horizontal space after the menu.",
              },
              {
                name: "<UDS.Listview>",
                desc: "Optional left list panel (360px). Ideal for list-detail layouts — show a scrollable list of items like assignments, messages, or contacts.",
              },
              {
                name: "<UDS.Main>",
                desc: "Primary content area. Fills remaining space and scrolls independently. This is where your page content, detail views, or dashboards go.",
              },
              {
                name: "<UDS.Panel>",
                desc: "Optional right side panel (360px). Use for activity feeds, contextual details, or secondary information that supplements the main content.",
              },
              {
                name: "<Modal>",
                desc: "Standalone dialog overlay. Renders via portal above all content. Supports small (480px), default (640px), large (800px), and fullscreen sizes.",
              },
            ].map((comp) => (
              <div key={comp.name} className="uds-demo__component-card">
                <p className="uds-demo__component-name">{comp.name}</p>
                <p className="uds-demo__component-desc">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Layout Patterns ─────────────────────────────────── */}
        <div className="uds-demo__section">
          <h2 className="uds-demo__section-title">Layout Patterns</h2>

          <div className="uds-demo__practices">
            <div className="uds-demo__practice">
              <h4>Single Content</h4>
              <p>
                <code>Menu + Main</code> — Simple layouts like dashboards, settings, or form pages.
                Omit Listview and Panel for a clean single-column experience.
              </p>
            </div>
            <div className="uds-demo__practice">
              <h4>List-Detail</h4>
              <p>
                <code>Menu + Listview + Main</code> — Master-detail pattern for browsing a collection
                and viewing details. Great for email, assignments, contacts, or messaging.
              </p>
            </div>
            <div className="uds-demo__practice">
              <h4>List-Detail-Panel</h4>
              <p>
                <code>Menu + Listview + Main + Panel</code> — Three-column layout for data-rich applications.
                Show a list, detail content, and contextual activity or notes side-by-side.
              </p>
            </div>
            <div className="uds-demo__practice">
              <h4>Content-Panel</h4>
              <p>
                <code>Menu + Main + Panel</code> — Two-column layout without a list. Useful for detail
                pages with a side panel for related info, actions, or navigation.
              </p>
            </div>
          </div>
        </div>

        {/* ── CSS Class Structure ─────────────────────────────── */}
        <div className="uds-demo__section">
          <h2 className="uds-demo__section-title">CSS Class Structure</h2>

          <div className="uds-demo__props-table">
            <table className="uds-demo__table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Element</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>.uds--container</code></td><td>Root</td><td>Horizontal flex wrapper, full height</td></tr>
                <tr><td><code>.uds--menu</code></td><td>Sidebar</td><td>Menu slot container</td></tr>
                <tr><td><code>.uds--content</code></td><td>Content area</td><td>Flex row, fills remaining width</td></tr>
                <tr><td><code>.uds--listview</code></td><td>List panel</td><td>360px, scrollable, left border</td></tr>
                <tr><td><code>.uds--main</code></td><td>Main content</td><td>Flex 1, scrollable</td></tr>
                <tr><td><code>.uds--panel</code></td><td>Side panel</td><td>360px, scrollable, right border</td></tr>
                <tr><td><code>.uds-modal</code></td><td>Modal</td><td>Portal overlay with backdrop, multiple sizes</td></tr>
                <tr><td><code>.uds-modal--fullscreen</code></td><td>Full modal</td><td>Fills the entire viewport</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
}
