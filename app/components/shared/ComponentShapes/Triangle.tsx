export default function TriangleShape({ className }: { className?: string }) {
  const baseClasses = "";
  const cssClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <svg viewBox="0 0 100 100" className={cssClasses}>
      <polygon points="50 15, 100 100, 0 100" />
    </svg>
  );
}
