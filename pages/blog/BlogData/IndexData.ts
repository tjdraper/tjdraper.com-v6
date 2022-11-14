import Post from './Post';

interface IndexData {
    currentPageNum: number;
    totalPosts: number;
    totalPages: number;
    perPage: number;
    posts: Array<Post>;
    tag: string | null;
}

export default IndexData;
