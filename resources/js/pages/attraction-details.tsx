import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface Attraction {
  id: number;
  name: string;
  category: string;
  image_url: string;
  rating: number | string;
  description: string;
  location: string;
}

export default function AttractionDetails({ attraction }: { attraction: Attraction }) {
  usePage<SharedData>().props;

  const [imgError, setImgError] = useState(false);

  const rating =
    attraction.rating !== null && attraction.rating !== undefined && attraction.rating !== ''
      ? Number(attraction.rating)
      : null;

  // ✅ Normalize image URL (Laravel-friendly)
  const imageSrc = useMemo(() => {
    const raw = (attraction.image_url || '').trim();
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith('/')) return raw;
    if (raw.startsWith('storage/')) return `/${raw}`;
    return `/${raw}`;
  }, [attraction.image_url]);

  const mapsQuery = encodeURIComponent(`${attraction.name} ${attraction.location}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: attraction.name,
          text: `${attraction.name} — ${attraction.location}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied!');
      }
    } catch {
      alert('Unable to share link.');
    }
  };

  // ✅ ONE place to control image height (uniform across all pages)
  // If still big, lower these values.
  const IMG_H = 'h-[120px] sm:h-[140px] lg:h-[160px]';

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Head title={attraction.name} />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            TechTrek <span className="text-blue-600 dark:text-blue-400">Labrador</span>
          </Link>

          <Link
            href="/destinations"
            className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* ✅ IMAGE PREVIEW (container-wrapped + uniform height) */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className={`overflow-hidden rounded-2xl ${IMG_H}`}>
            {!imgError && imageSrc ? (
              <img
                src={imageSrc}
                alt={attraction.name}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  No image available
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT */}
          <section className="lg:col-span-8 space-y-6">
            {/* TITLE */}
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {attraction.category}
              </span>

              <h1 className="mt-2 text-3xl font-extrabold">{attraction.name}</h1>

              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                📍 {attraction.location}
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">
                  {rating !== null && Number.isFinite(rating) ? rating.toFixed(1) : 'N/A'}
                </span>
              </div>
            </div>

            {/* ABOUT */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-bold mb-3">About this place</h2>

              <p className="text-zinc-700 leading-relaxed dark:text-zinc-300 whitespace-pre-line">
                {attraction.description}
              </p>

              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Highlights
                </h3>

                <div className="flex flex-wrap gap-2">
                  {['Scenic Views', 'Photography', 'Nature Trails', 'Family Friendly'].map(
                    (item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold dark:border-zinc-800 dark:bg-zinc-950"
                      >
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-lg font-bold mb-4">Plan your visit</h3>

                <div className="space-y-3">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-xl bg-blue-600 py-3 text-center font-bold text-white hover:bg-blue-700 transition"
                  >
                    Get Directions
                  </a>

                  <button
                    onClick={handleShare}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-3 font-semibold hover:bg-zinc-50 transition dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                  >
                    Share
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
                  Open daily. Free entry.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
