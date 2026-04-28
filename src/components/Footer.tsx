import Link from "next/link";
import { Logo } from "./Logo";

const COLUMNS: { heading: string; links: string[] }[] = [
  {
    heading: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog", "Docs"],
  },
  {
    heading: "Company",
    links: ["About", "Customers", "Careers", "Brand", "Press"],
  },
  {
    heading: "Resources",
    links: ["Community", "Blog", "Method", "Contact", "Status"],
  },
  {
    heading: "Legal",
    links: ["Terms", "Privacy", "Security", "DPA", "Cookies"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/60 px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[2fr_3fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A design-study demo. All copy is placeholder; the accent is
            hue-shifted from a public reference. Not affiliated with any brand.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-foreground">
                {heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                {links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="transition-colors hover:text-foreground"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
