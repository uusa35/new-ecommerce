import {useContext} from 'react';
import {Link} from '@inertiajs/inertia-react';
import {AppContext} from './../context/AppContext';
import BackendContainer from './components/containers/BackendContainer';
import pluralize from 'pluralize';
import GlobalContext from '../context/GlobalContext';
import {isEmpty, map, filter, isNull} from 'lodash';
import route from 'ziggy-js';
import {useSelector} from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line, Bar, Pie} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function BackendHomePage({previousYearChart, currentYearChart}) {
    const {trans, getLocalized, getThumb, classNames} = useContext(AppContext);
    const {auth, settings} = useContext(GlobalContext);
    const {modules} = useSelector((state) => state);

    // const data = {
    //     labels: previousYearChart.data.labels,
    //     datasets: [
    // {
    //     label: 'Dataset 1',
    //     data: [10,20,30],
    //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    //         {
    //             label: 'Dataset 2',
    //             data: [10, 20, 30, 40, 50, 60],
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    const options = (text) => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text,
                },
            },
        };
    };

    return (
        <BackendContainer type={'home'}>
            <main className="sm:my-3">
                <div className="w-full">
                    <h1 className="sr-only">{trans('profile')}</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 gap-1  items-start lg:grid-cols-3 lg:gap-3">
                        {/* Left column */}
                        <div className=" grid grid-cols-1 gap-6 lg:col-span-full ">
                            {/* Welcome panel */}
                            <section aria-labelledby="profile-overview-title">
                                <div className="rounded-lg bg-white overflow-hidden shadow">
                                    <h2
                                        className="sr-only"
                                        id="profile-overview-title"
                                    >
                                        {trans('profile')}
                                    </h2>
                                    <div className="bg-white p-6">
                                        <div className="sm:flex sm:items-center sm:justify-between">
                                            <div className="sm:flex sm:space-x-5">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="mx-10 h-20 w-20 rounded-full shadow-md object-cover object-center"
                                                        src={getThumb(
                                                            auth.image
                                                        )}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="mt-4 text-center sm:mt-0 sm:pt-1 rtl:text-right ltr:text-left">
                                                    <p className="text-sm font-medium text-gray-600">
                                                        {trans('welcome')}
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                                        {auth[getLocalized()]}
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-600">
                                                        {
                                                            auth.role[
                                                                getLocalized()
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex justify-center sm:mt-0">
                                                <Link
                                                    href={route(
                                                        'backend.user.edit',
                                                        auth.id
                                                    )}
                                                    className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-800 bg-white hover:bg-gray-50"
                                                >
                                                    {trans('edit')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {settings.enable_products && (
                        <div
                            className={`bg-white shadow-md rounded-md p-8 py-12 my-6`}
                        >
                            <h2 className={`text-lg font-medium text-gray-900`}>
                                {trans('sales')}
                            </h2>
                            <div className=" hidden lg:flex flex-row justify-evenly items-center h-auto">
                                {!isNull(previousYearChart) &&
                                    previousYearChart.data && (
                                        <div className="w-1/3 rounded-md shadow-md p-3 ">
                                            <Line
                                                options={options(
                                                    previousYearChart.title
                                                )}
                                                data={previousYearChart.data}
                                            />
                                        </div>
                                    )}
                                {!isNull(currentYearChart) &&
                                    currentYearChart.data && (
                                        <div className="w-1/3 rounded-md shadow-md p-3 ">
                                            <Bar
                                                options={options(
                                                    currentYearChart.title
                                                )}
                                                data={currentYearChart.data}
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    <div className={`bg-white shadow-md rounded-md p-4 my-4`}>
                        <h2 className={`text-lg font-medium text-gray-900`}>
                            {trans('modules')}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {trans('all_modules_message')}
                        </p>
                        <ul
                            role="list"
                            className="py-6 grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 "
                        >
                            {!isEmpty(modules) &&
                                map(
                                    filter(
                                        modules,
                                        (m) =>
                                            m.index &&
                                            m.on_top &&
                                            !m.hide_module &&
                                            route().has(
                                                `backend.${m.name}.index`
                                            )
                                    ),
                                    (m) => (
                                        <li
                                            key={m.name}
                                            className={`flow-root rounded-md px-2  bg-white`}
                                        >
                                            <div
                                                className={`relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-100 focus-within:ring-2 focus-within:ring-gray-500`}
                                            >
                                                <div
                                                    className={classNames(
                                                        'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                                                    )}
                                                >
                                                    <img
                                                        className={`rtl:ml-3 ltr:mr-3 rounded-md w-14 h-auto`}
                                                        src={getThumb(m.image)}
                                                        alt={m.name}
                                                    />
                                                </div>
                                                <div>
                                                    <h3
                                                        className={`text-sm font-medium text-gray-900`}
                                                    >
                                                        <Link
                                                            href={
                                                                m.main_menu
                                                                    ? `/backend/${m.name}/search`
                                                                    : `/backend/${m.name}`
                                                            }
                                                            className="focus:outline-none"
                                                        >
                                                            <span
                                                                className="absolute inset-0"
                                                                aria-hidden="true"
                                                            />
                                                            {trans(
                                                                pluralize(
                                                                    m.name
                                                                )
                                                            )}
                                                        </Link>
                                                    </h3>
                                                    <p
                                                        className={`mt-1 text-sm text-gray-500`}
                                                    >
                                                        {m.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                        </ul>
                    </div>
                </div>
            </main>
        </BackendContainer>
    );
}
