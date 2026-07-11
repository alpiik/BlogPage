<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateGuestUser extends Command
{
    protected $signature = 'guest:create';

    protected $description = 'Create the shared guest account used for the "Sign in as guest" button';

    public function handle(): int
    {
        $existing = User::where('email', 'guest@guest.internal')->first();

        if ($existing) {
            $this->info('Guest user already exists (id: ' . $existing->id . ').');
            return self::SUCCESS;
        }

        $user = new User();
        $user->name = 'Guest';
        $user->email = 'guest@guest.internal';
        $user->password = bcrypt(Str::random(64)); // nobody knows this password
        $user->is_guest = true;
        $user->save();

        $this->info('Guest user created (id: ' . $user->id . ').');
        return self::SUCCESS;
    }
}
