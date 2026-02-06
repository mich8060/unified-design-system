import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar/Avatar";
import Flex from "../ui/Flex/Flex";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Divider from "../ui/Divider/Divider";
import { formatLastUpdated } from "../utils/formatDate";
import { getDoctorImage } from "../assets/images/doctors";
import CopyButton from "../ui/CopyButton/CopyButton";
import Prism from "prismjs";
import "../styles/prism-custom.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "./AvatarDemo.scss";

export default function AvatarDemo() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <section className="page">
      <header className="page__header">
        <div className="page__header-container">
          <Breadcrumb />
          <div className="page__header-info">
            <div className="page__header-content">
              <h1 className="page__header-title">Avatar</h1>
              <p className="page__header-description">
                The Avatar component displays user profile pictures or initials in a
                circular format. It supports optional status indicators and multiple
                sizes.
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
            <h2 className="demo-group__heading">Sizes</h2>
            <p className="demo-group__description">
              Avatars come in three sizes: small, default, and large. Choose the size that best fits your layout.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <Avatar initials="JD" size="small" />
              <Avatar initials="JD" size="default" />
              <Avatar initials="JD" size="large" />
            </Flex>
            <div className="avatar-demo__code-block-wrapper">
              <CopyButton codeString={`import Avatar from "../ui/Avatar/Avatar";

<Avatar initials="JD" size="small" />
<Avatar initials="JD" size="default" />
<Avatar initials="JD" size="large" />`} />
              <pre className="avatar-demo__code-block">
                <code className="language-jsx">{`import Avatar from "../ui/Avatar/Avatar";

<Avatar initials="JD" size="small" />
<Avatar initials="JD" size="default" />
<Avatar initials="JD" size="large" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Initials</h2>
            <p className="demo-group__description">
              When no image is provided, avatars display user initials. You can pass initials directly or provide a name prop.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <Avatar initials="JD" />
              <Avatar initials="AB" />
              <Avatar initials="MS" />
              <Avatar name="Jane Doe" />
              <Avatar name="John Smith" />
            </Flex>
            <div className="avatar-demo__code-block-wrapper">
              <CopyButton codeString={`import Avatar from "../ui/Avatar/Avatar";

// Using initials prop directly
<Avatar initials="JD" />
<Avatar initials="AB" />

// Using name prop (initials generated automatically)
<Avatar name="Jane Doe" />
<Avatar name="John Smith" />`} />
              <pre className="avatar-demo__code-block">
                <code className="language-jsx">{`import Avatar from "../ui/Avatar/Avatar";

// Using initials prop directly
<Avatar initials="JD" />
<Avatar initials="AB" />

// Using name prop (initials generated automatically)
<Avatar name="Jane Doe" />
<Avatar name="John Smith" />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Status Indicator</h2>
            <p className="demo-group__description">
              Avatars can display a status indicator (green dot) to show online status or active state.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <Avatar initials="JD" status />
              <Avatar initials="AB" status />
              <Avatar initials="MS" status />
            </Flex>
            <div className="avatar-demo__code-block-wrapper">
              <CopyButton codeString={`import Avatar from "../ui/Avatar/Avatar";

<Avatar initials="JD" status />
<Avatar initials="AB" status />
<Avatar initials="MS" status />`} />
              <pre className="avatar-demo__code-block">
                <code className="language-jsx">{`import Avatar from "../ui/Avatar/Avatar";

<Avatar initials="JD" status />
<Avatar initials="AB" status />
<Avatar initials="MS" status />`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">With Image</h2>
            <p className="demo-group__description">
              Avatars can display user profile images. If the image fails to load, initials will be shown as a fallback.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <Avatar 
                src={getDoctorImage(0)} 
                alt="Dr. John Davis"
                initials="JD"
              />
              <Avatar 
                src={getDoctorImage(1)} 
                alt="Dr. Amy Brown"
                initials="AB"
              />
              <Avatar 
                src={getDoctorImage(2)} 
                alt="Dr. Michael Smith"
                initials="MS"
              />
              <Avatar 
                src={getDoctorImage(3)} 
                alt="Dr. Sarah Wilson"
                initials="SW"
              />
              <Avatar 
                src={getDoctorImage(4)} 
                alt="Dr. Robert Chen"
                initials="RC"
              />
            </Flex>
            <div className="avatar-demo__code-block-wrapper">
              <CopyButton codeString={`import Avatar from "../ui/Avatar/Avatar";
import { getDoctorImage, getDoctor } from "../assets/images/doctors";

// Using getDoctorImage by index
<Avatar 
  src={getDoctorImage(0)} 
  alt="Dr. John Davis"
  initials="JD"
/>

// Using getDoctor by name
const doctor = getDoctor("Sarah Chen");
<Avatar 
  src={doctor.image} 
  alt="Dr. Sarah Chen"
  initials={doctor.initials}
/>`} />
              <pre className="avatar-demo__code-block">
                <code className="language-jsx">{`import Avatar from "../ui/Avatar/Avatar";
import { getDoctorImage, getDoctor } from "../assets/images/doctors";

// Using getDoctorImage by index
<Avatar 
  src={getDoctorImage(0)} 
  alt="Dr. John Davis"
  initials="JD"
/>

// Using getDoctor by name
const doctor = getDoctor("Sarah Chen");
<Avatar 
  src={doctor.image} 
  alt="Dr. Sarah Chen"
  initials={doctor.initials}
/>`}</code>
              </pre>
            </div>
          </div>

          <div className="demo-group">
            <h2 className="demo-group__heading">Image with Status</h2>
            <p className="demo-group__description">
              Combine profile images with status indicators.
            </p>
            <Flex direction="row" gap="16" wrap={true} alignItems="center" className="demo-grid">
              <Avatar 
                src={getDoctorImage(5)} 
                alt="Doctor"
                status
                size="small"
              />
              <Avatar 
                src={getDoctorImage(6)} 
                alt="Doctor"
                status
                size="default"
              />
              <Avatar 
                src={getDoctorImage(7)} 
                alt="Doctor"
                status
                size="large"
              />
            </Flex>
            <div className="avatar-demo__code-block-wrapper">
              <CopyButton codeString={`import Avatar from "../ui/Avatar/Avatar";
import { getDoctorImage } from "../assets/images/doctors";

<Avatar 
  src={getDoctorImage(5)} 
  alt="Doctor"
  status
  size="small"
/>

<Avatar 
  src={getDoctorImage(6)} 
  alt="Doctor"
  status
  size="default"
/>

<Avatar 
  src={getDoctorImage(7)} 
  alt="Doctor"
  status
  size="large"
/>`} />
              <pre className="avatar-demo__code-block">
                <code className="language-jsx">{`import Avatar from "../ui/Avatar/Avatar";
import { getDoctorImage } from "../assets/images/doctors";

<Avatar 
  src={getDoctorImage(5)} 
  alt="Doctor"
  status
  size="small"
/>

<Avatar 
  src={getDoctorImage(6)} 
  alt="Doctor"
  status
  size="default"
/>

<Avatar 
  src={getDoctorImage(7)} 
  alt="Doctor"
  status
  size="large"
/>`}</code>
              </pre>
            </div>
          </div>
        </div>

        <Divider variant="solid" />

        <div className="page__tabs-content-container">
          <div className="demo-group">
            <div className="page__navigation">
              <Link
                to="/accordion"
                className="page__nav-link page__nav-link--prev"
              >
                <span className="page__nav-label">Previous</span>
                <span className="page__nav-title">Accordion</span>
              </Link>
              <Link
                to="/badge"
                className="page__nav-link page__nav-link--next"
              >
                <span className="page__nav-label">Next</span>
                <span className="page__nav-title">Badge</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
