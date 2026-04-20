export default function SectionCard({ children, className = "" }) {
  return <section className={["app-card p-6", className].join(" ").trim()}>{children}</section>;
}
