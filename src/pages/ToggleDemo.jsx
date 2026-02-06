import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toggle from "../ui/Toggle/Toggle";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

export default function ToggleDemo() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(true);
  const [toggle5, setToggle5] = useState(false);
  const [toggle6, setToggle6] = useState(true);
  const [toggle7, setToggle7] = useState(false);
  const [toggle8, setToggle8] = useState(true);
  const [toggle9, setToggle9] = useState(false);
  const [toggle10, setToggle10] = useState(true);
  const [toggle11, setToggle11] = useState(false);
  const [toggle12, setToggle12] = useState(true);

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Toggle</h1>
              <p className="page__header-description">
                Toggle switches allow users to switch between two states: on and
                off. Toggles come in different sizes and can be displayed with or
                without borders.
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
                  <p className="page__metadata-value">1.0.0</p>
                  <span className="page__version-badge">BETA</span>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page__content">
        <div className="page__examples-section">
          <div className="demo-group">
            <h2 className="demo-group__heading">Basic Usage</h2>
            <p className="demo-group__description">
              Toggle switches allow users to switch between two states: on and off. The default size is large.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-content">
              <Flex direction="column" gap="8" alignItems="center">
                <Toggle checked={toggle1} onChange={setToggle1} size="large" />
                <span style={{ fontSize: '12px', color: 'var(--uds-text-secondary)' }}>Off</span>
              </Flex>
              <Flex direction="column" gap="8" alignItems="center">
                <Toggle checked={toggle2} onChange={setToggle2} size="large" />
                <span style={{ fontSize: '12px', color: 'var(--uds-text-secondary)' }}>On</span>
              </Flex>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Sizes</h2>
            <p className="demo-group__description">
              Toggles are available in two sizes: large (default) and small.
            </p>
            <Flex direction="row" gap="24" wrap={true} alignItems="center" className="demo-content">
              <Flex direction="column" gap="8" alignItems="center">
                <Toggle checked={toggle3} onChange={setToggle3} size="small" />
                <span style={{ fontSize: '12px', color: 'var(--uds-text-secondary)' }}>Small</span>
              </Flex>
              <Flex direction="column" gap="8" alignItems="center">
                <Toggle checked={toggle4} onChange={setToggle4} size="large" />
                <span style={{ fontSize: '12px', color: 'var(--uds-text-secondary)' }}>Large</span>
              </Flex>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Border</h2>
            <p className="demo-group__description">
              Toggles can display with a border for increased visibility or stylistic variation.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-content">
              <Toggle checked={toggle5} onChange={setToggle5} size="large" bordered />
              <Toggle checked={toggle6} onChange={setToggle6} size="small" bordered />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Indeterminate State</h2>
            <p className="demo-group__description">
              Toggles can display an indeterminate state, typically used when a group of toggles has mixed states.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-content">
              <Toggle checked={false} state="indeterminate" size="large" />
              <Toggle checked={false} state="indeterminate" size="small" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Disabled State</h2>
            <p className="demo-group__description">
              Disabled toggles prevent user interaction and are typically used when the control is not applicable.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-content">
              <Toggle checked={false} disabled size="large" />
              <Toggle checked={true} disabled size="large" />
              <Toggle checked={false} disabled size="small" />
              <Toggle checked={true} disabled size="small" />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Usage Examples</h2>
            <p className="demo-group__description">
              Common applications for toggle switches in real-world scenarios.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Flex direction="row" gap="8" alignItems="center">
                <Toggle checked={toggle7} onChange={setToggle7} size="large" />
                <span>Enable notifications</span>
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <Toggle checked={toggle8} onChange={setToggle8} size="large" />
                <span>Dark mode</span>
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <Toggle checked={toggle9} onChange={setToggle9} size="large" />
                <span>Auto-save</span>
              </Flex>
              <Flex direction="row" gap="8" alignItems="center">
                <Toggle checked={toggle10} onChange={setToggle10} size="large" />
                <span>Public profile</span>
              </Flex>
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/toast"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Toast</span>
              </Link>
              <Link
                to="/tooltip"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Tooltip</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
