<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Size;
use Illuminate\Auth\Access\HandlesAuthorization;

class SizePolicy
{
    use HandlesAuthorization;
    const MODAL = 'size';


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
     * Determine whether the user can view the size.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Size  $size
     * @return mixed
     */
    public function view(User $user, Size $size)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create sizes.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the size.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Size  $size
     * @return mixed
     */
    public function update(User $user, Size $size)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the size.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Size  $size
     * @return mixed
     */
    public function delete(User $user, Size $size)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the size.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Size  $size
     * @return mixed
     */
    public function restore(User $user, Size $size)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the size.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Size  $size
     * @return mixed
     */
    public function forceDelete(User $user, Size $size)
    {
        //
    }
}
