import { marked } from 'marked';
import Head from 'next/head';
import Nav from './Nav';

marked.use({ smartypants: true });

const AppShell = (
    {
        pageTitle,
        summaryImage,
        children,
    }: {
        pageTitle?: string;
        summaryImage?: string;
        children?: JSX.Element | JSX.Element[] | string | string[];
    },
) => {
    pageTitle = `${pageTitle ? (`${pageTitle} | `) : ''}TJDraper.com`;

    const twitterCardType = summaryImage ? 'summary_large_image' : 'summary';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="twitter:card" content={twitterCardType} />
                <meta name="twitter:title" content={pageTitle} />
                <meta property="og:title" content={pageTitle} />
                {summaryImage && (
                    <>
                        <meta name="twitter:image" content={summaryImage} />
                        <meta property="og:image" content={summaryImage} />
                    </>
                )}
            </Head>
            <div>
                <div className="relative">
                    <Nav />
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
    summaryImage: undefined,
    children: undefined,
};

export default AppShell;
