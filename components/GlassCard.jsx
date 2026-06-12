export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`border border-white/20 bg-white/12 shadow-bronze backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
