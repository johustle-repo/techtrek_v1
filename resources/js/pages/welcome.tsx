import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// 1. Define the interface for the database data
interface Attraction {
    id: number;
    name: string;
    category: string;
    image_url: string;
    rating: number;
    description: string;
}

export default function Welcome({
    canRegister = true,
    attractions,
}: {
    canRegister?: boolean;
    attractions: Attraction[];
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to Labrador" />
            
            <div className="min-h-screen bg-white text-gray-800 dark:bg-black dark:text-gray-200 font-sans selection:bg-blue-500 selection:text-white">
                
                {/* --- HERO SECTION --- */}
                <div className="relative h-[80vh] w-full overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img 
                            src="https://sandee.com/_next/image?url=%09https%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNokIZiP7_BqPf6MquryFAlVWm0zFEYayObYtXQ%3Ds1600-k-no&w=3840&q=75" 
                            alt="Labrador Pangasinan Coast" 
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20"></div>
                    </div>

                    {/* Navbar */}
                    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6 lg:px-12">
                        <div className="text-2xl font-extrabold text-white tracking-tight leading-none">
                            TechTrek <span className="text-blue-400">Labrador</span>
                        </div>
                        
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    // FIX 1: Use direct string '/dashboard'
                                    href="/dashboard"
                                    className="rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        // FIX 2: Use direct string '/login'
                                        href="/login"
                                        method="post"
                                        className="text-sm font-semibold text-white transition hover:text-blue-300"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            // FIX 3: Use direct string '/register'
                                            href="/register"
                                            method="post"
                                            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 shadow-lg"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Hero Content */}
                    <div className="relative z-10 flex h-full flex-col justify-center px-6 lg:px-12">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl drop-shadow-sm">
                                Discover the <br />
                                <span className="text-blue-400">Hidden Gems</span>
                            </h1>
                            <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                                Experience nature's beauty in Labrador, Pangasinan. From pristine beaches to historic caves, let TechTrek be your smart guide.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <button className="rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition transform hover:scale-105 hover:bg-blue-500">
                                    Start Exploring
                                </button>
                                <button className="rounded-full bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition hover:bg-white/20">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FEATURED SECTION (DYNAMIC) --- */}
                <main className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-zinc-900">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Top Rated Destinations</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Explore the most visited spots in our municipality.</p>
                        </div>
                        
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {attractions.map((spot) => (
                                <div key={spot.id} className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-800">
                                    
                                    {/* Card Image */}
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

                                    {/* Card Content */}
                                    <div className="p-6">
                                        <div className="mb-2 inline-block rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                                            {spot.category}
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                            {spot.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
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
                    </div>
                </main>

                <footer className="bg-white py-12 text-center text-sm text-gray-500 border-t border-gray-100 dark:bg-black dark:border-zinc-800 dark:text-gray-400">
                    <p>TechTrek Labrador &copy; 2026. Promoting local tourism in Pangasinan.</p>
                </footer>
            </div>
        </>
    );
}