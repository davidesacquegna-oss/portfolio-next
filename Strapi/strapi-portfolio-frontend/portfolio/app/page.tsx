export const dynamic = 'force-dynamic';

import { Terminal, Brain, Database, Code, Quote } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  terminal: <Terminal size={32} />,
  psychology: <Brain size={32} />, 
  database: <Database size={32} />,
  code: <Code size={32} />,
};

const bgMap: { [key: string]: string } = {
  dark_green: "bg-emerald-900/20 border-emerald-500/30",
  dark_blue: "bg-blue-900/20 border-blue-500/30",
  default: "bg-zinc-900 border-white/10"
}; // <--- AGGIUNTA QUESTA

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

async function getHomepageData() {
  // Questo URL chiede TUTTO quello che c'è in SiteContent, 
  // a prescindere da come si chiamano i componenti.
  const url = STRAPI_URL + "/api/homepage?populate[SiteContent][populate]=*";
  
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

  const BASE_URL = STRAPI_URL;

  const siteContent = response?.data?.SiteContent;
console.log("CONTENUTO RICEVUTO:", JSON.stringify(siteContent, null, 2));
  if (!siteContent) {
    return (
      <div className="p-20 bg-black text-white">
        <h1 className="text-red-500">Dati non ricevuti</h1>
        <details className="mt-5 text-xs text-gray-500">
          <summary>Vedi JSON grezzo</summary>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </details>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white">
      {siteContent.map((section: any, i:number) => {
        switch (section.__component) {
          case "shared.hero":
            return (
              <section key={i} className="flex items-center justify-center p-10 lg:p-24 bg-black text-white">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="z-10">
                    <span className="text-blue-500 font-mono tracking-tighter text-sm uppercase">{section.Photo_Tag}</span>
                    <h1 className="text-[10vw] md:text-[5vw] xl:text-[3.5vw] font-black uppercase leading-none mt-4">{section.TItolo}</h1>
                    <h2 className="text-2xl md:text-3xl text-gray-400 font-light mt-2">{section.Sottotitolo}</h2>
                    <div className="mt-8 border-l-4 border-blue-600 pl-6">
                      <p className="text-xl md:text-2xl text-gray-200 italic leading-relaxed">{section.Claim}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-10">
                      {section.Call_to_Action?.map((cta: any, i: number) => (
                        <a key={i} href={cta.URL} className="px-8 py-3 bg-blue-600 rounded-full font-bold uppercase text-sm">{cta.Text}</a>
                      ))}
                      {section.CTA_2 && (
                      <a href={section.CTA_2.URL} className="px-8 py-3 border border-white rounded-full font-bold uppercase text-sm">
                        {section.CTA_2.Text}
                      </a>
                    )}
                    </div>
                    
                  </div>
                  <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/20">
                    {section.ImmagineSfondo?.[0] ? (
                      <img src={`${BASE_URL}${section.ImmagineSfondo[0].url}`} className="w-full h-full object-cover" alt="Hero" />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-gray-500">Nessuna immagine</div>
                    )}
                  </div>
                </div>
              </section>
            );

          case "shared.about-section":
            return (
              <section key={section.id} className="py-24 px-6 md:px-20 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div>
                      <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">{section.Titolo}</h2>
                      <div className="text-lg text-gray-400 leading-relaxed max-w-xl">{section.Bio}</div>
                    </div>
                    <div className="flex flex-col justify-center space-y-6 border-l border-white/10 pl-8">
                      {section.Quote_1 && (
                        <div className="italic text-xl text-gray-300 relative">
                          <Quote className="absolute -left-6 -top-2 opacity-20" size={16} />"{section.Quote_1}"
                        </div>
                      )}
                    </div>
                     <div className="flex flex-col justify-center space-y-6 border-l border-white/10 pl-8">
                      {section.Quote_2 && (
                        <div className="italic text-xl text-gray-300 relative">
                          <Quote className="absolute -left-6 -top-2 opacity-20" size={16} />"{section.Quote_2}"
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {section.Role_Card?.map((card: any, index: number) => {
                      const backgroundClass = bgMap[card.Card_Background] || bgMap.default;
                      return (
                        <div key={index} className={`p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${backgroundClass}`}>
                          <div className="text-blue-500 mb-6">{iconMap[card.Role_Icon] || <Code size={32} />}</div>
                          <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">{card.Role_Title}</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">{card.Role_Text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );

          case "shared.tech-stack":
            return (
              <section key={section.id} className="py-24 px-10 bg-zinc-900 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-black uppercase mb-16">{section.Titolo_Sezione}</h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {section.Skills_Array?.map((skill: string, index: number) => (
                      <div key={index} className="w-32 h-32 md:w-40 md:h-40 bg-black border border-white/10 rounded-xl flex items-center justify-center p-4 hover:border-blue-500 transition-all group">
                        <span className="text-xs md:text-sm font-bold uppercase group-hover:text-blue-400">{skill}</span>
                      </div>
                    ))}
                  </div>
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