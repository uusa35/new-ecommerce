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

class CategoriesExport implements  FromQuery, WithMapping, WithHeadings, WithEvents, ShouldAutoSize
{
    public $elements;

    public function __construct($elements)
    {
        $this->elements = $elements;
    }

    public function headings(): array
    {
        return [
            '#', //0
            'name_ar', //1
            'name_en', //2
            'description_ar', //3
            'description_en', // 4
            'parent_id',  // 5
            'order', // 6
            'is_parent', // 7
            'image', // 8

        ];
    }

    public function map($element): array
    {
        return [
            $element->id,
            $element->name_ar,
            $element->name_en,
            $element->description_ar,
            $element->description_en,
            $element->parent_id ? $element->parent_id : 0,
            $element->order,
            $element->is_parent ? 1 : 0,
            $element->image,
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
