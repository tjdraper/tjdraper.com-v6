import { Results } from './getPosts';
import getPostsFromIndexCache from './getPostsFromIndexCache';

const searchPosts = async (q: string): Promise<Results> => {
    const results = await getPostsFromIndexCache({
        limit: 999999999999,
    });

    const posts = results.posts.filter((post) => {
        const linkTitle = post.linkTitle || '';
        const tags = post.tags || [];
        const tagText = tags.join(' ');

        return post.title.toLowerCase().indexOf(q.toLowerCase()) > -1
            || linkTitle.toLowerCase().indexOf(q.toLowerCase()) > -1
            || tagText.toLowerCase().indexOf(q.toLowerCase()) > -1
            || post.body.toLowerCase().indexOf(q.toLowerCase()) > -1;
    });

    return {
        totalPosts: posts.length,
        posts,
    };
};

export default searchPosts;
