'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'all';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all') {
      router.push('/projects');
    } else {
      router.push(`/projects?filter=${value}`);
    }
  };

  return (
    <div className="relative inline-block w-full md:w-64">
      <select
        value={currentFilter}
        onChange={handleChange}
        className="w-full bg-zinc-900 text-white border border-zinc-800 rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition-all"
      >
        <option value="all">Tutte le categorie</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {/* Iconcina freccia personalizzata */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
