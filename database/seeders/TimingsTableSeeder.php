<?php
namespace Database\Seeders;
use App\Models\Timing;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TimingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        $day1 = Carbon::createFromDate('2019','02','03','Europe/London');
//        $day2 = Carbon::createFromDate('2019','02','04','Europe/London');
//        $day3 = Carbon::createFromDate('2019','02','05','Europe/London');
//        $day4 = Carbon::createFromDate('2019','02','06','Europe/London');
//        $day5 = Carbon::createFromDate('2019','02','07','Europe/London');
//        $day6 = Carbon::createFromDate('2019','02','08','Europe/London'); // friday
//        $day7 = Carbon::createFromDate('2019','02','09','Europe/London'); // sat
//
//        $timings_one = [
//            [
//                $day1->format('l'),
//                "8:00",
//                "13:00"
//            ],
//            [
//                $day1->format('l'),
//                "14:30",
//                "19:00"
//            ],
//            [
//                $day2->format('l'),
//                "8:00",
//                "13:00"
//            ],
//            [
//                $day2->format('l'),
//                "14:30",
//                "19:00"
//            ],
//            [
//                $day3->format('l'),
//                "8:00",
//                "13:00"
//            ],
//            [
//                $day3->format('l'),
//                "14:30",
//                "19:00"
//            ],
//            [
//                $day4->format('l'),
//                "8:00",
//                "13:00"
//            ],
//            [
//                $day4->format('l'),
//                "14:30",
//                "19:00"
//            ],
//            [
//                $day5->format('l'),
//                "8:00",
//                "13:00"
//            ],
//            [
//                $day5->format('l'),
//                "14:30",
//                "19:00"
//            ],
//            [
//                $day7->format('l'),
//                "8:00",
//                "13:00"
//            ],
//            [
//                $day7->format('l'),
//                "14:30",
//                "19:00"
//            ]
//        ];
//        $timings_tow = [
//            [
//                $day1->format('l'),
//                "7:00",
//                "13:00"
//            ],
//            [
//                $day1->format('l'),
//                "14:30",
//                "20:00"
//            ],
//            [
//                $day2->format('l'),
//                "7:00",
//                "13:00"
//            ],
//            [
//                $day2->format('l'),
//                "14:30",
//                "20:00"
//            ],
//            [
//                $day3->format('l'),
//                "7:00",
//                "13:00"
//            ],
//            [
//                $day3->format('l'),
//                "14:30",
//                "20:00"
//            ],
//            [
//                $day4->format('l'),
//                "7:00",
//                "13:00"
//            ],
//            [
//                $day4->format('l'),
//                "14:30",
//                "20:00"
//            ],
//            [
//                $day5->format('l'),
//                "7:00",
//                "13:00"
//            ],
//            [
//                $day5->format('l'),
//                "14:30",
//                "20:00"
//            ],
//        ];
//        foreach($timings_one as $t) {
//            factory(Timing::class)->create([
//                'day' => $t[0],
//                'start' => Carbon::parse($t[1])->toTimeString(),
//                'end' => Carbon::parse($t[2])->toTimeString(),
//            ]);
//        }
//        foreach($timings_tow as $t) {
//            factory(Timing::class)->create([
//                'day' => $t[0],
//                'start' => Carbon::parse($t[1])->toTimeString(),
//                'end' => Carbon::parse($t[2])->toTimeString(),
//            ]);
//        }
//        Timing::factory(app()->isLocal() ? 10 : 2)->create();
    }
}
