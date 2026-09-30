import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold text-slate-50">
        404: this machine doesn't exist
      </h1>
      <Link to="/" className="text-amber-400 hover:underline">
        Back to the factory floor
      </Link>
    </div>
  );
}
