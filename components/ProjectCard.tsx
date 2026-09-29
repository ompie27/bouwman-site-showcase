import Image from "next/image";
import BeforeAfter from "@/components/BeforeAfter";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      {project.voorNa ? (
        <BeforeAfter
          voor={project.voorNa.voor}
          na={project.voorNa.na}
          alt={`${project.titel} in ${project.plaats}`}
        />
      ) : (
        <div className="relative aspect-4/3">
          <Image
            src={project.image}
            alt={`${project.titel} — tegelwerk door Bouw MAN in ${project.plaats}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-dark">
          <span>{project.categorie}</span>
          <span aria-hidden="true" className="text-line">
            •
          </span>
          <span className="text-ink-soft">{project.plaats}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold">{project.titel}</h3>
        <p className="mt-2 text-sm text-ink-soft">{project.beschrijving}</p>
      </div>
    </article>
  );
}
