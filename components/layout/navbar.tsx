import Link from 'next/link';

const Navbar = ({ data, logo }: { data: string; logo: string | null }) => {
  console.log("data:", data);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {logo && (
            <img className="h-16" src={`http://localhost:1337${logo}`} alt="Logo" />
          )}
          {/* Links di navigazione */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              Chi Siamo
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 transition">
              Progetti
            </Link>
            <Link href="/contatti" className="text-gray-700 hover:text-blue-600 transition">
              Contatti
            </Link>
          </div>

          {/* Bottone Call to Action */}
          <div className="flex items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
              Inizia Ora
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
