import Image from 'next/image';
import { MetaData } from '../BlogData/Post';
import Breadcrumbs from '../../Layout/Breadcrumbs';
import Content from '../../Layout/Content';
import TagsMarkup from '../TagsMarkup';
import LinkedListHeading from './LinkedListHeading';

const Page = (
    { metaData, children }:
    {
        metaData: MetaData;
        children?: JSX.Element | JSX.Element[] | string | string[];
    },
) => {
    const { yyyy, mm, dd } = metaData;

    const date = new Date(`${yyyy}-${mm}-${dd}T13:00:00`);

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                {
                    name: 'Blog',
                    href: '/blog',
                },
                { name: 'Post' },
            ]}
            />
            {(() => {
                if (!metaData.imagePath) {
                    return null;
                }

                return (
                    <div className="mx-auto max-w-5xl pt-8">
                        <Image
                            width={1024}
                            height={1024}
                            src={metaData.imagePath}
                            alt={metaData.title}
                            className="w-full rounded-lg"
                            priority
                        />
                    </div>
                );
            })()}
            <Content
                heading={{
                    preHeading: `Posted by TJ on ${date.toLocaleDateString()}`,
                    preHeading2: metaData.tags?.length
                        ? <TagsMarkup tags={metaData.tags} />
                        : null,
                    heading: metaData.title,
                }}
            >
                <>
                    <LinkedListHeading metaData={metaData} />
                    {children}
                </>
            </Content>
        </>
    );
};

Page.defaultProps = {
    children: undefined,
};
export default Page;
