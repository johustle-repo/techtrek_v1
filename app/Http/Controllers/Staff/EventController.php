<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('staff/events/index', [
            'events' => Event::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('staff/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'location' => 'required',
            'start_date' => 'required|date',
        ]);

        $validated['slug'] = Str::slug($request->title) . '-' . time();
        Event::create($validated);

        return redirect()->route('staff.events.index')->with('success', 'Event Created.');
    }

    public function edit($id)
    {
        $event = Event::findOrFail($id);
        return Inertia::render('staff/events/edit', ['event' => $event]);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $validated = $request->validate(['title' => 'required', 'description' => 'required']);
        $event->update($validated);

        return redirect()->route('staff.events.index')->with('success', 'Event Updated.');
    }
}