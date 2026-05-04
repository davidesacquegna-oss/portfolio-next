import ContactForm from "@/components/contactForm";

async function getLogo() {
  const res = await fetch("http://localhost:1337/api/logo?populate=*");
  const json = await res.json();
  return json.data?.SiteLogo?.url || null;
}

export default async function ContattiPage() {
  const logoUrl = await getLogo();

  return (
    <main className="min-h-screen bg-black p-8 lg:p-20 text-white">
      <h1 className="text-3xl font-bold mb-6">Contattaci</h1>
      <p className="text-gray-600 mb-8">
        Hai domande o vuoi collaborare? Compila il modulo qui sotto e ti risponderemo al più presto.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {/* Sezione Form */}
        <section className="md:col-span-2">
          <ContactForm />
        </section>

        {/* Sezione Info Extra (opzionale) */}
        <section className="md:col-span-1 bg-gray-50 p-6 rounded-lg border">
          <h2 className="font-semibold mb-4 text-gray-900">I nostri recapiti</h2>
          <ul className="space-y-4 text-gray-700">
            <li>📍 Bologna, Italia</li>
            <li>📧 info@webvisionario.it</li>
            <li>📞 +39 051 123456</li>
          </ul>
          {logoUrl && (
            <div className="mt-6 flex justify-center">
              <img src={`http://localhost:1337${logoUrl}`} alt="Logo" className="w-full max-w-xs h-auto" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}