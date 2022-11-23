<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class BackupDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'none backup:db {username} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'creating a backup db for the application';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $username = $this->argument('username') ? env('DB_USERNAME') : $this->argument('username');

        $password = $this->argument('password') ? env('DB_PASSWORD') : $this->argument('password');

        $dbName = env('DB_DATABASE');

        $extention = storage_path('app/public/backup/');

        $fileName = $extention . env('APP_NAME').'-' . Carbon::now()->format('d-m-Y');

        $command = 'mysqldump -e -f -u'. $username .' -p ' .$password.' '. $dbName. ' > ' .$fileName.'.sql';

        exec($command);
    }
}
