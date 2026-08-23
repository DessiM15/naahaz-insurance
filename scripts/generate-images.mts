/**
 * Generates the eight service photographs with OpenAI's image API.
 *
 * These run OFFLINE and the results are committed. Deliberately not a runtime
 * route: the key never leaves this machine, `next/image` gets real files to
 * optimise, and scripts/build-blur.sh can build an LQIP for each one. A image
 * generated per request would have no placeholder and would pop in cold.
 *
 *   node --env-file=.env.local scripts/generate-images.mts            # all eight
 *   node --env-file=.env.local scripts/generate-images.mts medicare   # just one
 *   node --env-file=.env.local scripts/generate-images.mts --dry-run  # print prompts
 *
 * Flags: --dry-run, --no-blur, --model=<id>, --size=1K|2K|4K, --keep-raw
 *
 * The previous stock photographs are in git. Nothing here backs them up
 * because `git checkout -- public/images/services` already does.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ENDPOINT = "https://api.openai.com/v1/images/generations";
const OUT_DIR = "public/images/services";

/**
 * House style, appended to every prompt.
 *
 * The Broadsheet is an editorial surface, so these have to read as reportage
 * rather than stock. "No one looking at the camera" is the single line doing
 * the most work — direct-to-camera smiling is what makes stock look like stock.
 * No text of any kind: generated signage comes out as garbled pseudo-lettering
 * and it is the first thing a viewer notices.
 */
const STYLE = [
  "Editorial documentary photograph, shot on a 50mm lens at f/2, natural window light,",
  "muted warm palette of oatmeal, slate blue and soft gold, fine film grain, gentle contrast.",
  "An unposed candid moment, caught mid-action. Nobody looks at the camera and nobody poses.",
  "Ordinary-looking people with real faces, not models; clothing is plain and lived-in.",
  "Chicago northwest suburbs, Illinois — modest, comfortable, unmistakably Midwestern American.",
  "Absolutely no text, lettering, signage, logos, watermarks or numbers anywhere in the frame.",
  "Not glossy, not corporate, no white-background studio look, no over-saturation.",
].join(" ");

/**
 * One prompt per service, matching the `alt` text already written in
 * content/concepts.ts — the alt copy was written for photographs the build
 * never had, so it doubles as the art direction brief.
 *
 * The ages track the audience in the brief (retirement and annuity clients,
 * 50-70) and the ethnicities are varied deliberately across the eight so the
 * set reads as the actual Rolling Meadows book of business — a South Asian
 * owned agency serving a suburb with a large Eastern European community —
 * rather than one demographic repeated eight times.
 */
const PROMPTS: Record<string, string> = {
  "retirement-planning":
    "A married couple in their early sixties sit side by side at a kitchen table in morning light, " +
    "reviewing printed statements spread out in front of them. Coffee cups, reading glasses, a pen. " +
    "One of them points at a line on the page while the other leans in to look. South Asian couple.",

  "life-insurance":
    "A family of four in a sunlit living room on a weekend morning — two parents in their late thirties, " +
    "a school-age son and a younger daughter — on and around the sofa mid-conversation, one child half " +
    "upside down over the arm of it. Nobody is arranged for the camera. Black family, warm and ordinary.",

  medicare:
    "Grandparents in their late sixties sit on a back porch with two grandchildren, all four looking " +
    "down at a tablet one of the children is holding. Mid conversation, someone laughing. " +
    "Eastern European grandparents, late summer afternoon.",

  "income-strategies":
    "A man in his mid thirties at a kitchen table in the evening, a laptop open beside a spread of " +
    "printed statements, one hand resting on a pen, working through the numbers. Focused, sleeves " +
    "pushed up, a mug going cold beside him. East Asian, an ordinary apartment.",

  "long-term-care":
    "A daughter in her fifties sits close to her elderly mother in a quiet sunlit room, holding both of " +
    "her mother's hands in her own lap. The hands are the centre of the frame. Faces soft, unhurried. " +
    "White American family, tenderness without sentimentality.",

  "health-insurance":
    "A patient in her forties sits on the edge of the exam table in a small clinic room, mid conversation " +
    "with her doctor, who sits on a stool leaning forward and listening. Plain daylight through a window, " +
    "calm and unhurried, nobody distressed. Latina patient, Black woman doctor in a plain white coat.",

  "business-insurance":
    "A small business owner in her forties works behind the counter of her own hardware store, sleeves " +
    "rolled up, mid-task with a customer's order. Shelves and stock behind her, practical daylight. " +
    "South Asian, capable and busy.",

  // The ninth service. Not on the homepage list, but it shares the services
  // grid with the other eight — one leftover stock photo among them shows.
  "travel-insurance":
    "A couple in their late twenties on holiday, standing at a stone overlook above a coastline in " +
    "morning light, one adjusting the strap of a daypack while the other looks out at the water. " +
    "Seen from behind and slightly to the side. Mixed race couple, relaxed, no crowds.",

  "property-casualty":
    "A modest two storey suburban house on a quiet residential street in early evening light. Mature " +
    "trees, a car in the driveway, one warm lit window. No people in frame. Late spring, Midwestern.",
};

// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const flag = (name: string) => argv.includes(`--${name}`);
const opt = (name: string, fallback: string) =>
  argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? fallback;

