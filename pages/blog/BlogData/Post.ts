enum PostType {
    article = 'article',
    linkedList = 'linkedList',
}

export interface MetaData {
    order?: string;
    author?: string;
    uri: string;
    title: string;
    type: PostType;
    linkTitle?: string;
    linkUrl?: string;
    image?: string;
    tags?: Array<string>;
    imagePath?: string | null;
    yyyy: string;
    mm: string;
    dd: string;
    slug: string;
}

interface Post extends MetaData {
    body: string;
}

export default Post;
