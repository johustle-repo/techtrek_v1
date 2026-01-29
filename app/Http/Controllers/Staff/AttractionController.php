<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Attraction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AttractionController extends Controller
{
    public function index()
    {
        return Inertia::render('staff/attractions/index', [
            'attractions' => Attraction::orderByDesc('created_at')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('staff/attractions/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'category'    => 'required|string|max:100',
            'location'    => 'required|string|max:255',
            'image_url'   => 'nullable|url',
            'rating'      => 'nullable|numeric|min:1|max:5',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Attraction::create($validated);

        return redirect()
            ->to('/staff/attractions')
            ->with('success', 'Attraction created successfully.');
    }

    public function edit($id)
    {
        $attraction = Attraction::findOrFail($id);

        return Inertia::render('admin/attractions/edit', [
            'attraction' => $attraction,
        ]);
    }

    public function update(Request $request, $id)
    {
        $attraction = Attraction::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'category'    => 'required|string|max:100',
            'location'    => 'required|string|max:255',
            'image_url'   => 'nullable|url',
            'rating'      => 'nullable|numeric|min:1|max:5',
        ]);

        if ($validated['name'] !== $attraction->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $attraction->update($validated);

        return redirect()
            ->to('/staff/attractions')
            ->with('success', 'Attraction updated successfully.');
    }

    public function destroy($id)
    {
        $attraction = Attraction::findOrFail($id);

        $attraction->delete(); // ✅ soft delete if SoftDeletes is enabled

        return redirect()
            ->to('/staff/attractions')
            ->with('success', 'Attraction archived successfully.');
    }
}
