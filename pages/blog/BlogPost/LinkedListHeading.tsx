import { MetaData } from '../BlogData/Post';

const Component = (
    { metaData }:
    { metaData: MetaData },
) => {
    if (!metaData.linkUrl || !metaData.linkTitle) {
        return null;
    }

    return (
        <div className="prose">
            <a
                href={metaData.linkUrl}
                className="font-bold text-xl"
            >
                {metaData.linkTitle}
                {' '}
                &rarr;
            </a>
        </div>
    );
};

export default Component;
