// components/contactForm.tsx
'use client';

export default function ContactForm() {
  async function handleSubmit(formData: FormData) {
    const payload = {
      data: {
        nome_cognome: formData.get('nome_cognome'),
        email: formData.get('email'),
        messaggio: formData.get('messaggio'),
      }
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) alert("Messaggio inviato con successo!");
    } catch (error) {
      console.error("Errore nell'invio", error);
    }
  }
  console.log("Variabile URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
  return (
    <form action={handleSubmit} className="flex flex-col gap-4 max-w-md">
  <div>
    <label htmlFor="nome_cognome" className="block mb-1">Nome e Cognome</label>
    <input 
      type="text" 
      id="nome_cognome"
      name="nome_cognome" // <--- Importante: deve corrispondere a quello che cerchi nel handleSubmit
      placeholder="Mario Rossi"
      required 
      className="w-full border border-gray-600 bg-zinc-900 p-2 rounded text-white placeholder:text-gray-500"
    />
  </div>

  <div>
    <label htmlFor="email" className="block mb-1">Email</label>
    <input 
      type="email" 
      id="email"
      name="email" 
      placeholder="mario@esempio.it"
      required 
      className="w-full border border-gray-600 bg-zinc-900 p-2 rounded text-white placeholder:text-gray-500"
    />
  </div>

  <div>
    <label htmlFor="messaggio" className="block mb-1">Messaggio</label>
    <textarea 
      id="messaggio"
      name="messaggio" 
      placeholder="Scrivi qui il tuo messaggio..."
      required 
      rows={4}
      className="w-full border border-gray-600 bg-zinc-900 p-2 rounded text-white placeholder:text-gray-500"
    />
  </div>

  <button 
    type="submit" 
    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition"
  >
    Invia Messaggio
  </button>
</form>
  );
}