<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class InvoiceExport implements FromView
{
    public $order ;
    public $myView ;
    public function __construct($myView, $order) {
        $this->myView = $myView;
        $this->order = $order;
    }
    public function view(): View
    {
        return view('');
    }
}
