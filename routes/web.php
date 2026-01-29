<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// --- Controllers ---
use App\Http\Controllers\AttractionController;
use App\Http\Controllers\AdminAttractionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\BusinessController;
use App\Http\Controllers\Admin\EventController as AdminEventController;

// ✅ Staff Controllers
use App\Http\Controllers\Staff\AttractionController as StaffAttractionController;
use App\Http\Controllers\Staff\BusinessController as StaffBusinessController;
use App\Http\Controllers\Staff\EventController as StaffEventController; 

// --- Models ---
use App\Models\Attraction;
use App\Models\Business;
use App\Models\User;
use App\Models\Event;

/*
|--------------------------------------------------------------------------
| Public Routes (Guest Access)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $attractions = Attraction::take(3)->get();
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'attractions' => $attractions,
    ]);
})->name('home');

Route::get('/destinations', [AttractionController::class, 'index'])->name('destinations.index');
Route::get('/attraction/{id}', [AttractionController::class, 'show'])->name('attractions.show');

/*
|--------------------------------------------------------------------------
| Protected Routes (Requires Auth + Verified)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    | Dashboard Central Dispatcher
    | Dito nagpapasya ang system kung anong view ang ipapakita base sa role.
    */
    Route::get('/dashboard', function () {
        $user = Auth::user();

        // 🎒 1. Visitor Dashboard Logic
        if ($user && $user->role === 'user') {
            return Inertia::render('visitor/dashboard', [
                'featuredAttractions' => Attraction::latest()->take(3)->get(),
                'upcomingEvents'      => Event::where('start_date', '>=', now())
                                            ->orderBy('start_date', 'asc')
                                            ->take(4)->get(),
            ]);
        }

        // 🛠️ 2. Admin & Staff Stats Logic
        $stats = [
            'attractions_total' => Attraction::count(),
            'businesses_total'  => Business::count(),
            'events_total'      => Event::count(),
            'businesses_open'   => Business::where('status', 'open')->count(),
            'businesses_closed' => Business::where('status', 'closed')->count(),
        ];

        if ($user && $user->role === 'admin') {
            $stats['users_total']  = User::count();
            $stats['admins_total'] = User::where('role', 'admin')->count();
            $stats['staff_total']  = User::where('role', 'staff')->count();
        }

        // Recent Activity Stream
        $recentAttractions = Attraction::select('id', 'name', 'created_at')->latest()->take(5)->get()
            ->map(fn ($a) => ['type' => 'Attraction', 'label' => $a->name, 'date' => $a->created_at, 'url' => "/admin/attractions/{$a->id}/edit"]);

        $recentBusinesses = Business::select('id', 'name', 'created_at')->latest()->take(5)->get()
            ->map(fn ($b) => ['type' => 'Business', 'label' => $b->name, 'date' => $b->created_at, 'url' => "/admin/businesses/{$b->id}/edit"]);

        $recentEvents = Event::select('id', 'title', 'created_at')->latest()->take(5)->get()
            ->map(fn ($e) => ['type' => 'Event', 'label' => $e->title, 'date' => $e->created_at, 'url' => "/admin/events/{$e->id}/edit"]);

        $recentUsers = collect();
        if ($user && $user->role === 'admin') {
            $recentUsers = User::select('id', 'name', 'created_at')->latest()->take(5)->get()
                ->map(fn ($u) => ['type' => 'User', 'label' => $u->name, 'date' => $u->created_at, 'url' => "/admin/users/{$u->id}/edit"]);
        }

        $recentActivities = $recentAttractions->merge($recentBusinesses)->merge($recentEvents)->merge($recentUsers)->sortByDesc('date')->values()->take(10);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
        ]);
    })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Visitor Only Routes (/user/...)
    |--------------------------------------------------------------------------
    */
    Route::middleware(['visitor'])->prefix('user')->group(function () {
        // Path: /user/spot/attraction/{id}
        Route::get('/spot/attraction/{id}', [AttractionController::class, 'show'])->name('user.attractions.show');
        
        // Placeholder for future features (Itinerary, Bookings)
        Route::get('/itinerary', function() { return Inertia::render('visitor/itinerary'); })->name('user.itinerary');
        Route::get('/bookings', function() { return Inertia::render('visitor/bookings'); })->name('user.bookings');
        Route::get('/payments', function() { return Inertia::render('visitor/payments'); })->name('user.payments');
        Route::get('/recent-visits', function() { return Inertia::render('visitor/recent-visits'); })->name('user.recent-visits');
    });

    /*
    |--------------------------------------------------------------------------
    | Staff Only Routes (/staff/...)
    |--------------------------------------------------------------------------
    */
    Route::middleware(['staff'])->prefix('staff')->group(function () {
        Route::get('/dashboard', function () {
            $stats = [
                'attractions_total' => Attraction::count(),
                'businesses_total'  => Business::count(),
                'events_total'      => Event::count(),
                'businesses_open'   => Business::where('status', 'open')->count(),
                'businesses_closed' => Business::where('status', 'closed')->count(),
            ];
            return Inertia::render('staff/dashboard', ['stats' => $stats]);
        })->name('staff.dashboard');

        Route::resource('attractions', StaffAttractionController::class)->names('staff.attractions');
        Route::resource('businesses', StaffBusinessController::class)->names('staff.businesses');
        Route::resource('events', StaffEventController::class)->names('staff.events');
        Route::get('/fees', function () { return Inertia::render('staff/fees'); })->name('staff.fees');
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Only Routes (/admin/...)
    |--------------------------------------------------------------------------
    */
    Route::middleware(['admin'])->prefix('admin')->group(function () {
        Route::resource('users', UserController::class)->names('admin.users');
        Route::resource('attractions', AdminAttractionController::class)->names('admin.attractions');
        Route::resource('businesses', BusinessController::class)->names('admin.businesses');
        Route::resource('events', AdminEventController::class)->names('admin.events');
    });

});

// Settings & Profile
require __DIR__ . '/settings.php';