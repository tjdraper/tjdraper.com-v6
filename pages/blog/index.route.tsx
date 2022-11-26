import { GetStaticProps } from 'next';
import { getIndexData } from './BlogData';
import BlogListing, { BlogListingProps } from './BlogListing';

interface Props extends BlogListingProps {
    pageTitle: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
    props: {
        indexData: await getIndexData(),
        pageTitle: 'Blog',
    },
});

export default BlogListing;
