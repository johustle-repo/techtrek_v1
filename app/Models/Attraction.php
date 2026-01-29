<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    /** @use HasFactory<\Database\Factories\AttractionFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'description',
        'image_url',
        'location',
        'rating',
    ];

    public function reviews() {
        return $this->hasMany(Review::class);
    }
}
