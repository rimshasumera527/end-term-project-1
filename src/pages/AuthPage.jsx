import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { appCopy } from "../content/copy";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

const initialAuth = {
  name: "",
  email: "",
  password: "",
};

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState(initialAuth);
  const [submitting, setSubmitting] = useState(false);
  const { signin, signup, authError, authNotice, clearAuthError, clearAuthNotice } = useAuth();

  const destination = location.state?.from || "/dashboard";

  function updateField(key, value) {
    clearAuthError();
    clearAuthNotice();
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      let result;
      if (mode === "signin") {
        result = await signin({ email: form.email, password: form.password });
      } else {
        result = await signup({ name: form.name, email: form.email, password: form.password });
      }

      if (result?.requiresEmailConfirmation) {
        setMode("signin");
        return;
      }

      navigate(destination, { replace: true });
    } catch {
      // Context already stores error message.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1.05fr)_420px]">
        <section className="bg-slate-950 p-8 text-white md:p-10">
          <div className="app-kicker border-slate-700 bg-slate-900 text-slate-300">{appCopy.auth.panelKicker}</div>
          <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            {appCopy.auth.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">{appCopy.auth.intro}</p>
          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-base font-semibold">{appCopy.auth.demoTitle}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{appCopy.auth.demoText}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-base font-semibold">{appCopy.auth.supabaseTitle}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{appCopy.auth.supabaseText}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{appCopy.auth.confirmationNotice}</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="secondary" className="mt-8">
              {appCopy.auth.backHome}
            </Button>
          </Link>
        </section>

        <section className="p-8 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="app-eyebrow">
                {mode === "signin" ? appCopy.auth.modes.signin.eyebrow : appCopy.auth.modes.signup.eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                {mode === "signin" ? appCopy.auth.modes.signin.title : appCopy.auth.modes.signup.title}
              </h2>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                clearAuthError();
                clearAuthNotice();
                setMode((current) => (current === "signin" ? "signup" : "signin"));
              }}
            >
                {mode === "signin"
                  ? appCopy.auth.modes.signin.switchLabel
                  : appCopy.auth.modes.signup.switchLabel}
            </Button>
          </div>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <div>
                <label className="app-label">{appCopy.auth.labels.name}</label>
                <input
                  className="app-input"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={appCopy.auth.placeholders.name}
                />
              </div>
            ) : null}

            <div>
              <label className="app-label">{appCopy.auth.labels.email}</label>
              <input
                className="app-input"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                type="email"
              />
            </div>

            <div>
              <label className="app-label">{appCopy.auth.labels.password}</label>
              <input
                className="app-input"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                type="password"
              />
            </div>

            {authError ? <p className="text-sm font-medium text-rose-600">{authError}</p> : null}
            {authNotice ? <p className="text-sm font-medium text-emerald-600">{authNotice}</p> : null}

            <Button type="submit" fullWidth>
              {submitting
                ? appCopy.auth.submitting
                : mode === "signin"
                  ? appCopy.auth.modes.signin.submit
                  : appCopy.auth.modes.signup.submit}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
