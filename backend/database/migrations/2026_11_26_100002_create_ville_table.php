<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ville', function (Blueprint $table) {
            $table->id();
            $table->foreignId('region_id')->constrained('region');
            $table->string('nom', 100);
            $table->unique(['region_id', 'nom']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ville');
    }
};
