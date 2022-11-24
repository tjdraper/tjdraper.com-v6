import { useState } from 'react';
import { Transition } from '@headlessui/react';
import NavItem from './NavItem';
import useUri from '../Url/useUri';

const NavItemLocal = ({ item }: { item: NavItem }) => {
    const { segments } = useUri();

    const segmentHref = `/${segments[1]}`;

    let classes = 'font-medium border-b-2 whitespace-nowrap';

    if (segmentHref === item.href) {
        classes += ' border-black';
    } else {
        classes += ' text-tjd-red-500 border-transparent hover:text-tjd-red-300 hover:border-b-2 hover:border-tjd-red-300';
    }

    return (
        <a
            href={item.href}
            className={classes}
        >
            {item.name}
        </a>
    );
};

const SubNavItemLocal = ({ item }: { item: NavItem }) => {
    const { segments } = useUri();

    let segmentHref = `/${segments[1]}`;

    if (segments[2]) {
        segmentHref += `/${segments[2]}`;
    }

    let classes = 'font-medium whitespace-nowrap block px-4 py-2';

    if (segmentHref === item.href) {
        classes += ' underline';
    } else {
        classes += ' text-tjd-red-500 hover:bg-tjd-red-500 hover:text-white';
    }

    return (
        <a
            href={item.href}
            className={classes}
        >
            {item.name}
        </a>
    );
};

const NavSubItem = (
    {
        item,
        show,
    }: {
        item: NavItem;
        show: boolean;
    },
) => {
    const children = item.children as Array<NavItem>;

    return (
        <Transition
            show={show}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div className="absolute top-full right-1/2 translate-x-1/2 pt-3 text-center">
                <div className="bg-white shadow-md rounded-md overflow-hidden border">
                    {children.map((child) => (
                        <div key={`desktop-sub-nav-${child.name}-${child.href}`}>
                            <SubNavItemLocal item={child} />
                        </div>
                    ))}
                </div>
            </div>
        </Transition>
    );
};

const NavItemDesktop = ({ item }: { item: NavItem }) => {
    const [subMenuIsActive, setSubMenuIsActive] = useState<boolean>(
        false,
    );

    if (!item.children) {
        return <NavItemLocal item={item} />;
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => setSubMenuIsActive(true)}
            onMouseLeave={() => setSubMenuIsActive(false)}
        >
            <NavItemLocal
                item={item}
            />
            <NavSubItem item={item} show={subMenuIsActive} />
        </div>
    );
};

export default NavItemDesktop;
