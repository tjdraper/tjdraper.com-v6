enum PostType {
    article = 'article',
    linkedList = 'linkedList',
    photoEntry = 'photoEntry',
    photosOnly = 'photosOnly',
}

export interface MetaData {
    uri: string;
    title: string;
    time: number;
    type: PostType;
    linkTitle?: string;
    linkUrl?: string;
    image?: string;
    tags?: Array<string>;
}

interface Post extends MetaData {
    imagePath?: string | null;
    body: string;
}

export default Post;
