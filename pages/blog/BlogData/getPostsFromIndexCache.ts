import fs from 'fs-extra';
import { GetPostsProps, Results } from './getPosts';
import Post from './Post';
import { BlogDirectory, DefaultPerPage } from './constants';

const getPostsFromIndexCache = async (props?: GetPostsProps): Promise<Results> => {
    const jsonData = JSON.parse(
        fs.readFileSync(
            `${BlogDirectory}/BlogData/IndexCache.json`,
        ).toString(),
    );

    const jsonResults = jsonData as unknown as Results;

    let posts = jsonResults.posts as unknown as Array<Post>;

    if (props?.tag) {
        posts = posts.filter((post) => {
            const tagIndex = post.tags?.indexOf(String(props.tag));

            if (tagIndex === undefined) {
                return false;
            }

            return tagIndex >= 0;
        });
    }

    const limit = props?.limit || DefaultPerPage;

    const start = props?.offset || 0;

    const end = start + limit;

    const results = posts.slice(start, end);

    return {
        totalPosts: posts.length,
        posts: results,
    };
};

export default getPostsFromIndexCache;
