import IndexData from './IndexData';
import { DefaultPerPage } from './constants';
import getPostsFromIndexCache from './getPostsFromIndexCache';

interface GetIndexDataProps {
    currentPageNum?: number;
    perPage?: number;
    tag?: string | null | undefined;
}

const getIndexData = async (props?: GetIndexDataProps): Promise<IndexData> => {
    const currentPageNum = props?.currentPageNum || 1;
    const perPage = props?.perPage || DefaultPerPage;
    const offset = (currentPageNum * perPage) - perPage;
    const tag = props?.tag || null;

    const results = await getPostsFromIndexCache({
        limit: perPage,
        offset,
        tag,
    });

    const { totalPosts } = results;

    const totalPages = Math.ceil(totalPosts / perPage);

    return ({
        currentPageNum,
        totalPosts,
        totalPages,
        perPage,
        tag,
        posts: results.posts,
    });
};

export default getIndexData;
