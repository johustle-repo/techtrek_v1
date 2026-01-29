<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserOnly
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Only allow the 'user' role
        if (Auth::user()->role !== 'user') {
            abort(403, 'This area is for travelers only.');
        }

        return $next($request);
    }
}