<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Commercial;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommercialPolicy
{
    use HandlesAuthorization;
    const MODAL = 'commercial';

    /**
     * Determine whether the user can view the commercial.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Commercial  $commercial
     * @return mixed
     */
    public function view(User $user, Commercial $commercial)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $commercial->user_id;
    }

    /**
     * Determine whether the user can create commercials.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the commercial.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Commercial  $commercial
     * @return mixed
     */
    public function update(User $user, Commercial $commercial)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $commercial->user_id;
    }

    /**
     * Determine whether the user can delete the commercial.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Commercial  $commercial
     * @return mixed
     */
    public function delete(User $user, Commercial $commercial)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $commercial->user_id;
    }

    /**
     * Determine whether the user can restore the commercial.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Commercial  $commercial
     * @return mixed
     */
    public function restore(User $user, Commercial $commercial)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the commercial.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Commercial  $commercial
     * @return mixed
     */
    public function forceDelete(User $user, Commercial $commercial)
    {
        //
    }
}
