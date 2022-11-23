<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TranslationsTableSeeder::class);
        $this->call(SubscriptionsTableSeeder::class);
        $this->call(CountriesTableSeeder::class);
        $this->call(GovernatesTableSeeder::class);
        $this->call(AreasTableSeeder::class);
        $this->call(PrivilegesTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(CurrenciesTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(AttributesTableSeeder::class);
//        $this->call(ColorsTableSeeder::class);
//        $this->call(SizesTableSeeder::class);
        $this->call(PagesTableSeeder::class);
        $this->call(NewslettersTableSeeder::class);
        $this->call(NotificationsTableSeeder::class);
        $this->call(BrandsTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ShippmentPackgesTableSeeder::class);
        $this->call(CommercialsTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(VideosTableSeeder::class);
        $this->call(BranchesTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(BooksTableSeeder::class);
        $this->call(CoursesTableSeeder::class);
        $this->call(ServicesTableSeeder::class);
        $this->call(NationalEventsTableSeeder::class);
        $this->call(SlidesTableSeeder::class);
        $this->call(CouponsTableSeeder::class);
        $this->call(OrdersTableSeeder::class);;
        $this->call(FavoritesTableSeeder::class);
        $this->call(RatingsTableSeeder::class);
        $this->call(FansTableSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(AddressesTableSeeder::class);
        $this->call(FaqsTableSeeder::class);
    }
}
