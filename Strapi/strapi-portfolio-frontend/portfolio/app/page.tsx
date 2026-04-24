export const dynamic = 'force-dynamic';

async function getHomepageData() {
  // URL specifico per Strapi 5 che apre SiteContent e i suoi componenti
  const url = "http://127.0.0.1:1337/api/homepage?populate[SiteContent][populate]=*";
  
  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const response = await getHomepageData();
  const BASE_URL = "http://127.0.0.1:1337";

  // In Strapi 5, i dati sono spesso direttamente in response.data senza .attributes
  const siteContent = response?.data?.SiteContent;

  if (!siteContent) {
    return (
      <div className="p-20 bg-black text-white">
        <h1 className="text-red-500">Dati non ricevuti</h1>
        <p>Controlla che su Strapi la Homepage sia stata <strong>PUBBLICATA</strong> (tasto Publish).</p>
        <details className="mt-5 text-xs text-gray-500">
          <summary>Vedi JSON grezzo</summary>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </details>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white">
      {siteContent.map((section: any) => {
        switch (section.__component) {
            case "shared.hero":
                const BASE_URL = "http://127.0.0.1:1337";
                
                return (
                  <section key={section.id} className="min-h-screen flex items-center justify-center p-10 lg:p-24 bg-black text-white">
                    {/* Contenitore Grid/Flex per affiancare i contenuti */}
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      
                      {/* COLONNA SINISTRA: Testi e Pulsanti */}
                      <div className="z-10">
                        <span className="text-blue-500 font-mono tracking-tighter text-sm uppercase">
                          {section.Photo_Tag}
                        </span>
                        
                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mt-4">
                          {section.TItolo}
                        </h1>
                        
                        <h2 className="text-2xl md:text-3xl text-gray-400 font-light mt-2">
                          {section.Sottotitolo}
                        </h2>
              
                        {/* Area Claim + Immagine (se vuoi affiancarli proprio l'uno all'altro) */}
                        <div className="mt-8 border-l-4 border-blue-600 pl-6">
                          <p className="text-xl md:text-2xl text-gray-200 italic leading-relaxed">
                            {section.Claim}
                          </p>
                        </div>
              
                        <div className="flex flex-wrap gap-4 mt-10">
                          {section.Call_to_Action?.map((cta: any, i: number) => (
                            <a key={i} href={cta.URL} className="px-8 py-3 bg-blue-600 rounded-full font-bold uppercase text-sm">
                              {cta.Text}
                            </a>
                          ))}
                          {section.CTA_2 && (
                            <a href={section.CTA_2.URL} className="px-8 py-3 border border-white rounded-full font-bold uppercase text-sm">
                              {section.CTA_2.Text}
                            </a>
                          )}
                        </div>
                      </div>
              
                      {/* COLONNA DESTRA: L'Immagine (Ex Sfondo) */}
                      <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/20">
                        {section.ImmagineSfondo && section.ImmagineSfondo.length > 0 ? (
                          <img 
                            src={`${BASE_URL}${section.ImmagineSfondo[0].url}`}
                            className="w-full h-full object-cover"
                            alt="Hero Image"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-gray-500">
                            Nessuna immagine caricata
                          </div>
                        )}
                      </div>
              
                    </div>
                  </section>
                );

          case "shared.tech-stack":
            return (
              <section key={section.id} className="p-20 bg-zinc-900 border-t border-white/10 text-center">
                <h2 className="text-4xl font-bold mb-4">{section.Titolo_Sezione}</h2>
                <div className="inline-block px-6 py-2 bg-blue-500 rounded-full font-bold">
                  {section.Skills}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}