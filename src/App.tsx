import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@sentry/react";

import logo from "./logo.svg";

import "./App.css";

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Suspense fallback="loading">
              <h1>{t("learnReact")}</h1>
            </Suspense>
          </a>
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;
