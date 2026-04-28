// app/projects/page.tsx
import Link from "next/link";

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
            <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl"
            >
              {/* Contenitore Immagine (Card Top) */}
              <div className="relative aspect-video overflow-hidden bg-zinc-800">
                {project.Screenshot && project.Screenshot[0] ? (
                  <img 
                    src={`${STRAPI_URL}${project.Screenshot[0].url}`} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-600">No Image</div>
                )}
                {/* Badge opzionale per il tipo (se presente) */}
                {project.types?.[0] && (
                  <span className="absolute top-3 right-3 bg-blue-600 text-[10px] uppercase font-bold px-2 py-1 rounded">
                    {project.types[0].Tipo}
                  </span>
                )}
              </div>

              {/* Contenuto Testuale (Card Body) */}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                
                {/* Short Description: limitata a 3 righe per mantenere le card allineate */}
                <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                  {project.ShortDescription || "Esplora i dettagli di questo progetto."}
                </p>
                
                <div className="mt-4 flex items-center text-blue-500 text-xs font-bold uppercase tracking-wider">
                  Vedi Progetto 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}