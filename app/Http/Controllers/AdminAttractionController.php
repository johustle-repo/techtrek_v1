<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminAttractionController extends Controller
{
    public function index()
    {
        $attractions = Attraction::latest()->get();
        return Inertia::render('admin/attractions/index', [
            'attractions' => $attractions
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/attractions/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'category'    => 'required|string',
            'location'    => 'required|string',
            'image_url'   => 'required|url',
            'rating'      => 'required|numeric|min:1|max:5',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Attraction::create($validated);

        return redirect()
            ->route('admin.attractions.index')
            ->with('success', 'Attraction created successfully.');
    }

    // --- FIX FOR 404: Ensure this method exists ---
    public function edit($id)
    {
        $attraction = Attraction::findOrFail($id);
        
        // This loads resources/js/pages/admin/attractions/edit.tsx
        return Inertia::render('admin/attractions/edit', [
            'attraction' => $attraction
        ]);
    }

    public function update(Request $request, $id)
    {
        $attraction = Attraction::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'location' => 'required|string',
            'image_url' => 'required|url',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        if ($attraction->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $attraction->update($validated);

        return redirect()->to('/admin/attractions');
    }

    public function destroy($id)
    {
        $attraction = Attraction::findOrFail($id);
        $attraction->delete();
        return redirect()->back();
    }
}