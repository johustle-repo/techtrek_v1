import { Head, Link } from '@inertiajs/react';

// 1. Define the type of data we expect from the database
interface Attraction {
    id: number;
    name: string;
    category: string;
    description: string;
    image_url: string;
    rating: number;
    location: string;
}

export default function Show({ attraction }: { attraction: Attraction }) {
    return (
        <>
            <Head title={attraction.name} />

            <div className="min-h-screen bg-gray-50 dark:bg-black font-sans text-gray-800 dark:text-gray-200">
                {/* --- NAVIGATION BAR --- */}
                <header className="bg-blue-600 px-6 py-4 shadow-md dark:bg-blue-900/50">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <Link href="/" className="text-xl font-extrabold text-white leading-none">
                            TechTrek <span className="text-blue-200">Labrador</span>
                        </Link>
                        <Link href="/" className="text-sm font-medium text-white hover:text-blue-200">
                            &larr; Back to Home
                        </Link>
                    </div>
                </header>

                <main className="mx-auto max-w-5xl py-10 px-6">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-zinc-900">
                        
                        {/* 2. HERO IMAGE SECTION */}
                        <div className="relative h-64 md:h-96 w-full">
                            <img 
                                src={attraction.image_url} 
                                alt={attraction.name} 
                                className="h-full w-full object-cover"
                            />
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="mb-2 inline-block rounded-md bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                    {attraction.category}
                                </span>
                                <h1 className="text-4xl font-bold">{attraction.name}</h1>
                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
                                    <span>📍 {attraction.location}</span>
                                    <span>•</span>
                                    <span className="text-yellow-400">★ {attraction.rating} / 5.0</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. CONTENT & DESCRIPTION */}
                        <div className="grid gap-8 p-8 md:grid-cols-3">
                            {/* Left Column: Main Info */}
                            <div className="md:col-span-2">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">About this Destination</h2>
                                <p className="leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                    {attraction.description}
                                </p>
                                
                                <h3 className="mt-8 mb-4 text-xl font-bold text-gray-900 dark:text-white">Highlights</h3>
                                <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-400">
                                    <li>Beautiful scenery and photo opportunities.</li>
                                    <li>Perfect for friends and family gatherings.</li>
                                    <li>Accessible location.</li>
                                </ul>
                            </div>

                            {/* Right Column: Sidebar / Action Buttons */}
                            <div className="md:col-span-1">
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 dark:border-zinc-700 dark:bg-zinc-800">
                                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Plan your visit</h3>
                                    <p className="mb-6 text-sm text-gray-500">
                                        Open daily. Entrance fees may vary.
                                    </p>
                                    
                                    <button className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 mb-3">
                                        Get Directions 🗺️
                                    </button>
                                    
                                    <button className="w-full rounded-lg border border-gray-300 bg-white py-3 font-bold text-gray-700 transition hover:bg-gray-100 dark:border-zinc-600 dark:bg-transparent dark:text-gray-300 dark:hover:bg-zinc-700">
                                        Write a Review ✍️
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}