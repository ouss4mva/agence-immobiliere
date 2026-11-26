<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->enum('civilite', ['M', 'MME']);
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->date('date_naissance');
            $table->string('email', 150)->unique();
            $table->string('telephone', 20);
            $table->string('adresse', 255);
            $table->string('code_postal', 10)->nullable();
            $table->string('ville', 100);
            $table->string('pays', 100)->default('Maroc');
            $table->string('password');
            $table->enum('role', ['CLIENT', 'ADMIN'])->default('CLIENT');
            $table->timestamp('accepte_conditions_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
