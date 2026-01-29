<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attractions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique(); // For URLs like /attraction/tobuan-beach
            $table->string('category');       // e.g., 'Beach', 'Cave', 'Heritage'
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->string('location');
            $table->decimal('rating', 3, 1)->default(0); // e.g., 4.5
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attractions');
    }
};
