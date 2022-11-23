<?php

namespace App\Exports;

use App\Http\Resources\ProductExtraLightResource;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;

//ShouldAutoSize
class OrdersExport implements FromQuery, WithMapping, WithHeadings, WithEvents
{
    public $elements;

    public function __construct($elements)
    {
        $this->elements = $elements;
    }

    public function headings(): array
    {
        return [
            '#',
            'status',
            'paid',
            'price',
            'shipment_fees',
            'discount',
            'net_price',
            'email',
            'mobile',
            'address',
            'payment_method',
            'reference_id',
        ];
    }

    public function map($element): array
    {
        return [
            $element->id,
            $element->status,
            $element->paid ? 'Y' : 'N',
            (float)$element->price,
            (float)$element->shipment_fees,
            (float)$element->discount,
            (float)$element->net_price,
            (string)$element->email,
            $element->mobile,
            $element->address,
            $element->payment_method,
            (string)$element->reference_id,
        ];
    }

    public function query()
    {
        return $this->elements;
    }

    public function columnWidths(): array
    {
        return [
            'B' => 25,
            'C' => 25,
            'D' => 25,
            'E' => 25,
            'F' => 25,
            'G' => 25,
            'H' => 25,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getDelegate()->getPageSetup()->setOrientation(PageSetup::ORIENTATION_LANDSCAPE);
            }
        ];
    }
}
