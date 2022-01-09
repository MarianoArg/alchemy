export default function SquareShape({ className }: { className?: string }) {
  const baseClasses = "";
  const cssClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <svg viewBox="0 0 100 100" className={cssClasses}>
      <rect width="100%" height="100%" />
    </svg>
  );
}
