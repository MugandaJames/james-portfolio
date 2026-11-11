import Image from "next/image";
import { APP_BG, type Shot } from "@/content/shots";

type FrameProps = {
  shot: Shot;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/** A real product screenshot inside a phone. Width comes from `className`; height follows. */
export function Phone({ shot, priority, className = "", sizes = "320px" }: FrameProps) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen" style={{ backgroundColor: shot.bg ?? APP_BG }}>
        <Image
          src={shot.src}
          alt={shot.alt}
          priority={priority}
          placeholder="blur"
          sizes={sizes}
          className="phone-img"
        />
      </div>
    </div>
  );
}

/** A real product screenshot inside a minimal browser window. */
export function Browser({
  shot,
  priority,
  className = "",
  sizes = "(max-width: 900px) 92vw, 760px",
  address = "WAONA",
}: FrameProps & { address?: string }) {
  return (
    <figure className={`browser ${className}`}>
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-address">{address}</span>
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        priority={priority}
        placeholder="blur"
        sizes={sizes}
        className="browser-img"
      />
    </figure>
  );
}
