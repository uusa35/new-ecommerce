<?php

namespace App\Policies;

use App\Models\Slide;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SlidePolicy
{
    use HandlesAuthorization;

    const MODAL = 'slide';

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
     * Determine whether the user can view the slide.
     *
     * @param \App\Models\User $user
     * @param \App\Slide $slide
     * @return mixed
     */
    public function view(User $user, Slide $slide)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $slide->slideable->user->id;
    }

    /**
     * Determine whether the user can create slides.
     *
     * @param \App\Models\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the slide.
     *
     * @param \App\Models\User $user
     * @param \App\Slide $slide
     * @return mixed
     */
    public function update(User $user, Slide $slide)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $slide->slideable->user->id;
    }

    /**
     * Determine whether the user can delete the slide.
     *
     * @param \App\Models\User $user
     * @param \App\Slide $slide
     * @return mixed
     */
    public function delete(User $user, Slide $slide)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $slide->slideable->user->id;
    }

    /**
     * Determine whether the user can restore the slide.
     *
     * @param \App\Models\User $user
     * @param \App\Slide $slide
     * @return mixed
     */
    public function restore(User $user, Slide $slide)
    {
        dd('create');
    }

    /**
     * Determine whether the user can permanently delete the slide.
     *
     * @param \App\Models\User $user
     * @param \App\Slide $slide
     * @return mixed
     */
    public function forceDelete(User $user, Slide $slide)
    {

        //
    }
}
