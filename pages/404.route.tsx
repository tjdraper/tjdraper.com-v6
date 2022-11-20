import Image from 'next/image';
import * as PageData from './404PageData.mdx';
import CustomPage, { ComponentType } from './CustomPage';
import Content from './Layout/Content';

interface CustomPageData {
    heading: string;
    image: string;
}

const Page: CustomPage = () => {
    const {
        heading,
        image,
    } = PageData as unknown as CustomPageData;

    return (
        <>
            {(() => {
                if (!image) {
                    return null;
                }

                return (
                    <div className="mx-auto max-w-5xl pt-8">
                        <Image
                            width={1024}
                            height={1024}
                            src={image}
                            alt={heading}
                            className="w-full rounded-lg"
                            priority
                        />
                    </div>
                );
            })()}
            <Content
                heading={{
                    heading,
                }}
            >
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <PageData.default />
            </Content>
        </>
    );
};

Page.type = ComponentType.standardPage;

export default Page;
