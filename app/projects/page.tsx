// app/projects/page.tsx
import ProjectCard from "@/components/layout/projectCard";
import CategoryFilter from "@/components/layout/categoryFilter";
import { Suspense } from "react";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

async function getProjects() {
  const res = await fetch(`${STRAPI_URL}/api/projects?populate=*`, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const projects = await getProjects();
  const { filter } = await searchParams;

  // 1. Raggruppamento dinamico
  const groupedProjects = projects.reduce((acc: any, project: any) => {
    const category = project.types?.[0]?.Tipo || "Altro";
    if (!acc[category]) acc[category] = [];
    acc[category].push(project);
    return acc;
  }, {});

  const allCategories = Object.keys(groupedProjects).sort();

  // 2. Filtriamo le categorie da mostrare
  const categoriesToShow = filter && filter !== "all" 
    ? allCategories.filter(cat => cat === filter)
    : allCategories;

  return (
    <main className="min-h-screen bg-zinc-950 p-8 lg:p-20 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <h1 className="text-3xl font-bold border-l-4 border-blue-600 pl-4">
            Portfolio Progetti
          </h1>
          
          {/* Componente Select per il filtro */}
          <Suspense fallback={null}>
            <CategoryFilter categories={allCategories} />
          </Suspense>
        </div>

        {categoriesToShow.length > 0 ? (
          categoriesToShow.map((cat) => (
            <section key={cat} className="mb-20">
              <div className="flex items-center mb-10">
                <h2 className="text-xl font-mono uppercase tracking-widest text-blue-500">
                  {cat}
                </h2>
                <div className="h-px bg-zinc-800 flex-grow ml-6"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedProjects[cat].map((project: any) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-zinc-500 italic">Nessun progetto trovato per questa categoria.</p>
        )}
      </div>
    </main>
  );
}