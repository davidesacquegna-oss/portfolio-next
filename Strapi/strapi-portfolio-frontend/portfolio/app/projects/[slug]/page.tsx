// app/projects/page.tsx
import Link from "next/link";
import Project from "@/components/layout/projectCard";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

async function getProject(slug:string) {
  const res = await fetch(`${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`, { cache: "no-store" });
  const json = await res.json();
  return json.data?.[0] ?? null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)
  return (<main className="min-h-screen bg-black p-8 lg:p-20 text-white">
   <div  className="flex flex-col md:flex-row gap-12 items-start">
              {/* Contenitore Immagine (Card Top) */}
              <div className="relative md:w-2/3 aspect-video overflow-hidden bg-zinc-800">
                {project.Screenshot && project.Screenshot[0] ? (
                  <img 
                    src={`${STRAPI_URL}${project.Screenshot[0].formats?.large?.url ?? project.Screenshot[0].url}`}
                    alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
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
              <div className="w-full md:w-1/3">
                <h1 className="text-xxl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h1>
                
                {/* Short Description: limitata a 3 righe per mantenere le card allineate */}
                <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                  {project.Description || "Esplora i dettagli di questo progetto."}
                </p>
                
              </div>
      </div>
   
    </main>)
}