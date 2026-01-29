<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class StaffOnly
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $role = auth()->user()->role;

        // ✅ allow BOTH admin and staff
        if (!in_array($role, ['admin', 'staff'])) {
            abort(403, 'Staff only.');
        }

        return $next($request);
    }
}
