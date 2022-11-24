import NavItem from './NavItem';
import useUri from '../Url/useUri';

const NavItemLocal = (
    { item, isChild }: { item: NavItem; isChild?: boolean },
) => {
    const { segments } = useUri();

    let segmentHref = `/${segments[1]}`;

    if (isChild && segments[2]) {
        segmentHref += `/${segments[2]}`;
    }

    let classes = 'block rounded-md px-3 py-2 text-base font-medium';

    if (segmentHref === item.href) {
        classes += ' bg-red-800 text-gray-100 pointer-events-none';
    } else {
        classes += ' text-tjd-red-500 hover:bg-tjd-red-100 hover:text-gray-900';
    }

    if (isChild) {
        classes += ' pl-8';
    }

    const children = item.children || [];

    return (
        <>
            <a
                href={item.href}
                className={classes}
            >
                {item.name}
            </a>
            {children.map((child) => (
                <NavItemLocal
                    key={`mobile-sub-nav-${item.name}-${item.href}`}
                    item={child}
                    isChild
                />
            ))}
        </>
    );
};

NavItemLocal.defaultProps = {
    isChild: undefined,
};

const NavItemMobile = ({ item }: { item: NavItem }) => (
    <NavItemLocal
        item={item}
    />
);

export default NavItemMobile;
