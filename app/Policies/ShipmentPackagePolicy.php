<?php

namespace App\Policies;

use App\Models\ShipmentPackage;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShipmentPackagePolicy
{
    use HandlesAuthorization;
    const MODAL = 'shipment';

    /**
     * Determine whether the user can view the shipment package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\ShipmentPackage  $shipmentPackage
     * @return mixed
     */
    public function view(User $user, ShipmentPackage $shipmentPackage)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create shipment packages.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the shipment package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\ShipmentPackage  $shipmentPackage
     * @return mixed
     */
    public function update(User $user, ShipmentPackage $shipmentPackage)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the shipment package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\ShipmentPackage  $shipmentPackage
     * @return mixed
     */
    public function delete(User $user, ShipmentPackage $shipmentPackage)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the shipment package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\ShipmentPackage  $shipmentPackage
     * @return mixed
     */
    public function restore(User $user, ShipmentPackage $shipmentPackage)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the shipment package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\ShipmentPackage  $shipmentPackage
     * @return mixed
     */
    public function forceDelete(User $user, ShipmentPackage $shipmentPackage)
    {
        //
    }
}
