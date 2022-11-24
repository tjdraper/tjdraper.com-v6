interface NavItem {
    name: string;
    href: string;
    children?: Array<NavItem>;
}

export default NavItem;
