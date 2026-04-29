// components/ContactForm.tsx
'use client';

export default function ContactForm() {
  async function handleSubmit(formData: FormData) {
    // Trasformiamo i dati per Strapi
    const data = {
      data: {
        nome: formData.get('nome'),
        email: formData.get('email'),
        messaggio: formData.get('messaggio'),
      }
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Messaggio salvato su Strapi!");
    }
  }

  return (
    <form action={handleSubmit}> 
      {/* ... i tuoi campi ... */}
    </form>
  );
}