import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Chrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <section className="container page-hero">
          <p className="eyebrow">404</p>
          <h1>Nothing here.</h1>
          <p className="lead">That page doesn&apos;t exist, or it moved.</p>
          <Link href="/" className="btn btn--primary">
            Back home
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
