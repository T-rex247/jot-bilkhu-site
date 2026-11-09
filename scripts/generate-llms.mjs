import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";

// Use exactly the same copy as the rendered page, without a second set of exports.
const source = await readFile(new URL("../data/site.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { SITE: s } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const summary = [
  s.brand, s.SITE_URL, s.location,
  s.opening.heading, s.opening.body, s.opening.promise, s.opening.promiseNote,
  s.what.heading, s.what.body,
  s.how.heading, ...s.how.steps.map((step, i) => `${i + 1}. ${[step.title, step.body].filter(Boolean).join(" ")}`),
  s.about.heading, s.about.intro, `${s.about.portfolio}: ${s.PORTFOLIO_HREF}`, s.about.body, s.about.strengths,
  s.work.heading, ...s.work.cards.map(card => `${card.title}\n${card.body}`),
  s.hunch.heading, s.hunch.body,
  s.start.heading, s.start.body,
  `${s.start.book}: ${s.BOOK_HREF}`, `${s.start.phone}: ${s.PHONE_DISPLAY} (tel:${s.PHONE_TEL})`, `${s.start.email}: ${s.EMAIL}`,
].join("\n\n") + "\n";
await writeFile(new URL("../public/llms.txt", import.meta.url), summary);
