<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // $this->call([
        //     AttractionSeeder::class,
        // ]);

        // Use firstOrCreate to prevent the "Duplicate" error in the future
        User::firstOrCreate(
            ['email' => 'superadmin@gmail.com'], // Check this email
            [
                'name' => 'Super Admin',
                'password' => bcrypt('SuperAdmin-123'), // <--- CRITICAL: Encrypt the password!
                'email_verified_at' => now(),
                'role' => 'admin', // Assign the 'admin' role
            ]
        );
    }
}