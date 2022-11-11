import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import PaginationParameters from './PaginationParameters';

const Pagination = ({ parameters }: { parameters: PaginationParameters }) => {
    let {
        pad,
        // eslint-disable-next-line prefer-const
        currentPageNum,
        // eslint-disable-next-line prefer-const
        totalPages,
        // eslint-disable-next-line prefer-const
        basePath,
    } = parameters;

    if (totalPages < 2) {
        return null;
    }

    pad = parameters.pad || 2;

    let prevPageNum = currentPageNum - 1 as number | null;

    if (prevPageNum && prevPageNum < 1) {
        prevPageNum = null;
    }

    let nextPageNum = currentPageNum + 1 as number | null;

    if (nextPageNum && nextPageNum > totalPages) {
        nextPageNum = null;
    }

    const links = [] as Array<{
        current?: boolean;
        href?: string;
        srOnly?: string;
        content: JSX.Element | JSX.Element[] | string | string[] | number;
        id: string;
    }>;

    let href = '';

    if (prevPageNum && (prevPageNum - pad) > 0) {
        href = basePath;

        links.push({
            href,
            srOnly: 'First',
            content: <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />,
            id: `firstPage-${href}`,
        });
    }

    // if (prevPageNum) {
    //     href = `/${basePath}/page/${prevPageNum}`;
    //
    //     links.push({
    //         href,
    //         srOnly: 'Previous',
    //         content: <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />,
    //         id: `prevPage-${href}`,
    //     });
    // }

    let totalLinks = (pad * 2);

    if (totalLinks > totalPages) {
        totalLinks = totalPages;
    }

    let startNumber = Math.max(currentPageNum - pad, 1);

    if (startNumber > 1) {
        links.push({
            content: '...',
            id: 'start...',
        });
    }

    let endNumber = totalLinks + startNumber;

    if (endNumber > totalPages) {
        startNumber -= (endNumber - totalPages);
        endNumber = totalPages;
    }

    if (startNumber < 1) {
        startNumber = 1;
    }

    for (let i = startNumber; i <= endNumber; i += 1) {
        href = basePath;

        if (i > 1) {
            href += `/page/${i}`;
        }

        links.push({
            current: i === currentPageNum,
            href,
            content: i,
            id: `page${i}-${href}`,
        });
    }

    if (endNumber < totalPages) {
        links.push({
            content: '...',
            id: 'end...',
        });
    }

    // if (nextPageNum) {
    //     href = `/${basePath}/page/${nextPageNum}`;
    //
    //     links.push({
    //         href,
    //         srOnly: 'Next',
    //         content: <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />,
    //         id: `nextPage-${href}`,
    //     });
    // }

    if (nextPageNum && (nextPageNum + pad) <= totalPages) {
        href = `${basePath}/page/${totalPages}`;

        links.push({
            href,
            srOnly: 'Last',
            content: <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />,
            id: `lastPage-${href}`,
        });
    }

    return (
        <nav className="flex items-center justify-between border-t border-gray-200">
            <div className="-mt-px flex w-0 flex-1">
                {(() => {
                    if (!prevPageNum) {
                        return null;
                    }

                    let link = `${basePath}`;

                    if (prevPageNum > 1) {
                        link += `/page/${prevPageNum}`;
                    }

                    return (
                        <Link
                            href={link}
                            className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Previous
                        </Link>
                    );
                })()}
            </div>
            <div className="hidden md:-mt-px md:flex">
                {links.map((item) => {
                    let classes = 'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ';

                    if (!item.current) {
                        classes += ' border-transparent text-gray-500';
                    } else {
                        classes += ' border-tjd-red-500 text-tjd-red-500';
                    }

                    if (item.href && !item.current) {
                        classes += ' hover:border-gray-300 hover:text-gray-700';
                    }

                    if (!item.href || item.current) {
                        return (
                            <span
                                key={item.id}
                                className={classes}
                            >
                                {item.content}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={classes}
                        >
                            {item.content}
                        </Link>
                    );
                })}
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                {(() => {
                    if (!nextPageNum) {
                        return null;
                    }

                    return (
                        <Link
                            href={`${basePath}/page/${nextPageNum}`}
                            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            Next
                            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Link>
                    );
                })()}
            </div>
        </nav>
    );
};

export default Pagination;
