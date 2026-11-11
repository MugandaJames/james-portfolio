"use client";

import { useState } from "react";
import { haptic } from "@/components/motion/device";

const STAGES = ["Request", "Idempotency", "Transaction", "Outbox"];
const AMOUNT = 500;

type Entry = { key: string; amount: number };

function newKey() {
  return `pay_${Math.random().toString(16).slice(2, 8)}`;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * FinPay's core guarantee, playable: send a payment, then retry the exact same
 * request (same idempotency key). The retry stops at the idempotency check and
 * returns the original result, so the account is only charged once.
 */
export default function IdempotencyDemo() {
  const [key, setKey] = useState("pay_3f9a1c");
  const [balance, setBalance] = useState(10_000);
  const [ledger, setLedger] = useState<Entry[]>([]);
  const [at, setAt] = useState(-1);
  const [stopped, setStopped] = useState(false);
  const [message, setMessage] = useState("Send the payment, then retry it.");
  const [busy, setBusy] = useState(false);
  const [committed, setCommitted] = useState<string[]>([]);

  async function send() {
    if (busy) return;
    setBusy(true);
    setStopped(false);
    const pace = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
    const isRetry = committed.includes(key);

    setMessage(isRetry ? `Retrying ${key}…` : `Sending ${key}…`);
    setAt(0);
    await wait(450 * pace);
    setAt(1);
    await wait(450 * pace);

    if (isRetry) {
      setStopped(true);
      haptic([30, 60, 30]);
      setMessage(`Seen ${key} before. Returned the original result. No second charge.`);
      setBusy(false);
      return;
    }

    setAt(2);
    await wait(450 * pace);
    setCommitted((c) => [...c, key]);
    setBalance((b) => b - AMOUNT);
    setLedger((l) => [{ key, amount: AMOUNT }, ...l].slice(0, 4));
    setAt(3);
    await wait(450 * pace);
    setMessage(`Committed ${key}. Event queued in the outbox.`);
    haptic(15);
    setBusy(false);
  }

  function fresh() {
    if (busy) return;
    setKey(newKey());
    setAt(-1);
    setStopped(false);
    setMessage("New payment, new key.");
  }

  const isRetry = committed.includes(key);

  return (
    <div className="idem">
      <div className="idem-pipe" aria-hidden="true">
        <span className="idem-track" />
        {STAGES.map((s, i) => (
          <span
            key={s}
            className={`idem-node${at >= i ? " is-hit" : ""}${stopped && i === 1 ? " is-stop" : ""}`}
            style={{ left: `${(i / (STAGES.length - 1)) * 100}%` }}
          >
            <span className="idem-node-label">{s}</span>
          </span>
        ))}
        {at >= 0 && (
          <span
            className={`idem-packet${stopped ? " is-stop" : ""}`}
            style={{ left: `${(at / (STAGES.length - 1)) * 100}%` }}
          />
        )}
      </div>

      <div className="idem-panel">
        <div className="idem-controls">
          <p className="idem-key">
            Idempotency key <code>{key}</code>
          </p>
          <div className="idem-buttons">
            <button type="button" className="btn btn--solid btn--sm" onClick={send} disabled={busy}>
              {isRetry ? "Retry the same request" : `Send KSh ${AMOUNT}`}
            </button>
            <button type="button" className="btn btn--line btn--sm" onClick={fresh} disabled={busy}>
              New payment
            </button>
          </div>
          <p className="idem-message" aria-live="polite">
            {message}
          </p>
        </div>

        <div className="idem-ledger">
          <p className="idem-balance">
            Balance <strong>KSh {balance.toLocaleString("en-KE")}</strong>
          </p>
          <ul aria-label="Ledger">
            {ledger.length === 0 && <li className="is-empty">No charges yet</li>}
            {ledger.map((e) => (
              <li key={e.key}>
                <code>{e.key}</code>
                <span>−KSh {e.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
