import { getIndexData } from './BlogData';
import BlogListing from './BlogListing';

export async function getStaticProps () {
    const currentPageNum = 1;
    const tag = null;

    const pageTitle = 'Blog';

    return {
        props: {
            indexData: await getIndexData({
                currentPageNum,
                tag,
            }),
            tag,
            pageTitle,
        },
    };
}

export default BlogListing;
