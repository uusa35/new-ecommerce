export default function FormSection({children, title, message = ''}) {
    return (
        <div className="space-y-4 divide-y 900 bg-white p-10 rounded-md shadow-sm">
            <div className={`pt-4`}>
                <h5 className="leading-6 text-xl text-gray-900 capitalize">
                    {title}
                </h5>
                <p className="mt-1  text-red-500">{message}</p>
            </div>
            <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {children}
            </div>
        </div>
    );
}
