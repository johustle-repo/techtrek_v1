<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttractionController extends Controller
{
    /**
     * Show the main "All Destinations" page with Search & Filter
     */
    public function index(Request $request)
    {
        // Start a query for Attractions
        $query = Attraction::query();

        // 1. If there is a Search term, filter by name or description
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 2. If there is a Category selected, filter by category
        if ($request->filled('category') && $request->input('category') !== 'All') {
            $query->where('category', $request->input('category'));
        }

        // Get the results (paginate them so we don't load 1000 at once)
        $attractions = $query->latest()->paginate(9)->withQueryString();

        return Inertia::render('destinations', [
            'attractions' => $attractions,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    /**
     * Show a single attraction details
     */
    public function show($id)
    {
        $attraction = Attraction::findOrFail($id);
        
        return Inertia::render('attraction-details', [
            'attraction' => $attraction
        ]);
    }
}