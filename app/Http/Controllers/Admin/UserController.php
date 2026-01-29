<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/users/index', [
            'users' => User::select('id', 'name', 'email', 'role', 'created_at')
                ->orderByDesc('created_at')
                ->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', 'in:user,staff,admin'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
            'email_verified_at' => now(), // optional
        ]);

        return redirect()->route('admin.users.index')->with('success', 'User created.');
    }

    public function edit($id)
    {
        $user = User::select('id', 'name', 'email', 'role')->findOrFail($id);

        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Prevent admin from demoting themselves
        if (
            $request->user()->id === $user->id &&
            $request->has('role') &&
            $request->input('role') !== 'admin'
        ) {
            return back()->withErrors([
                'role' => 'You cannot remove your own admin role.',
            ]);
        }

        $validated = $request->validate([
            'role' => ['required', 'in:user,staff,admin'],
        ]);

        $user->role = $validated['role'];
        $user->save();

        return back()->with('success', 'User updated.');
    }

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Prevent deleting self
        if ($request->user()->id === $user->id) {
            return back()->withErrors([
                'delete' => 'You cannot delete your own account.',
            ]);
        }

        $user->delete();

        return back()->with('success', 'User deleted.');
    }
}
