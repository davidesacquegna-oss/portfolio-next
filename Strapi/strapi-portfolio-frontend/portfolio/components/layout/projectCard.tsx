import Link from 'next/link';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
              
const Project = ({ project }: { project: any }) => {


  return (<Link
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
  )
  };

export default Project;