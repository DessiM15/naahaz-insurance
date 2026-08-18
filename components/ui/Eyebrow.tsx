export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-4 text-eyebrow font-medium uppercase text-gold-400 ${className}`}>
      <span className="h-px w-10 shrink-0 bg-gold-500" aria-hidden />
      {children}
    </p>
  );
}
