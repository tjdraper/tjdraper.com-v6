enum PostType {
    article = 'article',
    linkedList = 'linkedList',
    photoEntry = 'photoEntry',
    photosOnly = 'photosOnly',
}

export interface MetaData {
    uri: string;
    title: string;
    type: PostType;
    linkTitle?: string;
    linkUrl?: string;
    image?: string;
    tags?: Array<string>;
}

interface Post extends MetaData {
    imagePath?: string | null;
    yyyy: string;
    mm: string;
    dd: string;
    slug: string;
    body: string;
}

export default Post;
