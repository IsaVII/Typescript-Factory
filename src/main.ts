import "./style.css";
import { basicTypes } from "./lessons/01-basic-types";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find #app in index.html");
}

app.innerHTML = `
  <main class="mx-auto max-w-3xl px-4 py-16">
    <p class="text-sm text-amber-400">${basicTypes.level}</p>
    <h1 class="text-4xl font-bold text-slate-50">${basicTypes.title}</h1>
    <p class="mt-4 text-slate-400">${basicTypes.summary}</p>
    <p class="mt-2 text-slate-500">${basicTypes.blocks.length} blocks</p>
  </main>
`;
