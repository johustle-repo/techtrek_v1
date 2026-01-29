<?php

namespace Database\Seeders;

use App\Models\Attraction;
use Illuminate\Database\Seeder;

class AttractionSeeder extends Seeder
{
    public function run(): void
    {
        $attractions = [
            [
                'name' => 'Tobuan Beach',
                'slug' => 'tobuan-beach',
                'category' => 'Beach',
                'description' => 'Experience the serene beauty of Tobuan Beach. Known for its fine grayish sand and calm waters, it is the perfect getaway for families looking to relax. The beach offers a stunning view of the sunset and is home to local fisherfolk, providing fresh seafood daily.',
                'image_url' => 'https://placehold.co/600x400/2563eb/FFF?text=Tobuan+Beach',
                'location' => 'Brgy. Tobuan, Labrador',
                'rating' => 4.8,
            ],
            [
                'name' => 'Layac Cave',
                'slug' => 'layac-cave',
                'category' => 'Adventure',
                'description' => 'A hidden gem for thrill-seekers, Layac Cave features stunning rock formations and a cool, refreshing atmosphere inside. Ideally visited with a local guide.',
                'image_url' => 'https://placehold.co/600x400/16a34a/FFF?text=Layac+Cave',
                'location' => 'Brgy. Layac, Labrador',
                'rating' => 4.5,
            ],
            [
                'name' => 'Labrador Town Plaza',
                'slug' => 'labrador-plaza',
                'category' => 'Heritage',
                'description' => 'The heart of the municipality. A clean, well-lit park perfect for evening strolls, featuring the municipal hall and historical markers.',
                'image_url' => 'https://placehold.co/600x400/ea580c/FFF?text=Town+Plaza',
                'location' => 'Poblacion, Labrador',
                'rating' => 4.2,
            ],
        ];

        foreach ($attractions as $spot) {
            Attraction::create($spot);
        }
    }
}