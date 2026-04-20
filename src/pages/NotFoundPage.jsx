import { Link } from "react-router-dom";
import { appCopy } from "../content/copy";
import Button from "../components/common/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6">
      <div className="app-card w-full max-w-xl p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
          {appCopy.brand.shortName}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">{appCopy.notFound.title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">{appCopy.notFound.message}</p>
        <Link to="/">
          <Button className="mt-6">{appCopy.notFound.action}</Button>
        </Link>
      </div>
    </div>
  );
}
