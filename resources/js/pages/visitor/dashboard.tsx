import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Calendar, Star, ArrowRight, Compass, CloudSun } from 'lucide-react';

interface Attraction {
    id: number;
    name: string;
    location: string;
    image_url: string;
    rating: string;
}

interface Event {
    id: number;
    title: string;
    start_date: string;
    location: string;
}

export default function UserDashboard({ 
    featuredAttractions, 
    upcomingEvents 
}: { 
    featuredAttractions: Attraction[], 
    upcomingEvents: Event[] 
}) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Explore Labrador', href: '/dashboard' }]}>
            <Head title="Explore Labrador" />

            <div className="w-full bg-[#f8fafc]">
                
                {/* 1. Full-Width Edge-to-Edge Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920" 
                        className="absolute inset-0 h-full w-full object-cover"
                        alt="Labrador Coastline"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    <div className="relative mx-auto h-full max-w-7xl px-6 flex flex-col justify-center text-white">
                        <div className="flex items-center space-x-2 mb-4">
                            <Compass className="h-5 w-5 text-blue-400 animate-pulse" />
                            <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Official Tourism Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">
                            Malyari!
                        </h1>
                        <p className="mt-4 text-lg md:text-xl font-medium text-blue-100 max-w-lg italic">
                            Experience the warmth and beauty of Labrador, Pangasinan.
                        </p>
                        
                        {/* Responsive Hero Button */}
                        <div className="mt-8">
                            <button className="w-full md:w-max px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg transition-all uppercase tracking-widest text-sm shadow-lg active:scale-95">
                                Start Your Adventure
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Main Content */}
                <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
                    
                    <div className="grid gap-12 lg:grid-cols-3">
                        
                        {/* Featured Spots Section */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Must-Visit Spots</h2>
                                    <p className="text-slate-500 font-medium mt-1">Discover what makes Labrador unique.</p>
                                </div>
                                <Link href="/destinations" className="group flex items-center text-sm font-black text-blue-600 uppercase tracking-tighter">
                                    View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                                </Link>
                            </div>
                            
                            <div className="grid gap-8 sm:grid-cols-2">
                                {featuredAttractions.map((place) => (
                                    <div key={place.id} className="group flex flex-col rounded-xl bg-white shadow-lg border border-slate-100 overflow-hidden">
                                        <div className="relative h-60 overflow-hidden">
                                            <img src={place.image_url} alt={place.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-md text-xs font-black text-amber-600 flex items-center shadow-sm">
                                                <Star className="mr-1 h-3 w-3 fill-current" /> {place.rating}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-extrabold text-slate-900">{place.name}</h3>
                                            <div className="mt-2 flex items-center text-sm text-slate-500 font-bold mb-6">
                                                <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                                                {place.location}
                                            </div>
                                            
                                            {/* Responsive Card Button - Pushes to bottom */}
                                            <Link 
                                                href="route('user.attractions.show', { id: place.id })"
                                                className="mt-auto w-full px-4 py-3 bg-slate-900 text-white text-xs font-black rounded-lg hover:bg-blue-600 transition-colors uppercase tracking-widest text-center active:scale-95"
                                            >
                                                Explore Spot
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Events Sidebar */}
                        <aside className="space-y-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Calendar</h2>
                            
                            <div className="space-y-4">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow">
                                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                                            <span className="text-[10px] font-black uppercase tracking-tighter">
                                                {new Date(event.start_date).toLocaleString('default', { month: 'short' })}
                                            </span>
                                            <span className="text-xl font-black leading-none">
                                                {new Date(event.start_date).getDate()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-black text-slate-900 truncate">{event.title}</h3>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 italic">{event.location}</p>
                                        </div>
                                        <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                                            <ArrowRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Responsive Promotional Card Button */}
                            <div className="rounded-xl bg-slate-900 p-8 text-white shadow-2xl relative overflow-hidden">
                                <h4 className="text-lg font-black mb-2">Need a Guide?</h4>
                                <p className="text-xs text-slate-400 mb-6 leading-relaxed">Let our smart system help you plan your itinerary.</p>
                                <button className="w-full py-4 bg-white text-slate-900 text-xs font-black rounded-lg hover:bg-blue-50 transition-all uppercase tracking-widest active:scale-95">
                                    Plan My Trip
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}