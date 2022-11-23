<?php

namespace App\Policies;

use App\Models\Classified;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClassifiedPolicy
{
    use HandlesAuthorization;
    const MODAL = 'classified';

    /**
     * Determine whether the user can view the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Classified $classified
     * @return mixed
     */
    public function view(User $user, Classified $classified)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $classified->user_id;
    }

    /**
     * Determine whether the user can create products.
     *
     * @param  \App\Models\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Classified $classified
     * @return mixed
     */
    public function update(User $user, Classified $classified)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $classified->user_id;
    }

    /**
     * Determine whether the user can delete the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Classified $classified
     * @return mixed
     */
    public function delete(User $user, Classified $classified)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $classified->user_id;
    }

    /**
     * Determine whether the user can restore the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Classified $classified
     * @return mixed
     */
    public function restore(User $user, Classified $classified)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Classified $classified
     * @return mixed
     */
    public function forceDelete(User $user, Classified $classified)
    {
        //
    }
}
