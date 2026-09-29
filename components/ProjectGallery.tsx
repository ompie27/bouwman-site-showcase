"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { categorieen, projecten, type Categorie } from "@/lib/data";

/** Filterbare projectgalerij. Nieuwe projecten toevoegen = lib/data.ts aanvullen. */
export default function ProjectGallery() {
  const [filter, setFilter] = useState<Categorie | "Alle">("Alle");

  const zichtbaar =
    filter === "Alle" ? projecten : projecten.filter((p) => p.categorie === filter);

  return (
    <div>
      {/* Filters */}
      <div
        role="group"
        aria-label="Filter projecten op categorie"
        className="mb-10 flex flex-wrap gap-2"
      >
        {(["Alle", ...categorieen] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              filter === cat
                ? "border-accent bg-accent text-white"
                : "border-line bg-white text-ink hover:border-accent hover:text-accent-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {zichtbaar.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {zichtbaar.length === 0 && (
        <p className="text-ink-soft">Nog geen projecten in deze categorie.</p>
      )}
    </div>
  );
}
