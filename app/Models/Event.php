<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'description', 
        'start_date', 'end_date', 'location', 'image_url'
    ];
    
    // Helper to format date easily later
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];
}