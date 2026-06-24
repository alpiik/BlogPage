<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'user:make-admin {email}';

    /**
     * The console command description.
     */
    protected $description = 'Grant admin (moderation) privileges to a user by email';

    public function handle(): int
    {
        $user = User::whereRaw('LOWER(email) = ?', [strtolower($this->argument('email'))])->first();

        if (! $user) {
            $this->error("No user found with email: {$this->argument('email')}");
            return self::FAILURE;
        }

        $user->is_admin = true;
        $user->save();

        $this->info("{$user->name} ({$user->email}) is now an admin.");
        return self::SUCCESS;
    }
}
