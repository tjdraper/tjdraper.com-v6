const SearchForm = ({ q }: { q?: string }) => (
    <div className="sm:max-w-xl mx-auto sm:pt-10">
        <div className="bg-gray-50 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="mt-2 text-sm text-gray-500">
                    <p>Enter your search terms</p>
                </div>
                <form className="mt-5 sm:flex sm:items-center">
                    <div className="w-full sm:max-w-md">
                        <label htmlFor="q" className="sr-only">
                            Search
                        </label>
                        <input
                            type="text"
                            name="q"
                            id="q"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-tjd-red-500 focus:ring-tjd-red-500 sm:text-sm"
                            placeholder="you@example.com"
                            defaultValue={q}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-tjd-red-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-tjd-red-600 focus:outline-none focus:ring-2 focus:ring-tjd-red-400 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    </div>
);

SearchForm.defaultProps = {
    q: undefined,
};

export default SearchForm;
