import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Chrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <section className="wrap page-hero">
          <h1>Nothing here.</h1>
          <p className="page-lede">That page doesn&apos;t exist, or it has moved.</p>
          <Link href="/" className="btn btn--solid">
            Go to the home page
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
