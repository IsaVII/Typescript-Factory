import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
} from "@tanstack/react-router";
import { LessonView } from "./components/LessonView";
import { findLesson } from "./lessons";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

// The layout shared by every page. <Outlet /> is where the current page appears.
const rootRoute = createRootRoute({
  component: () => (
    <>
      <header className="border-b border-slate-800">
        <nav className="mx-auto max-w-5xl px-4 py-4">
          <Link
            to="/"
            className="font-semibold text-slate-100 hover:text-amber-400"
          >
            🏭 TypeScript Factory
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <Outlet />
      </main>
    </>
  ),
  notFoundComponent: NotFoundPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lesson/$slug",
  loader: ({ params }) => {
    const lesson = findLesson(params.slug);
    if (!lesson) throw notFound();
    return lesson;
  },
  component: function LessonPage() {
    const lesson = lessonRoute.useLoaderData();
    return <LessonView lesson={lesson} />;
  },
});

const routeTree = rootRoute.addChildren([homeRoute, lessonRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
