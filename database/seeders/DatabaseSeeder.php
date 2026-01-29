<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ✅ Gagamit ng updateOrCreate para hindi mag-error kung existing na ang email
        
        // 🛡️ Admin Account
        User::updateOrCreate(
            ['email' => 'admin@techtrek.com'], // Ito ang titingnan kung existing na
            [
                'name' => 'Admin User',
                'password' => Hash::make('Password-123'),
                'role' => 'admin',
            ]
        );

        // 🛠️ Staff Account
        User::updateOrCreate(
            ['email' => 'staff@techtrek.com'],
            [
                'name' => 'Labrador Staff',
                'password' => Hash::make('Password-123'),
                'role' => 'staff',
            ]
        );

        // ✅ Tatawagin ang iyong AttractionSeeder
        $this->call([
            AttractionSeeder::class,
        ]);
    }
}