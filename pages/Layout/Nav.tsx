import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import NavItem from './NavItem';
import NavItemDesktop from './NavItemDesktop';
import NavItemMobile from './NavItemMobile';

const navigation = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Blog',
        href: '/blog',
        children: [
            {
                name: 'All Posts',
                href: '/blog',
            },
            {
                name: 'Tags',
                href: '/blog/tags',
            },
            {
                name: 'Search',
                href: '/blog/search',
            },
        ],
    },
    {
        name: 'RSS Feed',
        href: '/blog/feed.xml',
    },
] as Array<NavItem>;

const Nav = () => (
    <div className="relative py-1 bg-gray-100 border-tjd-red-500 border-t-8 z-50">
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
                                    className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-tjd-red-100 hover:text-gray-500 focus:outline-none"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex md:space-x-10">
                        {navigation.map((item) => (
                            <NavItemDesktop
                                key={`desktop-${item.name}-${item.href}`}
                                item={item}
                            />
                        ))}
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
                                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-tjd-red-100 hover:text-gray-500 focus:outline-none"
                                >
                                    <span className="sr-only">Close main menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <NavItemMobile
                                    key={`mobile-${item.name}-${item.href}`}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    </div>
);

export default Nav;
