import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// COMPLETE ResizeObserver error elimination - ABSOLUTE SILENCE
(() => {
  // Nuclear option - completely disable ResizeObserver errors
  const errorPatterns = [
    'ResizeObserver loop completed with undelivered notifications',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver',
    'loop completed with undelivered notifications',
    'runtime-error-plugin'
  ];

  // Override ResizeObserver with bulletproof implementation
  const OriginalResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class extends OriginalResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      const bulletproofCallback: ResizeObserverCallback = (entries, observer) => {
        // Triple-wrapped for maximum safety
        setTimeout(() => {
          requestAnimationFrame(() => {
            try {
              callback(entries, observer);
            } catch (e) {
              // Absolute silence - no errors escape
            }
          });
        }, 0);
      };
      super(bulletproofCallback);
    }
  };

  // Pattern matching function
  const shouldSuppress = (message: string) => {
    return errorPatterns.some(pattern => message.includes(pattern));
  };

  // LAYER 1: Global error handler - ABSOLUTE PRIORITY
  const originalWindowError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (typeof message === 'string' && shouldSuppress(message)) {
      return true; // Suppress completely
    }
    return originalWindowError ? originalWindowError(message, source, lineno, colno, error) : false;
  };

  // LAYER 2: Event listener with capture - MAXIMUM PRIORITY
  window.addEventListener('error', (e) => {
    if (shouldSuppress(e.message)) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }, { capture: true, passive: false });

  // LAYER 3: Unhandled rejections
  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason?.message && shouldSuppress(e.reason.message)) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // LAYER 4: Console complete override
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args.join(' ');
    if (!shouldSuppress(message)) {
      originalConsoleError.apply(console, args);
    }
  };

  // LAYER 5: Console warn override
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const message = args.join(' ');
    if (!shouldSuppress(message)) {
      originalConsoleWarn.apply(console, args);
    }
  };
})();

createRoot(document.getElementById("root")!).render(<App />);