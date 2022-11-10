import getTotalPosts from './getTotalPosts';
import IndexData from './IndexData';
// eslint-disable-next-line import/no-cycle
import { getPosts } from './index';

interface GetIndexDataProps {
    currentPageNum?: number;
    perPage?: number;
}

const getIndexData = async (props?: GetIndexDataProps): Promise<IndexData> => {
    const totalPosts = await getTotalPosts();
    const currentPageNum = props?.currentPageNum || 1;
    const perPage = props?.perPage || 12;
    const totalPages = Math.ceil(totalPosts / perPage);

    return ({
        currentPageNum,
        totalPosts,
        totalPages,
        perPage,
        posts: await getPosts({
            limit: perPage,
        }),
    });
};

export default getIndexData;
