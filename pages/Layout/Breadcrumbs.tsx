import { HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export interface Breadcrumb {
    name: string;
    href?: string;
}

const Breadcrumbs = (
    { breadcrumbs }:
    { breadcrumbs: Array<Breadcrumb> },
) => (
    <nav className="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
        <ol className="mx-auto flex w-full max-w-5xl space-x-4 px-4 sm:px-6 lg:px-8">
            <li className="flex">
                <div className="flex items-center">
                    <Link href="/" className="text-gray-400 hover:text-gray-500">
                        <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                    </Link>
                </div>
            </li>
            {breadcrumbs.map((page, i) => {
                const isCurrent = (i + 1) === breadcrumbs.length;

                return (
                    <li key={page.name} className="flex">
                        <div className="flex items-center">
                            <svg
                                className="h-full w-6 flex-shrink-0 text-gray-200"
                                viewBox="0 0 24 44"
                                preserveAspectRatio="none"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                            </svg>
                            {(() => {
                                if (!page.href) {
                                    return (
                                        <span
                                            className="ml-4 text-sm font-medium text-gray-500"
                                            aria-current={isCurrent ? 'page' : undefined}
                                        >
                                            {page.name}
                                        </span>
                                    );
                                }

                                return (
                                    <Link
                                        href={page.href}
                                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        aria-current={isCurrent ? 'page' : undefined}
                                    >
                                        {page.name}
                                    </Link>
                                );
                            })()}
                        </div>
                    </li>
                );
            })}
        </ol>
    </nav>
);

export default Breadcrumbs;
