import type { SharedData } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Attraction {
    id: number;
    name: string;
    category: string;
    image_url: string;
    rating: number;
    description: string;
}

interface Props {
    attractions: {
        data: Attraction[];
        links: any[];
    };
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Destinations({ attractions, filters }: Props) {
    const { auth } = usePage<SharedData>().props;

    // Use Inertia's form helper to handle the search filters
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        category: filters.category || 'All',
    });

    // Handle Search Submit
    const handleSearch: FormEventHandler = (e) => {
        e.preventDefault();
        get('/destinations', { preserveState: true });
    };

    // Handle Category Click
    const selectCategory = (category: string) => {
        setData('category', category);
        router.get('/destinations', 
            { search: data.search, category: category }, 
            { preserveState: true }
        );
    };

    const categories = ['All', 'Beach', 'Falls', 'Mountain', 'Cave', 'Historical'];

    return (
        <div className="min-h-screen bg-white text-gray-800 dark:bg-black dark:text-gray-200 font-sans">
            <Head title="All Destinations" />

            {/* --- NAVBAR --- */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        TechTrek <span className="text-blue-600">Labrador</span>
                    </Link>
                    <nav className="flex gap-4">
                        <Link href="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
                        <Link href="/destinations" className="text-sm font-medium text-blue-600">Destinations</Link>
                        {auth.user ? (
                            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600">Dashboard</Link>
                        ) : (
                            <Link href="/login" className="text-sm font-medium hover:text-blue-600">Log in</Link>
                        )}
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Explore Labrador
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Find your next adventure from our curated list of local gems.
                    </p>
                </div>

                {/* --- FILTERS SECTION --- */}
                <div className="mb-12 flex flex-col items-center gap-6">
                    
                    {/* Search Bar (FLEXBOX FIX) */}
                    <form 
                        onSubmit={handleSearch} 
                        className="flex w-full max-w-lg items-center rounded-full border border-gray-300 bg-white p-1 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                    >
                        <input
                            type="text"
                            placeholder="Search for places..."
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            // Input is now completely transparent and borderless inside the parent
                            className="flex-1 border-none bg-transparent px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        />
                        <button 
                            type="submit"
                            className="flex-shrink-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-500 transition"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => selectCategory(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                    data.category === cat
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- RESULTS GRID --- */}
                {attractions.data.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {attractions.data.map((spot) => (
                            <div key={spot.id} className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900">
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={spot.image_url} 
                                        alt={spot.name} 
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110" 
                                    />
                                    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm backdrop-blur-sm">
                                        ★ {spot.rating}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-2 inline-block rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                                        {spot.category}
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                        {spot.name}
                                    </h3>
                                    <p className="mb-6 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                                        {spot.description}
                                    </p>
                                    <Link 
                                        href={`/attraction/${spot.id}`} 
                                        className="block w-full rounded-xl border border-gray-200 bg-transparent py-3 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-50 hover:border-gray-300 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-xl text-gray-500">No destinations found.</p>
                        <button 
                            onClick={() => selectCategory('All')}
                            className="mt-4 text-blue-600 hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}