import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}?fast`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Ajay's portfolio and primary navigation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Ajay Varada/);
  assert.match(html, /ABOUT/);
  assert.match(html, /WORK/);
  assert.match(html, /INSIGHTS/);
  assert.match(html, /CONTACT/);
  assert.match(html, /ENGINEERS USED MY NLP PLATFORM/);
  assert.doesNotMatch(html, /12\.9716|77\.5946|33\.7490|84\.3880/);
  assert.match(html, /AI\/ML &amp; Software Engineer/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("serves focused work, writing, profile, and contact routes", async () => {
  const [work, writing, profile, contact] = await Promise.all([
    render("/work"), render("/writing"), render("/profile"), render("/contact"),
  ]);
  for (const response of [work, writing, profile, contact]) assert.equal(response.status, 200);
  assert.match(await work.text(), /STATEFUL\.AI[\s\S]*VISION CONSOLE[\s\S]*RESEARCHMATCH/);
  assert.match(await writing.text(), /AI’s Defining Bottleneck Isn’t Intelligence\. It’s Memory\.[\s\S]*Multi-Agent Systems Work Best When Agents Know Less[\s\S]*Adaptive Agents: Why Correcting AI Is Not the Same as Teaching It/);
  assert.match(await profile.text(), /EXPERIENCE[\s\S]*MICRON TECHNOLOGY[\s\S]*CAPABILITIES/);
  assert.match(await contact.text(), /LET’S[\s\S]*BUILD[\s\S]*mailto:/);
});

test("keeps identity, project data, writing links, and contact actions in the product source", async () => {
  const [portfolio, hero, header, proof, work, writing, contact, layout] = await Promise.all([
    readFile(new URL("../app/Portfolio.jsx", import.meta.url), "utf8"),
    readFile(new URL("../components/portfolio/HeroField.jsx", import.meta.url), "utf8"),
    readFile(new URL("../components/portfolio/Header.jsx", import.meta.url), "utf8"),
    readFile(new URL("../components/portfolio/HiringProof.jsx", import.meta.url), "utf8"),
    readFile(new URL("../components/portfolio/WorkPortal.jsx", import.meta.url), "utf8"),
    readFile(new URL("../components/portfolio/Writing.jsx", import.meta.url), "utf8"),
    readFile(new URL("../components/portfolio/Contact.jsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(portfolio, /<motion\.main/);
  assert.match(portfolio, /history\.pushState/);
  assert.match(hero, /AJAY/);
  assert.match(hero, /VARADA/);
  assert.match(hero, /Former Micron engineer/);
  assert.match(header, /header-resume/);
  assert.match(proof, /170\+/);
  assert.match(work, /STATEFUL\.AI/);
  assert.match(work, /Recall@5/);
  assert.match(work, /RESEARCHMATCH/);
  assert.match(work, /cover: '\/projects\/vision-console-stereo\.jpg'/);
  assert.match(work, /SCROLL TO EXPLORE/);
  assert.match(work, /caseStudy:/);
  assert.match(writing, /substack\.com\/@ajayvarada\/note\/p-207923267/);
  assert.match(writing, /substack\.com\/@ajayvarada\/note\/p-210856139/);
  assert.match(writing, /Multi-Agent Systems Work Best When Agents Know Less/);
  assert.match(writing, /context-engineering-delete\.jpeg/);
  assert.match(writing, /PUBLISHED/);
  assert.match(writing, /const published = Boolean\(post\.href\)/);
  assert.match(writing, /scroll-snap-type:x mandatory/);
  assert.match(writing, /ArrowRight/);
  assert.match(contact, /mailto:/);
  assert.match(contact, /production systems—not just prototypes/);
  assert.doesNotMatch(contact, /<form/);
  assert.match(layout, /Ajay Varada — AI\/ML & Software Engineer/);
  assert.match(layout, /Former Micron software engineer/);
});