const DRY_RUN = flag("dry-run");
const KEEP_RAW = flag("keep-raw");
const SKIP_BLUR = flag("no-blur");
const MODEL = opt("model", "gpt-image-2");
// gpt-image-2 takes any dimensions divisible by 16 (verified against the API,
// which validates this before anything is billed). 4:5 portrait: the homepage
// panel is a tall right-hand half and the grid cards are landscape, so a
// centred 4:5 object-cover crop serves both and one master covers each service.
const SIZE = opt("size", "2048x2560");
const QUALITY = opt("quality", "high");

const slugs = argv.filter((a) => !a.startsWith("--"));
const targets = slugs.length ? slugs : Object.keys(PROMPTS);

for (const slug of targets) {
  if (!PROMPTS[slug]) {
    console.error(`Unknown service "${slug}". Known: ${Object.keys(PROMPTS).join(", ")}`);
    process.exit(1);
  }
}

const KEY = process.env.OPENAI_API_KEY;
if (!DRY_RUN && !KEY) {
  console.error(
    "OPENAI_API_KEY is not set.\n" +
      "Put it in .env.local and run with:  node --env-file=.env.local scripts/generate-images.mts",
  );
  process.exit(1);
}

/**
 * Walks the response for the first base64 image payload.
 *
 * Today that is `data[0].b64_json`, but the field has moved across image model
 * generations. Rather than pin one path and burn a paid call finding out it
 * changed, look for the bytes.
 */
function findImageData(node: unknown, depth = 0): string | null {
  if (depth > 12 || node === null || typeof node !== "object") return null;
  if (Array.isArray(node)) {
    for (const item of node) {
      const hit = findImageData(item, depth + 1);
      if (hit) return hit;
    }
    return null;
  }
  const obj = node as Record<string, unknown>;
  const data = obj.data ?? obj.bytes_base64 ?? obj.b64_json;
  if (typeof data === "string" && data.length > 1024 && /^[A-Za-z0-9+/=\s]+$/.test(data.slice(0, 256))) {
    return data;
  }
  for (const value of Object.values(obj)) {
    const hit = findImageData(value, depth + 1);
    if (hit) return hit;
  }
  return null;
}

async function generate(slug: string, prompt: string): Promise<Buffer> {
  const body = {
    model: MODEL,
    prompt: `${prompt}\n\n${STYLE}`,
    n: 1,
    size: SIZE,
    quality: QUALITY,
    output_format: "jpeg",
  };

  let lastError = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!res.ok) {
      lastError = `HTTP ${res.status} — ${text.slice(0, 400)}`;
      // 4xx other than rate limiting will not fix themselves.
      if (res.status !== 429 && res.status < 500) break;
      const wait = attempt * 4000;
      console.warn(`    retrying in ${wait / 1000}s (${lastError.slice(0, 80)})`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }

    const data = findImageData(JSON.parse(text));
    if (!data) {
      lastError = `no image bytes in response — ${text.slice(0, 400)}`;
      break;
    }
    return Buffer.from(data.replace(/\s/g, ""), "base64");
  }
  throw new Error(`${slug}: ${lastError}`);
}

// ---------------------------------------------------------------------------

mkdirSync(OUT_DIR, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "naahaz-img-"));
const done: string[] = [];
const failed: string[] = [];

for (const slug of targets) {
  const prompt = PROMPTS[slug];

  if (DRY_RUN) {
    console.log(`\n── ${slug} ──\n${prompt}\n\n${STYLE}`);
    continue;
  }

  process.stdout.write(`${slug} … `);
  try {
    const raw = await generate(slug, prompt);
    const rawPath = join(tmp, `${slug}.jpg`);
    writeFileSync(rawPath, raw);

    // Strip EXIF, cap the long edge and recompress. The stock files this
    // replaces ranged from 92K to 708K with no consistency; 2000px on the long
    // edge at q82 lands around 250K, which is what next/image wants to resize
    // from. Progressive because these are large and above the fold.
    const outPath = join(OUT_DIR, `${slug}.jpg`);
    execFileSync("magick", [
      rawPath,
      "-auto-orient",
      "-resize", "2000x2000>",
      "-strip",
      "-interlace", "Plane",
      "-sampling-factor", "4:2:0",
      "-quality", "82",
      outPath,
    ]);

    if (KEEP_RAW) {
      mkdirSync("scratch/raw", { recursive: true });
      writeFileSync(join("scratch/raw", `${slug}.jpg`), raw);
    }

    const dims = execFileSync("magick", ["identify", "-format", "%wx%h", outPath]).toString();
    console.log(`ok  ${dims}  ${(raw.length / 1024).toFixed(0)}K raw`);
    done.push(slug);
  } catch (err) {
    console.log("FAILED");
    console.error(`    ${(err as Error).message}`);
    failed.push(slug);
  }
}

rmSync(tmp, { recursive: true, force: true });

if (DRY_RUN) process.exit(0);

if (done.length && !SKIP_BLUR) {
  console.log("\nrebuilding blur placeholders …");
  execFileSync("./scripts/build-blur.sh", { stdio: "inherit" });
}

console.log(`\n${done.length} generated, ${failed.length} failed.`);
if (failed.length) {
  console.log(`Retry:  node --env-file=.env.local scripts/generate-images.mts ${failed.join(" ")}`);
  process.exit(1);
}
console.log("Review them, then:  git add public/images/services lib/blur-map.ts");
