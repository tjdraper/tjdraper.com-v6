import { getIndexData } from './BlogData';
import BlogListing from './BlogListing';

export async function getStaticProps () {
    const currentPageNum = 1;

    return {
        props: {
            indexData: await getIndexData({
                currentPageNum,
            }),
        },
    };
}

export default BlogListing;
