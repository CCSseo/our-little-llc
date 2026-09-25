"use client";

import { useState } from "react";
import { PROMISE } from "@/lib/content";

export function PromiseStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="promise-strip" data-paused={paused}>
      <div className="promise-window">
        <div className="promise-track">
          {[0, 1].map((copy) => (
            <div className="promise-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {PROMISE.map((phrase) => <span key={phrase}>{phrase}<span className="promise-divider" aria-hidden>/</span></span>)}
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="promise-toggle" onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Play scrolling text" : "Pause scrolling text"} aria-pressed={paused}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          {paused ? <path d="M4 2 13 8 4 14Z" /> : <path d="M4 2H6V14H4ZM10 2H12V14H10Z" />}
        </svg>
      </button>
    </div>
  );
}
