<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bien', function (Blueprint $table) {
            $table->id();
            $table->string('titre', 200);
            $table->text('description')->nullable();
            $table->foreignId('type_bien_id')->constrained('type_bien');
            $table->foreignId('ville_id')->constrained('ville');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('adresse', 255)->nullable();
            $table->decimal('surface_m2', 8, 2)->nullable();
            $table->unsignedTinyInteger('nb_chambres')->nullable();
            $table->unsignedTinyInteger('nb_salles_bain')->nullable();

            // Un bien est soit en VENTE, soit en LOCATION, jamais les deux
            $table->enum('type_operation', ['VENTE', 'LOCATION']);
            $table->enum('duree_location', ['LONG_TERME', 'COURT_TERME'])->nullable();
            $table->decimal('prix', 12, 2);
            $table->enum('unite_prix', ['NUIT', 'SEMAINE', 'MOIS'])->nullable();

            $table->enum('statut', ['DISPONIBLE', 'RESERVE', 'VENDU', 'LOUE'])->default('DISPONIBLE');
            $table->boolean('est_vedette')->default(false);
            $table->timestamps();

            $table->index(['type_operation', 'statut']);
        });

        // Cohérence vente / location (MySQL 8.0.16+)
        DB::statement('ALTER TABLE bien ADD CONSTRAINT chk_bien_prix CHECK (prix > 0)');
        DB::statement("ALTER TABLE bien ADD CONSTRAINT chk_bien_operation CHECK (
            (type_operation = 'VENTE' AND duree_location IS NULL AND unite_prix IS NULL)
            OR
            (type_operation = 'LOCATION' AND duree_location IS NOT NULL AND unite_prix IS NOT NULL)
        )");
    }

    public function down(): void
    {
        Schema::dropIfExists('bien');
    }
};
