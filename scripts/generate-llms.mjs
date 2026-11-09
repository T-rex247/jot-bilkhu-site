import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";

// Compile the shared copy module in memory; works with the site's Node 20+ baseline.
const source = await readFile(new URL("../data/site.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { BIZ, ABOUT, SERVICES, HOW, FIRST_BUILD, FAQ, UI, SITE_URL } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const text = [
  `# ${BIZ.brand}`, SITE_URL, BIZ.h1, BIZ.tagline, BIZ.sub,
  `## ${ABOUT.label}`, ABOUT.text.replace("{pron}", ABOUT.pron),
  `## ${UI.servicesLabel}`,
  ...SERVICES.flatMap(s => [`### ${s.name}`, s.outcome, ...s.items.map(item => `- ${item.t}`)]),
  `## ${HOW.label}`, ...HOW.steps.flatMap(s => [`### ${s.n}. ${s.t}`, s.d]),
  `## ${FIRST_BUILD.label}`, ...FIRST_BUILD.items.flatMap(item => [`- ${item.t}`, item.d]), FIRST_BUILD.note,
  `## ${FAQ.h}`, ...FAQ.items.flatMap(item => [`### ${item.q}`, item.a]),
  `## ${BIZ.cta}`, BIZ.ctaNote, BIZ.bookHref, BIZ.name, BIZ.city, BIZ.phone, BIZ.email,
].join("\n\n") + "\n";
await writeFile(new URL("../public/llms.txt", import.meta.url), text);
