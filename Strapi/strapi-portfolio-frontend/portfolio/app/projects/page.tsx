// app/projects/page.tsx
import Link from "next/link";
import ProjectCard from "@/components/layout/projectCard";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

async function getProjects() {
  const res = await fetch(`${STRAPI_URL}/api/projects?populate=*`, { cache: "no-store" });
  const json = await res.json();
  return json.data || [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-zinc-950 p-8 lg:p-20 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 border-l-4 border-blue-600 pl-4">
          Progetti Selezionati
        </h1>
        
        {/* Griglia: 1 colonna su mobile, 2 su tablet, 3 su desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}