import BackendContainer from './../components/containers/BackendContainer';
import React, {useContext, useMemo} from 'react';
import {AppContext} from './../../context/AppContext';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {first} from 'lodash';
import FormTabsContainer from './../components/containers/FormTabsContainer';
import ToolTipWidget from './../components/widgets/ToolTipWidget';
import FormBtns from './../components/widgets/form/FormBtns';
import FormSection from '../components/widgets/form/FormSection';
import FormCreateElementEmptyTabs from '../components/widgets/form/FormCreateElementEmptyTabs';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentFormTab} from '../../redux/actions';
import AlertMessage from '../../Frontend/partials/AlertMessage';
import route from 'ziggy-js';
import {Inertia} from '@inertiajs/inertia';

export default function ({model}) {
    const {parentModule, formTabs, currentFormTab} = useSelector(
        (state) => state
    );
    const {classNames, trans, isAdminOrAbove, getLocalized} =
        useContext(AppContext);
    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, post, progress} = useForm({
        model: model,
        file: '',
    });

    useMemo(() => {
        dispatch(setCurrentFormTab(first(formTabs)));
    }, []);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append(`model`, model);
        post('/backend/import/category/store');
    };

    return (
        <BackendContainer mainModule={model}>
            <FormTabsContainer>
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={classNames(
                        currentFormTab.id !== 0 ? 'hidden' : '',
                        `w-full space-y-3`
                    )}
                >
                    {/* main section*/}
                    <FormSection
                        title={`${trans('create')} ${trans(
                            parentModule
                        )} ${trans(model)}`}
                        message={trans('all_information_required')}
                    >
                        <div className="col-span-full">
                            {isAdminOrAbove && model && (
                                <AlertMessage
                                    title={trans('important')}
                                    message={trans('only_excel_files')}
                                    color={'red'}
                                />
                            )}
                            {isAdminOrAbove && (
                                <div
                                    className={`col-span-full py-3 flex justify-center items-center`}
                                >
                                    <a
                                        className={`p-4 border border-gray-100 bg-gray-600 text-white rounded-md shadow-md`}
                                        href={route(`backend.${model}.export`, {
                                            fileType: 'xlsx',
                                        })}
                                    >
                                        {trans('download_the_template')}
                                    </a>
                                </div>
                            )}
                        </div>
                        {/* file pdf */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="main_image"
                                className={`block  font-medium text-gray-800`}
                            >
                                {trans('file')} {trans('excel')}*
                            </label>
                            <div className="mt-1 flex flex-row flex-1 items-center">
                                <input
                                    onChange={(e) =>
                                        setData('file', e.target.files[0])
                                    }
                                    required
                                    type="file"
                                    name="file"
                                    id="file"
                                    accept="
                                         application/vnd.ms-excel,
                                        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel
                                        "
                                    autoComplete="pdf_file"
                                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('file_instruction')}
                            />
                            <p
                                className={` text-red-500 rtl:text-left ltr:text-right`}
                            >
                                {trans('file')}
                            </p>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.file && (
                                    <div className={`text-red-900`}>
                                        {errors.file}
                                    </div>
                                )}
                            </p>
                        </div>
                    </FormSection>

                    <FormBtns type={model} />
                </form>
                {/* empty tabs */}
                <FormCreateElementEmptyTabs />
            </FormTabsContainer>
        </BackendContainer>
    );
}
