import {useContext} from 'react';
import {AppContext} from '../../../context/AppContext';
import {useSelector} from 'react-redux';
import {FiCodepen} from 'react-icons/fi';

export default function ElementTags({
    onNew = false,
    onSale = false,
    exclusive = false,
    free = false,
    showFavoriteIcon = true,
    rounded = false,
}) {
    const {classNames, trans, mainColor} = useContext(AppContext);
    const {locale} = useSelector((state) => state);

    return (
        <div className="relative opacity-50 z-30">
            <div
                className={classNames(
                    locale.isRTL ? `` : ``,
                    'absolute top-8 ltr:ml-5 rtl:mr-5 flex flex-col text-white text-sm'
                )}
            >
                {onSale && !free ? (
                    <span
                        className={classNames(
                            rounded ? `rounded-tl-lg rounded-br-lg` : ``,
                            `inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm  bg-red-900 mb-3 `
                        )}
                    >
                        {trans('on_sale')}
                    </span>
                ) : null}
                {onNew ? (
                    <span
                        className={classNames(
                            rounded ? `rounded-tl-lg rounded-br-lg` : ``,
                            `inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-hippie-blue-900 mb-3`
                        )}
                    >
                        {trans('on_new')}
                    </span>
                ) : null}
                {exclusive ? (
                    <span
                        className={classNames(
                            rounded ? `rounded-tl-lg rounded-br-lg` : ``,
                            `inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-hippie-blue-800 mb-3`
                        )}
                    >
                        {trans('exclusive')}
                    </span>
                ) : null}
                {free ? (
                    <span
                        className={classNames(
                            rounded ? `rounded-tl-lg rounded-br-lg` : ``,
                            `inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-hippie-blue-600 mb-3`
                        )}
                    >
                        {trans('free')}
                    </span>
                ) : null}
            </div>
            {showFavoriteIcon && (
                <div
                    className={classNames(
                        locale.isRTL ? `left-2` : `right-2`,
                        `absolute top-8 flex flex-col  gap-y-3 text-white text-sm bg-transparent rounded-full w-10 h-10 justify-center items-center opacity-80`
                    )}
                >
                    <FiCodepen
                        fill={'none'}
                        className={`h-7 w-7 text-${mainColor}-800 dark:text-${mainColor}-900 hover:text-${mainColor}-400`}
                    />
                </div>
            )}
        </div>
    );
}
