import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "../ui/Checkbox/Checkbox";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";

export default function CheckboxDemo() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [items, setItems] = useState({
    item1: false,
    item2: false,
    item3: false,
  });

  const handleSelectAll = (checked) => {
    setAllSelected(checked);
    setItems({
      item1: checked,
      item2: checked,
      item3: checked,
    });
  };

  const handleItemChange = (itemKey, checked) => {
    const newItems = { ...items, [itemKey]: checked };
    setItems(newItems);

    const allChecked = Object.values(newItems).every(Boolean);
    const noneChecked = Object.values(newItems).every((val) => val === false);
    setAllSelected(allChecked);
    setIndeterminate(!allChecked && !noneChecked);
  };

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Checkbox</h1>
              <p className="page__header-description">
                The Checkbox component allows users to select one or more options from
          a set. Use checkboxes when users need to make multiple selections.
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
              A simple checkbox for selecting an option. Use checkboxes when users need to make multiple selections from a set of options.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Checkbox
                label="Unchecked checkbox"
                checked={checked1}
                onChange={setChecked1}
              />
              <Checkbox
                label="Checked checkbox"
                checked={checked2}
                onChange={setChecked2}
              />
              <Checkbox
                label="Disabled unchecked"
                checked={false}
                onChange={() => {}}
                disabled
              />
              <Checkbox
                label="Disabled checked"
                checked={true}
                onChange={() => {}}
                disabled
              />
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Indeterminate State</h2>
            <p className="demo-group__description">
              The indeterminate state is used when some but not all items in a group are selected. This is commonly used with "Select All" functionality.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Checkbox
                label="Select All"
                checked={allSelected}
                indeterminate={indeterminate}
                onChange={handleSelectAll}
              />
              <div style={{ marginLeft: "24px" }}>
                <Flex direction="column" gap="12">
                  <Checkbox
                    label="Item 1"
                    checked={items.item1}
                    onChange={(checked) => handleItemChange("item1", checked)}
                  />
                  <Checkbox
                    label="Item 2"
                    checked={items.item2}
                    onChange={(checked) => handleItemChange("item2", checked)}
                  />
                  <Checkbox
                    label="Item 3"
                    checked={items.item3}
                    onChange={(checked) => handleItemChange("item3", checked)}
                  />
                </Flex>
              </div>
            </Flex>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Different States</h2>
            <p className="demo-group__description">
              Checkboxes support various states including checked, unchecked, disabled, and indeterminate. The indeterminate state is useful for "Select All" scenarios.
            </p>
            <Flex direction="column" gap="16" className="demo-content">
              <Checkbox
                label="Default checkbox"
                checked={checked3}
                onChange={setChecked3}
              />
              <Checkbox
                label="Indeterminate checkbox"
                checked={false}
                indeterminate={true}
                onChange={() => {}}
              />
            </Flex>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/chip"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Chip</span>
              </Link>
              <Link
                to="/datepicker"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Datepicker</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
