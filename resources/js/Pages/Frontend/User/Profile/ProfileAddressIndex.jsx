import {Fragment, useContext, useState} from 'react';
import {AppContext} from '../../../context/AppContext';
import FrontendContainer from '../../components/FrontendContainer';
import route from 'ziggy-js';
import GlobalContext from '../../../context/GlobalContext';
import FrontendContentContainer from '../../components/FrontendContentContainer';
import {useDispatch, useSelector} from 'react-redux';
import UserEditSideNav from './UserEditSideNav';

export default function () {
    const {classNames, trans, textColor, contentBgColor} =
        useContext(AppContext);
    const {auth} = useContext(GlobalContext);
    const {locale} = useSelector((state) => state);
    const [availableToHire, setAvailableToHire] = useState(true);
    const [privateAccount, setPrivateAccount] = useState(false);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main className={`relative mt-5 ${contentBgColor}`}>
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="bg-white overflow-hidden">
                            <div className=" lg:grid lg:grid-cols-12">
                                <UserEditSideNav />
                                <form
                                    className=" lg:col-span-9"
                                    action="#"
                                    method="POST"
                                >
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2
                                                    className={`text-lg leading-6 font-medium ${textColor}`}
                                                >
                                                    {trans('profile')}
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans('my_courses')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-12 gap-3">
                                            <h1>Address INdex</h1>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
