import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "@mich8060/unified-design-system";
import UDS from "@mich8060/unified-design-system/UDS";
import "@mich8060/unified-design-system/styles.css";

function App() {
  return (
    <UDS>
      <UDS.Content>
        <UDS.Main>
          <Button label="Fixture Button" />
        </UDS.Main>
      </UDS.Content>
    </UDS>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
