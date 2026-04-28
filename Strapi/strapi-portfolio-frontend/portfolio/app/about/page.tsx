// app/about/page.tsx

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

async function getAboutData() {
  const url = STRAPI_URL + "/api/about?populate[blocks][populate]=*";
  
  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}

export default async function AboutPage() {
  const response = await getAboutData();

  const BASE_URL = STRAPI_URL;
  
  // Destrutturazione tipizzata degli attributi
  const title = response?.data?.title;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  const blocks = response?.data?.blocks;


  return (
    <main className="bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 p-6">{title}</h1>      
      
      {blocks?.map((section: any) => {
        switch (section.__component) {
          case "shared.media":
            return (
                <section key={`${section.__component}-${section.id}`} className="flex items-center justify-center gap-8 p-10 bg-black text-white">
                  <div className="mt-8 border-l-4 border-blue-600 pl-6">
                      <h2 className="text-xl md:text-2xl text-gray-200 italic leading-relaxed">{section.Titolo}</h2>
                  </div>
                  <div className="relative w-full max-w-[500px] aspect-square lg:aspect-auto overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/20">
                    {section.ImmagineSfondo?.formats.medium ? (
                      <img src={`${BASE_URL}${section.ImmagineSfondo?.formats?.medium?.url}`} className="w-full h-full object-cover object-top" alt="Hero" />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-gray-500">Nessuna immagine</div>
                    )}
                  </div>
                  
                </section>
            );
            case "shared.rich-text":
            return (
              <section key={`${section.__component}-${section.id}`} className="flex items-center justify-center p-10 bg-black text-white">
                <div className="w-full max-w-3xl">
                    {section.Bio ? (
                      <p className="text-gray-300 leading-relaxed">{section.Bio}</p>
                    ) : (
                      <div className="text-gray-500">Nessun testo</div>
                    )}
                  </div>
              </section>
            );
            
        }
      })}

    </main>
  );
}
