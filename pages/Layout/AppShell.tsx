import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { marked } from 'marked';
import Head from 'next/head';

marked.use({ smartypants: true });

enum NavType {
    Local,
    External,
}

interface NavItem {
    name: string;
    href: string;
    type: NavType;
}

const navigation = [
    { name: 'Home', href: '/', type: NavType.Local },
    { name: 'Blog', href: '/blog', type: NavType.Local },
    { name: 'RSS Feed', href: '/blog/feed', type: NavType.Local },
] as Array<NavItem>;

const AppShell = (
    {
        pageTitle,
        children,
    }: {
        pageTitle?: string;
        children?: JSX.Element | JSX.Element[] | string | string[];
    },
) => {
    pageTitle = `${pageTitle ? (`${pageTitle} | `) : ''}TJDraper.com`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className="relative">
                    <div className="relative py-1 bg-gray-50">
                        <Popover>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                                <nav
                                    className="relative flex items-center justify-between sm:h-10 md:justify-center"
                                    aria-label="Global"
                                >
                                    <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
                                        <div
                                            className="flex flex-row-reverse w-full items-center justify-between md:w-auto"
                                        >
                                            <div className="-mr-2 flex items-center md:hidden">
                                                <Popover.Button
                                                    className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tjd-red-300"
                                                >
                                                    <span className="sr-only">Open main menu</span>
                                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex md:space-x-10">
                                        {navigation.map((item) => {
                                            const classes = 'font-medium text-tjd-red-500 hover:text-tjd-red-300';

                                            if (item.type === NavType.External) {
                                                return (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classes}
                                                    >
                                                        {item.name}
                                                    </a>
                                                );
                                            }

                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classes}
                                                >
                                                    {item.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </nav>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="duration-150 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel
                                    focus
                                    className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
                                >
                                    <div
                                        className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5"
                                    >
                                        <div className="flex flex-row-reverse items-center justify-between px-5 pt-1">
                                            <div className="-mr-2">
                                                <Popover.Button
                                                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tjd-red-300"
                                                >
                                                    <span className="sr-only">Close main menu</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                        <div className="space-y-1 px-2 pt-2 pb-3">
                                            {navigation.map((item) => {
                                                const classes = 'block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900';

                                                if (item.type === NavType.External) {
                                                    return (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classes}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    );
                                                }

                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classes}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </div>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

AppShell.defaultProps = {
    pageTitle: undefined,
    children: undefined,
};

export default AppShell;
