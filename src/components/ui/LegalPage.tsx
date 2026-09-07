import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />
      <article className="relative isolate shell py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">
          Última actualización: {updated}
        </p>
        <div className="mt-12 max-w-2xl space-y-12">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.04}>
              <h2 className="font-serif text-xl">{s.heading}</h2>
              {s.body.map((p, j) => (
                <p
                  key={j}
                  className="mt-3 text-sm leading-relaxed text-stone"
                >
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
        <p className="mt-16 max-w-2xl text-xs leading-relaxed text-stone">
          Este documento es una plantilla base y debe revisarse con asesoría
          legal antes de la publicación definitiva del sitio.
        </p>
      </article>
    </>
  );
}
