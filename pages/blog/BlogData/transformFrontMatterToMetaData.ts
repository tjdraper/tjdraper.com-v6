import { MetaData } from './Post';

const transformFrontMatterToMetaData = (
    frontMatter: MetaData,
    uri: string,
): MetaData => {
    let imagePath = null;

    if (frontMatter.image) {
        const uriArray = uri.split('/');

        uriArray.pop();

        const uriDir = uriArray.join('/');

        imagePath = `/images${uriDir}/${frontMatter.image}`;
    }

    const uriParts = uri.split('/');

    const yyyy = uriParts[2];

    const mm = uriParts[3];

    const dd = uriParts[4];

    const slug = uriParts[5];

    return {
        ...frontMatter,
        imagePath,
        uri,
        yyyy,
        mm,
        dd,
        slug,
    };
};

export default transformFrontMatterToMetaData;
