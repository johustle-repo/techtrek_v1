<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BusinessController extends Controller
{
    public function index()
    {
        return Inertia::render('staff/businesses/index', [
            'businesses' => Business::orderByDesc('created_at')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('staff/businesses/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'category'       => 'required|string|max:100',
            'description'    => 'required|string',
            'address'        => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:50',
            'image_url'      => 'nullable|url',
            'status'         => 'required|in:open,closed',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Business::create($validated);

        return redirect()
            ->to('/staff/businesses')
            ->with('success', 'Business created successfully.');
    }

    public function edit($id)
    {
        $business = Business::findOrFail($id);

        return Inertia::render('staff/businesses/edit', [
            'business' => $business,
        ]);
    }

    public function update(Request $request, $id)
    {
        $business = Business::findOrFail($id);

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'category'       => 'required|string|max:100',
            'description'    => 'required|string',
            'address'        => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:50',
            'image_url'      => 'nullable|url',
            'status'         => 'required|in:open,closed',
        ]);

        if ($validated['name'] !== $business->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $business->update($validated);

        return redirect()
            ->to('/staff/businesses')
            ->with('success', 'Business updated successfully.');
    }

    public function destroy($id)
    {
        $business = Business::findOrFail($id);

        $business->delete(); // ✅ soft delete if SoftDeletes is enabled

        return redirect()
            ->to('/staff/businesses')
            ->with('success', 'Business archived successfully.');
    }
}
