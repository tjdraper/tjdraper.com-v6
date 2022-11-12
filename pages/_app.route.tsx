import './global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import CustomPage from './CustomPage';
import AppShell from './Layout/AppShell';
import BlogPost from './blog/BlogPost';
import transformFrontMatterToMetaData from './blog/BlogData/transformFrontMatterToMetaData';

interface Props extends AppProps {
    Component: CustomPage;
}

const App = ({ Component, pageProps }: Props) => {
    const router = useRouter();

    const { raw } = Component;

    if (raw) {
        return <Component {...pageProps} />;
    }

    const uri = router.pathname;

    const seg1 = uri.substring(1).split('/').at(0);

    if (Component.name !== 'MDXContent') {
        return (
            <AppShell activeNavItem={`/${seg1}`}>
                <Component {...pageProps} />
            </AppShell>
        );
    }

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
