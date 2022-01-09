type LogoProps = {
  className?: string;
};

export default function AlchemyLogo({ className }: LogoProps) {
  const baseClasses =
    "relative uppercase text-black font-semibold text-base font-plex tracking-[.3125em]";
  const cssClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return <div className={cssClasses}>Alchemy</div>;
}
