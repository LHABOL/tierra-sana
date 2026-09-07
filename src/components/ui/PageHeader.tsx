
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-olive pb-16 pt-36 text-ivory md:pb-24 md:pt-44">
      <div className="shell relative">
        <p className="eyebrow !text-ivory/60">{eyebrow}</p>
        <h1 className="display mt-4">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
