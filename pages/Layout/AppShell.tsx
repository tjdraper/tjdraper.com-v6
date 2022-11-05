const AppShell = (
    {
        children,
    }: {
        children?: JSX.Element | JSX.Element[] | string | string[];
    },
) => (
    <main>
        {children}
    </main>
);

AppShell.defaultProps = {
    children: undefined,
};

export default AppShell;
