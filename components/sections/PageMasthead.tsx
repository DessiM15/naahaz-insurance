import { Fragment, type ReactNode } from "react";

/**
 * The section front.
 *
 * Every page except the homepage opens on one of these: a centred title
 * between rules, on bone, no photograph. It is what a newspaper puts at the
 * top of a section, which is the right device for a layout named after one.
 *
 * The title arrives word by word. That stagger is pure CSS with the delay set
 * inline, exactly like the homepage hero — which means it is server rendered
 * and starts on first paint. It deliberately does not use the scroll-driven
 * reveal: a mask driven by an observer that never fires leaves the page's h1
 * invisible, which is precisely the bug this replaces.
 *
 * Write the accent word in {braces}:
 *   <PageMasthead title="Straight answers, no {jargon}" />
 */

/**
 * Splits on spaces, keeps {braced} runs accented, and gives each word its own
 * delay.
 *
 * THE SPACE GOES BETWEEN THE WRAPPERS, NOT INSIDE THEM. Each word sits in an
 * inline-block so it can be masked, and CSS removes white space at the end of
 * a line box — so a space placed inside the wrapper contributes no width at
 * all and every word runs into the next. components/concepts/Words.tsx solves
 * the same problem with a literal non-breaking space instead, which works but
 * is not trimmed at a wrap point either: the trailing nbsp keeps its width at
 * the end of a wrapped line and pulls a centred headline off centre by half a
 * space. An ordinary space, emitted as a sibling, renders between the words
 * and is correctly dropped where the line breaks.
 *
 * The brace run can span several words — "in {one place}" — so it is tracked
 * across the loop rather than tested per word. Testing each word on its own
 * accented "{one" and missed "place}", which silently half-styled the title.
 */
function words(title: string, start: number, step: number) {
  const parts = title.split(" ");
  let inAccent = false;

  return parts.map((word, i) => {
    if (word.startsWith("{")) inAccent = true;
    const accent = inAccent;
    if (word.endsWith("}")) inAccent = false;

    const clean = word.replace(/[{}]/g, "");
    return (
      <Fragment key={i}>
        <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
          <span
            className="c-word"
            style={{ ["--wd" as string]: `${(start + i * step).toFixed(3)}s` }}
          >
            {accent ? (
              <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>{clean}</span>
            ) : (
              clean
            )}
          </span>
        </span>
        {i < parts.length - 1 ? " " : ""}
      </Fragment>
    );
  });
}

export function PageMasthead({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  /** Accent word in {braces}. */
  title: string;
  lede?: ReactNode;
  /** Anything that should sit under the lede, inside the masthead. */
  children?: ReactNode;
}) {
  return (
    <section className="bs-masthead relative pb-16 pt-36 text-center lg:pb-20 lg:pt-44">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div
            className="bs-masthead-rule c-in mx-auto w-40"
            style={{ ["--wd" as string]: "0.05s" }}
            aria-hidden
          />

          <p className="c-in c-eyebrow mt-8" style={{ ["--wd" as string]: "0.14s" }}>
            {eyebrow}
          </p>

          <h1 className="bs-masthead-title mt-7">{words(title, 0.26, 0.07)}</h1>

          {lede && (
            <p
              className="c-in mx-auto mt-9 max-w-2xl text-[1.1rem] leading-relaxed"
              style={{ color: "var(--c-ink-soft)", ["--wd" as string]: "0.62s" }}
            >
              {lede}
            </p>
          )}

          {children && (
            <div className="c-in mt-10" style={{ ["--wd" as string]: "0.74s" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
