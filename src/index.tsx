import "./config";
import "./serviceWorker";

import { createRoot } from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

// Reference for reportWebVitals: https://bit.ly/CRA-vitals
reportWebVitals();
