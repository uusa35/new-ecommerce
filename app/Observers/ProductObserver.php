<?php

namespace App\Observers;


use App\Models\Product;

class ProductObserver
{
    /**
     * Handle the product "created" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function created(Product $product)
    {
        activity()
            ->performedOn($product)
            ->causedBy(auth()->user())
            ->log(strtoupper(class_basename($product)) . ' ' . __FUNCTION__);
    }

    /**
     * Handle the product "updated" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function updated(Product $product)
    {
        activity()
            ->performedOn($product)
            ->causedBy(auth()->user())
            ->log(strtoupper(class_basename($product)) . ' ' . __FUNCTION__);
    }

    /**
     * Handle the product "deleted" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function deleted(Product $product)
    {
        activity()
            ->performedOn($product)
            ->causedBy(auth()->user())
            ->log(strtoupper(class_basename($product)) . ' ' . __FUNCTION__);
    }

    /**
     * Handle the product "restored" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function restored(Product $product)
    {
        //
    }

    /**
     * Handle the product "force deleted" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function forceDeleted(Product $product)
    {
        activity()
            ->performedOn($product)
            ->causedBy(auth()->user())
            ->log(strtoupper(class_basename($product)) . ' ' . __FUNCTION__);
    }
}
