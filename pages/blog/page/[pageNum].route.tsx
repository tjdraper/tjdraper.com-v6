import { GetStaticPaths, GetStaticProps } from 'next';
import {getIndexData, getTotalPosts} from '../BlogData';
import BlogListing, {BlogListingProps} from '../BlogListing';
import { ParsedUrlQuery } from 'querystring';
import {DefaultPerPage} from "../BlogData/constants";

interface Props extends BlogListingProps {
    pageTitle: string;
}

interface Params extends ParsedUrlQuery {
    pageNum: string,
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const totalPosts = await getTotalPosts();

    const totalPages = Math.ceil(totalPosts / DefaultPerPage);

    const paths = [] as Array<{params: Params}>;

    let activePageNum = 2;

    while (activePageNum <= totalPages) {
        paths.push({params: { pageNum: activePageNum.toString() }});

        activePageNum += 1;
    }

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
    { params}
) => {
    let currentPageNum = parseInt(params?.pageNum || '0');

    return {
        props: {
            indexData: await getIndexData({
                currentPageNum,
            }),
            pageTitle: `Page ${currentPageNum} | Blog`,
        },
    };
}

export default BlogListing;
