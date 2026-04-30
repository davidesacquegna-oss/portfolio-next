import Link from 'next/link';

const Footer = ({ logo }: { logo: string | null }) => {

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="h-full flex items-center">
              <img src={`http://localhost:1337${logo}`} className="h-16 w-auto" alt="" />
            </Link>
          </div>

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

        </div>
      </div>
    </nav>
  );
};

export default Footer;