<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Attraction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttractionController extends Controller
{
    /**
     * Ipakita ang lahat ng destinations (Explore Page).
     */
    public function index()
    {
        return Inertia::render('visitor/destinations/index', [
            'attractions' => Attraction::select('id', 'name', 'location', 'image_url', 'rating')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Ipakita ang detalyadong view ng isang specific spot.
     * Path: /user/spot/attraction/{id}
     */
    public function show($id)
    {
        $attraction = Attraction::findOrFail($id);

        // Nagdadagdag ng "Other Places" para sa mas magandang discoverability.
        $related = Attraction::where('id', '!=', $id)->take(3)->get();

        return Inertia::render('visitor/spots/show', [
            'attraction' => $attraction,
            'related'    => $related,
        ]);
    }
}