import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find #app in index.html");
}

app.innerHTML = `
  <main class="mx-auto max-w-3xl px-4 py-16">
    <h1 class="text-4xl font-bold text-amber-400">TypeScript Factory 🏭</h1>
    <p class="mt-4 text-slate-400">The factory is running.</p>
  </main>
`;
