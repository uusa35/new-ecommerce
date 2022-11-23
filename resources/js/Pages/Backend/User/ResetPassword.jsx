import {Fragment, useContext, useMemo, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import route from 'ziggy-js';
import GlobalContext from '../../context/GlobalContext';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {useDispatch, useSelector} from 'react-redux';
import {Inertia} from '@inertiajs/inertia';
import BackendContainer from '../components/containers/BackendContainer';
import FormTabsContainer from '../components/containers/FormTabsContainer';
import FormSection from '../components/widgets/form/FormSection';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import FormCreateElementEmptyTabs from '../components/widgets/form/FormCreateElementEmptyTabs';
import {setCurrentFormTab} from '../../redux/actions';
import {filter, first} from 'lodash';

export default function () {
    const {classNames, trans} = useContext(AppContext);
    const {auth} = useContext(GlobalContext);
    const {parentModule, formTabs, currentFormTab} = useSelector(
        (state) => state
    );
    const dispatch = useDispatch();
    const {props} = usePage();
    const {params} = route();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        id: params.id,
        password: '',
        password_confirmation: '',
    });

    useMemo(() => {
        return dispatch(setCurrentFormTab(first(formTabs)));
    }, []);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`backend.post.reset.password`),
            {
                ...data,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <BackendContainer type={'user'}>
            <form
                onSubmit={submit}
                method="put"
                encType="multipart/form-data"
                className={classNames(
                    currentFormTab.id !== 0 ? 'hidden' : '',
                    `w-full space-y-3`
                )}
            >
                <FormSection title={`${trans('edit')} ${trans('user')}`}>
                    {/* password */}
                    <div className="sm:col-span-full">
                        <label
                            htmlFor="password"
                            className={`block   text-gray-800`}
                        >
                            {trans('password')}
                        </label>
                        <div className="mt-1">
                            <input
                                required
                                type="password"
                                name="password"
                                onChange={handleChange}
                                id="password"
                                autoComplete="password"
                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                            />
                        </div>
                        <ToolTipWidget
                            message={trans('user_price_instruction')}
                        />
                        <p className={`mt-2  text-gray-500`}>
                            {errors.password && (
                                <div className={`text-red-900`}>
                                    {errors.password}
                                </div>
                            )}
                        </p>
                    </div>

                    {/* password_confirmation */}
                    <div className="sm:col-span-full">
                        <label
                            htmlFor="password_confirmation"
                            className={`block   text-gray-800`}
                        >
                            {trans('password_confirmation')}
                        </label>
                        <div className="mt-1">
                            <input
                                required
                                type="password"
                                name="password_confirmation"
                                onChange={handleChange}
                                id="password_confirmation"
                                autoComplete="password_confirmation"
                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                            />
                        </div>
                        <ToolTipWidget
                            message={trans('user_price_instruction')}
                        />
                        <p className={`mt-2  text-gray-500`}>
                            {errors.password_confirmation && (
                                <div className={`text-red-900`}>
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </p>
                    </div>
                </FormSection>
                <FormBtns type={'user'} />
            </form>
            <FormCreateElementEmptyTabs />
        </BackendContainer>
    );
}
