<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/events/index', [
            'events' => Event::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'start_date' => 'required|date',
            'location' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        $validated['slug'] = Str::slug($request->title) . '-' . time();

        if ($request->hasFile('image')) {
            $validated['image_url'] = $request->file('image')->store('events', 'public');
        }

        Event::create($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    public function edit(Event $event)
    {
        return Inertia::render('admin/events/edit', [
            'event' => $event
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required',
            'start_date'  => 'required|date',
            'location'    => 'required|string',
            'image_url'   => 'nullable|url', // Using URL based on your Edit.tsx example
        ]);

        // Regenerate slug if title changes
        if ($event->title !== $request->title) {
            $validated['slug'] = Str::slug($request->title) . '-' . time();
        }

        $event->update($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event updated successfully.');
    }
}