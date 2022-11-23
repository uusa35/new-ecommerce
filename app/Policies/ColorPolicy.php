<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Color;
use Illuminate\Auth\Access\HandlesAuthorization;

class ColorPolicy
{
    use HandlesAuthorization;
    const MODAL = 'color';


    /**
     * Determine whether the user can view the category.
     *
     * @param \App\Models\User $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->index : false;
    }

    /**
     * Determine whether the user can view the color.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Color  $color
     * @return mixed
     */
    public function view(User $user, Color $color)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create colors.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the color.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Color  $color
     * @return mixed
     */
    public function update(User $user, Color $color)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the color.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Color  $color
     * @return mixed
     */
    public function delete(User $user, Color $color)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the color.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Color  $color
     * @return mixed
     */
    public function restore(User $user, Color $color)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the color.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Color  $color
     * @return mixed
     */
    public function forceDelete(User $user, Color $color)
    {
        //
    }
}
