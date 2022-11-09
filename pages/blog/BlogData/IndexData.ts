import Post from './Post';

interface IndexData {
    currentPageNum: number;
    totalPosts: number;
    totalPages: number;
    perPage: number;
    posts: Array<Post>;
}

export default IndexData;
