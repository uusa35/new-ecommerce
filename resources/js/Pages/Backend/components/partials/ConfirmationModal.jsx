/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {AppContext} from '../../../context/AppContext';
import {useForm} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import route from 'ziggy-js';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal, showToastMessage} from '../../../redux/actions';

export default function ConfirmationModal() {
    const {trans, classNames} = useContext(AppContext);
    const {confirmationModal, locale} = useSelector((state) => state);
    const {
        data,
        submit,
        setData,
        delete: destroy,
    } = useForm({
        id: '',
    });
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch();

    const handleCancel = () => dispatch(hideModal());

    const handleConfirm = () => {
        if (confirmationModal.type === 'destroy' && confirmationModal.id) {
            return handleDeleteFormSubmit();
        } else {
            // console.log('do another thing');
        }
    };

    const handleDeleteFormSubmit = () => {
        const {id, model, type} = confirmationModal;
        setData('id', id);
        dispatch(hideModal());
        return destroy(route(`backend.${model}.${type}`, id), {
            preserveScroll: true,
            onSuccess: () => {
                if (model !== 'image') {
                    // return window.location.reload()
                    Inertia.get(route(`backend.${model}.index`));
                    // dispatch(showToastMessage({ message : trans('process_success'), type : 'warning'}))
                }
            },
            onError: () => {
                // dispatch(showToastMessage({ message : trans('process_failure'), type : 'warning'}))
            },
        });
    };

    return (
        <Transition.Root show={confirmationModal.display} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                // open={showConfirmationModal}
                onClose={() => dispatch(hideModal())}
            >
                <div
                    className={classNames(
                        locale.isRTL
                            ? 'font-tajwal-medium'
                            : 'font-tajwal-medium',
                        'flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 capitalize'
                    )}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
                        />
                    </Transition.Child>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div
                                    className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className={`text-lg leading-6 font-medium text-gray-900`}
                                    >
                                        {confirmationModal.title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className={`text-sm text-gray-500`}>
                                            {confirmationModal.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm capitalize`}
                                    onClick={() => handleCancel()}
                                    ref={cancelButtonRef}
                                >
                                    {trans('cancel')}
                                </button>
                                <button
                                    type="button"
                                    className={classNames(
                                        confirmationModal.type === 'destroy'
                                            ? 'bg-red-900'
                                            : `bg-gray-600`,
                                        `w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm capitalize`
                                    )}
                                    onClick={() =>
                                        handleConfirm(confirmationModal.id)
                                    }
                                >
                                    {trans('confirm')}
                                </button>
                            </div>
                            {confirmationModal.type === 'destroy' &&
                                confirmationModal.id && (
                                    <form
                                        method="post"
                                        // action={`/backend/${confirmationModal.model}/${confirmationModal.id}`}
                                        action={route(
                                            `backend.${confirmationModal.model}.${confirmationModal.type}`,
                                            confirmationModal.id
                                        )}
                                    >
                                        <input
                                            type="hidden"
                                            name="_method"
                                            value="delete"
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-del hidden"
                                        ></button>
                                    </form>
                                )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

// ConfirmationModal.propTypes = {
//     confirmationAction: PropTypes.func.isRequired,
// };
