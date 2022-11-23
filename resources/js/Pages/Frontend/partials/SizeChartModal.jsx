/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useState} from 'react';
import {FiAlertCircle} from 'react-icons/fi';
import {AppContext} from '../../context/AppContext';

export default function ({
    showModal = false,
    setShowModal,
    title = '',
    message = '',
    image = '',
}) {
    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog
                as="div"
                className="font-gesst-medium fixed z-10 inset-0 overflow-y-auto"
                onClose={setShowModal}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm lg:max-w-xl sm:w-full sm:p-6">
                            <div>
                                <div className="mx-auto flex w-full items-center justify-start h-12 w-12 rounded-full">
                                    <XIcon
                                        className="h-6 w-6 text-gray-600"
                                        aria-hidden="true"
                                        onClick={() => setShowModal(false)}
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-bold text-gray-900 capitalize"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {message && (
                                            <p className="text-sm text-gray-500">
                                                {message}
                                            </p>
                                        )}
                                        <img
                                            className="w-full object-contain object-center"
                                            src={image}
                                            alt={title}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
