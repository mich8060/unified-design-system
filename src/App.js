import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Installation from "./pages/Installation";
import FontInstallation from "./pages/FontInstallation";
import TokensUsage from "./pages/TokensUsage";
import ComponentsUsage from "./pages/ComponentsUsage";
import ButtonDemo from "./pages/ButtonDemo";
import IconDemo from "./pages/IconDemo";
import FlexDemo from "./pages/FlexDemo";
import TypographyDemo from "./pages/TypographyDemo";
import SpacingDemo from "./pages/SpacingDemo";
import ShadowsDemo from "./pages/ShadowsDemo";
import BorderRadiusDemo from "./pages/BorderRadiusDemo";
import ColorsDemo from "./pages/ColorsDemo";
import AccordionDemo from "./pages/AccordionDemo";
import ActionMenuDemo from "./pages/ActionMenuDemo";
import AvatarDemo from "./pages/AvatarDemo";
import BadgeDemo from "./pages/BadgeDemo";
import BrandingDemo from "./pages/BrandingDemo";
import BreadcrumbDemo from "./pages/BreadcrumbDemo";
import DatepickerDemo from "./pages/DatepickerDemo";
import MicroCalendarDemo from "./pages/MicroCalendarDemo";
import CheckboxDemo from "./pages/CheckboxDemo";
import ChipDemo from "./pages/ChipDemo";
import DividerDemo from "./pages/DividerDemo";
import DotStatusDemo from "./pages/DotStatusDemo";
import DropdownDemo from "./pages/DropdownDemo";
import FieldDemo from "./pages/FieldDemo";
import FileUploadDemo from "./pages/FileUploadDemo";
import ImageAspectDemo from "./pages/ImageAspectDemo";
import KeyDemo from "./pages/KeyDemo";
import PillToggleDemo from "./pages/PillToggleDemo";
import ProgressIndicatorDemo from "./pages/ProgressIndicatorDemo";
import ProgressCircleDemo from "./pages/ProgressCircleDemo";
import RadioDemo from "./pages/RadioDemo";
import SliderDemo from "./pages/SliderDemo";
import StatusDemo from "./pages/StatusDemo";
import StepsDemo from "./pages/StepsDemo";
import TableDemo from "./pages/TableDemo";
import ToastDemo from "./pages/ToastDemo";
import ToggleDemo from "./pages/ToggleDemo";
import TooltipDemo from "./pages/TooltipDemo";
import InputDemo from "./pages/InputDemo";
import MenuDemo from "./pages/MenuDemo";
import TabsDemo from "./pages/TabsDemo";
import FigmaVariablesDemo from "./pages/FigmaVariablesDemo";
import PaginationDemo from "./pages/PaginationDemo";
import UtilitiesDemo from "./pages/UtilitiesDemo";
import Menu from "./ui/Menu/Menu";
import "./App.scss";

const BRANDS = [
  "design-system",
  "locumsmart",
  "wireframe",
  "connect",
  "comphealth",
  "modio",
  "weatherby",
  "gms",
];

function App() {
  const [activeBrand, setActiveBrand] = useState(() => {
    const savedBrand = localStorage.getItem("activeBrand");
    return savedBrand && BRANDS.includes(savedBrand)
      ? savedBrand
      : "design-system";
  });

  const [activeMode, setActiveMode] = useState(() => {
    const savedMode = localStorage.getItem("activeMode");
    return savedMode === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-brand", activeBrand);
    root.setAttribute("data-mode", activeMode);
    localStorage.setItem("activeBrand", activeBrand);
    localStorage.setItem("activeMode", activeMode);

    return () => {
      root.setAttribute("data-brand", "design-system");
      root.setAttribute("data-mode", "light");
    };
  }, [activeBrand, activeMode]);

  return (
    <Router>
      <div className="app">
        <div className="app__sidebar">
          <Menu
            activeBrand={activeBrand}
            activeMode={activeMode}
            onBrandChange={setActiveBrand}
            onModeChange={setActiveMode}
          />
        </div>
        <div className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<Installation />} />
            <Route path="/getting-started/installation" element={<Installation />} />
            <Route path="/getting-started/font" element={<FontInstallation />} />
            <Route path="/getting-started/tokens" element={<TokensUsage />} />
            <Route path="/getting-started/components" element={<ComponentsUsage />} />
            <Route path="/buttons" element={<ButtonDemo />} />
            <Route path="/icons" element={<IconDemo />} />
            <Route path="/flex" element={<FlexDemo />} />
            <Route path="/typography" element={<TypographyDemo />} />
            <Route path="/spacing" element={<SpacingDemo />} />
            <Route path="/shadows" element={<ShadowsDemo />} />
            <Route path="/border-radius" element={<BorderRadiusDemo />} />
            <Route path="/colors" element={<ColorsDemo />} />
            <Route path="/accordion" element={<AccordionDemo />} />
            <Route path="/action-menu" element={<ActionMenuDemo />} />
            <Route path="/avatar" element={<AvatarDemo />} />
            <Route path="/badge" element={<BadgeDemo />} />
            <Route path="/branding" element={<BrandingDemo />} />
            <Route path="/breadcrumb" element={<BreadcrumbDemo />} />
            <Route path="/calendar" element={<DatepickerDemo />} />
            <Route path="/micro-calendar" element={<MicroCalendarDemo />} />
            <Route path="/checkbox" element={<CheckboxDemo />} />
            <Route path="/chip" element={<ChipDemo />} />
            <Route path="/divider" element={<DividerDemo />} />
            <Route path="/dot-status" element={<DotStatusDemo />} />
            <Route path="/dropdown" element={<DropdownDemo />} />
            <Route path="/field" element={<FieldDemo />} />
            <Route path="/file-upload" element={<FileUploadDemo />} />
            <Route path="/image-aspect" element={<ImageAspectDemo />} />
            <Route path="/key" element={<KeyDemo />} />
            <Route path="/pill-toggle" element={<PillToggleDemo />} />
            <Route
              path="/progress-indicator"
              element={<ProgressIndicatorDemo />}
            />
            <Route path="/progress-circle" element={<ProgressCircleDemo />} />
            <Route path="/radio" element={<RadioDemo />} />
            <Route path="/slider" element={<SliderDemo />} />
            <Route path="/status" element={<StatusDemo />} />
            <Route path="/steps" element={<StepsDemo />} />
            <Route path="/table" element={<TableDemo />} />
            <Route path="/toast" element={<ToastDemo />} />
            <Route path="/toggle" element={<ToggleDemo />} />
            <Route path="/tooltip" element={<TooltipDemo />} />
            <Route path="/input" element={<InputDemo />} />
            <Route path="/menu" element={<MenuDemo />} />
            <Route path="/tabs" element={<TabsDemo />} />
            <Route path="/pagination" element={<PaginationDemo />} />
            <Route path="/figma-variables" element={<FigmaVariablesDemo />} />
            <Route path="/utilities" element={<UtilitiesDemo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
