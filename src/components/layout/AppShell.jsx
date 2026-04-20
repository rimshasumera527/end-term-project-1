import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children, title, subtitle, action, search, setSearch }) {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="grid gap-6">
          <Header
            title={title}
            subtitle={subtitle}
            action={action}
            search={search}
            setSearch={setSearch}
          />
          {children}
        </main>
      </div>
    </div>
  );
}
