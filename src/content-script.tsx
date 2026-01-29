import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./app/App";
import styleUrl from "./styles/index.css?url";

// Chrome typings are not strictly required for runtime, keep it simple for now.
declare const chrome: any;

// Namespace all injected DOM under a single root element
const CONTAINER_ID = "summarizer-extension-root";
const APP_ROOT_ID = "summarizer-extension-app-root";

// Keep a single React root per page to avoid createRoot warnings
let reactRoot: Root | null = null;

function ensureContainer() {
  let host = document.getElementById(CONTAINER_ID);
  if (!host) {
    host = document.createElement("div");
    host.id = CONTAINER_ID;
    // Keep it out of normal layout flow
    host.style.all = "initial";
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.pointerEvents = "none";
    host.style.zIndex = "2147483647";
    document.documentElement.appendChild(host);
  }

  // Use Shadow DOM to isolate styles and avoid collisions
  const shadow =
    (host.shadowRoot as ShadowRoot | null) ??
    host.attachShadow({ mode: "open" });

  // Inject our stylesheet into the shadow root so Tailwind and theme only affect our UI
  const existingLink = shadow.querySelector<HTMLLinkElement>("link[data-summarizer-style]");
  if (!existingLink) {
    const linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.setAttribute("data-summarizer-style", "true");
    // Vite resolves the CSS asset path at build time; chrome.runtime.getURL makes it accessible from the extension
    linkEl.href = chrome.runtime.getURL(styleUrl);
    shadow.appendChild(linkEl);
  }

  let appRoot = shadow.getElementById(APP_ROOT_ID) as HTMLElement | null;
  if (!appRoot) {
    appRoot = document.createElement("div");
    appRoot.id = APP_ROOT_ID;
    appRoot.style.pointerEvents = "auto";
    shadow.appendChild(appRoot);
  }

  return appRoot;
}

function mount() {
  const appRoot = ensureContainer();

  if (!reactRoot) {
    reactRoot = createRoot(appRoot);
  }

  reactRoot.render(<App />);
}

// Run as soon as the content script loads
mount();

