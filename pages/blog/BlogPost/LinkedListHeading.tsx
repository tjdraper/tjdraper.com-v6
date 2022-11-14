import Link from 'next/link';
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
            <Link
                href={metaData.linkUrl}
                className="font-bold text-xl"
            >
                {metaData.linkTitle}
                {' '}
                &rarr;
            </Link>
        </div>
    );
};

export default Component;
