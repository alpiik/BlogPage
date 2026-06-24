<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Railway (and most PaaS hosts) terminate TLS at their edge proxy and
        // forward requests to the app over plain HTTP. Without this, Laravel
        // thinks every request is insecure and generates http:// URLs for
        // assets/links, which the browser then blocks as mixed content on a
        // page actually served over https://.
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
