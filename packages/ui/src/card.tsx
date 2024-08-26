export function Card({
  className,
  title,
  children,

}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href?: string;
}): JSX.Element {
  return (
    <a
      className={className}
     
    >
      <h2 className="underline font-semibold">
        {title} <span>-&gt;</span>
      </h2>
      <div>{children}</div>
    </a>
  );
}
