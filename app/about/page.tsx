// app/about/page.tsx

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

async function getAboutData() {
  const url = STRAPI_URL + "/api/about?populate[blocks][populate]=*";
  
  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    return json.data; // Restituiamo i dati della pagina
  } catch (error) {
    console.error("Errore fetch About:", error);
    return null;
  }
}

export default async function AboutPage() {
  const data = await getAboutData();
  
  if (!data) return <div className="p-10 text-white">Caricamento in corso o errore...</div>;

  // 1. Prendiamo il titolo dinamico da Strapi
  const pageTitle = data.title; 
  
  const blocks = data.blocks || [];

  // 2. Estraiamo i blocchi necessari
  const mediaBlock = blocks.find((b: any) => b.__component === "shared.media");
  const textBlock = blocks.find((b: any) => b.__component === "shared.rich-text");

  return (
    <main className="min-h-screen bg-black p-8 lg:p-20 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* TITOLO DINAMICO DA STRAPI */}
        <h1 className="text-3xl font-bold mb-12 border-l-4 border-blue-600 pl-4 uppercase tracking-tight">
          {pageTitle}
        </h1>

        {/* Layout Split: Immagine a sinistra, Testo a destra */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Colonna Sinistra: Immagine */}
          <div className="w-full md:w-1/2">
            {mediaBlock?.ImmagineSfondo ? (
              <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-blue-500/10">
                <img 
                  src={`${STRAPI_URL}${mediaBlock.ImmagineSfondo.url}`} 
                  alt={pageTitle}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-600 italic">
                Nessun media caricato
              </div>
            )}
          </div>

          {/* Colonna Destra: Testo e Bio */}
          <div className="w-full md:w-1/2">
            {/* Titolo del blocco media (se presente) */}
            {mediaBlock?.Titolo && (
              <h2 className="text-xl md:text-2xl text-gray-200 italic leading-relaxed mb-6">
                {mediaBlock.Titolo}
              </h2>
            )}
            
            {/* Testo della Bio */}
            <div className="text-zinc-400 text-lg leading-relaxed whitespace-pre-line">
              {textBlock?.Bio || "Inserisci il testo della biografia su Strapi"}
            </div>
            <div className="w-full">
              {mediaBlock?.logo_animation ? (
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-blue-500/10">
                  <video 
                    className="w-full h-auto object-cover" 
                    controls
                    preload="metadata"
                  >
                    <source src={`${STRAPI_URL}${mediaBlock.logo_animation.url}`} type="video/mp4" />
                    Il tuo browser non supporta il tag video.                    
                  </video>
                </div>
              ) : (
                <div className="w-full aspect-square bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-600 italic">
                  Nessun media caricato
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}