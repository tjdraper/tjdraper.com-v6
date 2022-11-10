enum PostType {
    article = 'article',
    linkedList = 'linkedList',
    photoEntry = 'photoEntry',
    photosOnly = 'photosOnly',
}

export interface MetaData {
    uri: string;
    title: string;
    isPublished: boolean;
    time: number;
    type: PostType;
    linkTitle?: string;
    linkUrl?: string;
}

interface Post extends MetaData {
    body: string;
}

export default Post;
