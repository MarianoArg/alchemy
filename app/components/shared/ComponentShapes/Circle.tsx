export default function CircleShape({ className }: { className?: string }) {
  const baseClasses = "";
  const cssClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <svg viewBox="0 0 100 100" className={cssClasses}>
      <ellipse cx="50" cy="50" rx="50" ry="50"></ellipse>
    </svg>
  );
}
