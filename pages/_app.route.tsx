import './global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import CustomPage, { ComponentType } from './CustomPage';
import AppShell from './Layout/AppShell';
import transformFrontMatterToMetaData from './blog/BlogData/transformFrontMatterToMetaData';
import BlogPost from './blog/BlogPost/BlogPost';
import useUri from './Url/useUri';

interface Props extends AppProps {
    Component: CustomPage;
}

const App = ({ Component, pageProps }: Props) => {
    const { path } = useUri();

    // Check the component type
    const { type } = Component;

    // If it's ComponentType.raw, just return the Component
    if (type === ComponentType.raw) {
        return <Component {...pageProps} />;
    }

    // If it's ComponentType.standardPage, put the AppShell around it
    if (type === ComponentType.standardPage) {
        return (
            <AppShell pageTitle={pageProps.pageTitle}>
                <Component {...pageProps} />
            </AppShell>
        );
    }

    // Now we'll assume that it's a markdown page because we can't control the
    // `type` property on that

    const metaData = transformFrontMatterToMetaData(
        pageProps,
        path,
    );

    pageProps.pageTitle = metaData.title;

    return (
        <AppShell
            pageTitle={pageProps.pageTitle}
            summaryImage={
                metaData.imagePath
                    ? `https://www.tjdraper.com${metaData.imagePath}`
                    : undefined
            }
        >
            <BlogPost metaData={metaData}>
                <Component {...pageProps} />
            </BlogPost>
        </AppShell>
    );
};

export default App;
