/** Small helpers shared by the interactive pieces. Browser-only. */

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;

/** A short vibration on phones that support it (Android). Silently ignored elsewhere. */
export function haptic(pattern: number | number[] = 12) {
  if (prefersReducedMotion()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Some browsers throw when vibration isn't allowed; it's only a nicety.
  }
}

/**
 * Calls `onTilt` with the phone's tilt, normalised to roughly -1..1 on each axis.
 * Uses the motion sensor where it's available without a permission prompt
 * (Android). Returns a cleanup function.
 */
export function onDeviceTilt(onTilt: (x: number, y: number) => void) {
  type OrientationCtor = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> };
  const Ctor = (typeof DeviceOrientationEvent !== "undefined" ? DeviceOrientationEvent : undefined) as
    | OrientationCtor
    | undefined;
  // iOS needs an explicit permission prompt; we don't interrupt people for a decoration.
  if (!Ctor || typeof Ctor.requestPermission === "function") return () => {};

  let base: { beta: number; gamma: number } | null = null;
  const handle = (e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    base ??= { beta: e.beta, gamma: e.gamma };
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    onTilt(clamp((e.gamma - base.gamma) / 25), clamp((e.beta - base.beta) / 25));
  };
  window.addEventListener("deviceorientation", handle);
  return () => window.removeEventListener("deviceorientation", handle);
}
