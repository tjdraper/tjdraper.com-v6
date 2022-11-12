import * as constants from './constants';
import getTotalPosts from './getTotalPosts';
// eslint-disable-next-line import/no-cycle
import getIndexData from './getIndexData';
import getPosts from './getPosts';

// const getPostBySlug = (slug: string) => {};

export {
    constants,
    getPosts,
    getIndexData,
    getTotalPosts,
};
