"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "idle" | "redirect" | "form" | "verify" | "done";

const EMAIL = "amina@example.com";
const PASSWORD_LENGTH = 10;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Plays the WAONA Identity sign-in flow with sample data: an app hands the
 * user to WAONA Identity, they sign in, and the app gets back a signed token
 * whose claims are shown decoded.
 */
export default function IdentityDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState(0);
  const [claims, setClaims] = useState<Record<string, string | number | boolean> | null>(null);
  const running = useRef(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  async function run() {
    if (running.current) return;
    running.current = true;
    const fast = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pace = fast ? 0 : 1;

    setClaims(null);
    setEmail("");
    setPw(0);
    setStage("redirect");
    await wait(900 * pace);
    if (!alive.current) return;

    setStage("form");
    await wait(350 * pace);
    for (let i = 1; i <= EMAIL.length; i++) {
      setEmail(EMAIL.slice(0, i));
      await wait(45 * pace);
    }
    for (let i = 1; i <= PASSWORD_LENGTH; i++) {
      setPw(i);
      await wait(55 * pace);
    }
    await wait(300 * pace);
    if (!alive.current) return;

    setStage("verify");
    await wait(900 * pace);
    if (!alive.current) return;

    const now = Math.floor(Date.now() / 1000);
    setClaims({
      iss: "WAONA Identity",
      aud: "acme-events",
      sub: crypto.randomUUID(),
      email: EMAIL,
      email_verified: true,
      iat: now,
      exp: now + 300,
    });
    setStage("done");
    running.current = false;
  }

  function reset() {
    running.current = false;
    setStage("idle");
    setClaims(null);
  }

  const atApp = stage === "idle" || stage === "done";

  return (
    <div className="idemo" aria-live="polite">
      <div className="idemo-window">
        <div className="idemo-bar">
          <span className="browser-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className={`idemo-url${atApp ? "" : " is-auth"}`}>
            {atApp ? "acme-events.example" : "WAONA Identity"}
          </span>
          {stage === "redirect" && <span className="idemo-load" />}
        </div>

        <div className="idemo-view">
          {stage === "idle" && (
            <div className="idemo-app">
              <p className="idemo-app-name">Acme Events</p>
              <p className="idemo-app-copy">Sign in to see your tickets.</p>
              <button type="button" className="idemo-waona" onClick={run} data-cursor="Try it">
                <span className="idemo-w" aria-hidden="true">
                  W
                </span>
                Sign in with WAONA
              </button>
            </div>
          )}

          {stage === "redirect" && (
            <div className="idemo-app is-dim">
              <p className="idemo-app-name">Acme Events</p>
              <p className="idemo-app-copy">Taking you to WAONA Identity…</p>
            </div>
          )}

          {(stage === "form" || stage === "verify") && (
            <div className="idemo-auth">
              <p className="idemo-auth-brand">WAONA IDENTITY</p>
              <div className="idemo-form">
                <p className="idemo-form-title">Sign in to Acme Events</p>
                <label>
                  Email
                  <span className="idemo-input">
                    {email}
                    {stage === "form" && pw === 0 && <span className="idemo-caret" />}
                  </span>
                </label>
                <label>
                  Password
                  <span className="idemo-input">
                    {"•".repeat(pw)}
                    {stage === "form" && pw > 0 && <span className="idemo-caret" />}
                  </span>
                </label>
                <span className={`idemo-submit${stage === "verify" ? " is-busy" : ""}`}>
                  {stage === "verify" ? "Checking…" : "Sign in"}
                </span>
              </div>
            </div>
          )}

          {stage === "done" && claims && (
            <div className="idemo-app idemo-welcome">
              <p className="idemo-app-name">Welcome back, Amina</p>
              <p className="idemo-app-copy">Signed in with WAONA Identity. Here is what Acme received:</p>
              <pre className="idemo-token" aria-label="Decoded ID token claims">
                <code>
                  {"{\n"}
                  {Object.entries(claims).map(([k, v], i, all) => (
                    <span key={k} className="idemo-claim" style={{ animationDelay: `${i * 90}ms` }}>
                      {"  "}
                      <span className="tk-key">&quot;{k}&quot;</span>:{" "}
                      <span className={typeof v === "string" ? "tk-str" : "tk-lit"}>
                        {typeof v === "string" ? `"${v}"` : String(v)}
                      </span>
                      {i < all.length - 1 ? ",\n" : "\n"}
                    </span>
                  ))}
                  {"}"}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="idemo-foot">
        <p>A demo of the flow with sample data. No real account is used.</p>
        {stage === "done" && (
          <button type="button" className="idemo-replay" onClick={reset}>
            Play again
          </button>
        )}
      </div>
    </div>
  );
}
