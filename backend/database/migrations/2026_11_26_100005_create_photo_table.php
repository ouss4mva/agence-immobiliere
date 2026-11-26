<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bien_id')->constrained('bien')->cascadeOnDelete();
            $table->string('url', 500); // chemin du fichier (storage/biens/...)
            $table->boolean('est_principale')->default(false);
            $table->unsignedSmallInteger('ordre')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photo');
    }
};
