import App from "./app/App";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import styleUrl from "./styles/index.css?url";

const CONTAINER_ID = "summarizer-extension-root";
const APP_ROOT_ID = "summarizer-extension-app-root";

let reactRoot: Root | null = null;

function ensureContainer() {
  let host = document.getElementById(CONTAINER_ID);
  if (!host) {
    host = document.createElement("div");
    host.id = CONTAINER_ID;
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.pointerEvents = "none";
    host.style.zIndex = "2147483647";
    document.documentElement.appendChild(host);
  }

  const shadow =
    (host.shadowRoot as ShadowRoot | null) ??
    host.attachShadow({ mode: "open" });

  const existingLink = shadow.querySelector<HTMLLinkElement>("link[data-summarizer-style]");
  if (!existingLink) {
    const linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.setAttribute("data-summarizer-style", "true");
    linkEl.href = chrome.runtime.getURL(styleUrl);
    shadow.appendChild(linkEl);
  }

  let appRoot = shadow.getElementById(APP_ROOT_ID) as HTMLElement | null;
  if (!appRoot) {
    appRoot = document.createElement("div");
    appRoot.id = APP_ROOT_ID;
    appRoot.className = "summarizer";
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

mount();
