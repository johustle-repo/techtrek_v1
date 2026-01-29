<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 🛡️ Gagawa ng Admin Account
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@techtrek.com',
            'password' => Hash::make('Password-123'), // Palitan mo ito sa production
            'role' => 'admin',
        ]);

        // 🛠️ Gagawa ng Staff Account
        User::create([
            'name' => 'Labrador Staff',
            'email' => 'staff@techtrek.com',
            'password' => Hash::make('Password-123'),
            'role' => 'staff',
        ]);
    }
}