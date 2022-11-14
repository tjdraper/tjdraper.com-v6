import './global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import CustomPage, { ComponentType } from './CustomPage';
import AppShell from './Layout/AppShell';
import transformFrontMatterToMetaData from './blog/BlogData/transformFrontMatterToMetaData';
import BlogPost from './blog/BlogPost/BlogPost';

interface Props extends AppProps {
    Component: CustomPage;
}

const App = ({ Component, pageProps }: Props) => {
    const router = useRouter();

    // Check for 404
    if (pageProps.statusCode === 404) {
        return <Component {...pageProps} />;
    }

    // Check the component type
    const { type } = Component;

    // If it's ComponentType.raw, just return the Component
    if (type === ComponentType.raw) {
        return <Component {...pageProps} />;
    }

    const uri = router.pathname;

    const seg1 = uri.substring(1).split('/').at(0);

    // If it's ComponentType.standardPage, put the AppShell around it
    if (type === ComponentType.standardPage) {
        return (
            <AppShell activeNavItem={`/${seg1}`}>
                <Component {...pageProps} />
            </AppShell>
        );
    }

    // Now we'll assume that it's a markdown page because we can't control the
    // `type` property on that

    const metaData = transformFrontMatterToMetaData(
        pageProps,
        uri,
    );

    return (
        <AppShell activeNavItem={`/${seg1}`}>
            <BlogPost metaData={metaData}>
                <Component {...pageProps} />
            </BlogPost>
        </AppShell>
    );
};

export default App;
