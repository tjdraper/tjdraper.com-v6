import Image from 'next/image';
import { NextPage } from 'next';
import { marked } from 'marked';
import AppShell from './Layout/AppShell';
import FamilyBanner from './index/index-family-banner.jpg';
import * as PageData from './index/PageData.md';
import Content from './Layout/Content';

interface IndexPageData {
    heading: string;
    subHeading: string;
    subHeading2: string;
}

const Page: NextPage = () => {
    const data = PageData as unknown as IndexPageData;

    return (
        <AppShell>
            <div className="mx-auto mt-2 max-w-7xl px-4 sm:mt-4 sm:px-6">
                <div className="text-center">
                    <h1 className="mx-auto max-w-2xl tracking-tight text-gray-900">
                        <span className="block font-bold text-4xl sm:text-5xl mb-3">
                            {marked.parseInline(data.heading)}
                        </span>
                        <span className="block text-tjd-red-500 text-md sm:text-xl">
                            {marked.parseInline(data.subHeading)}
                        </span>
                    </h1>
                    <p className="mx-auto mt-2 max-w-md text-base text-gray-500 sm:text-lg md:mt-3 md:max-w-4xl">
                        {marked.parseInline(data.subHeading2)}
                    </p>
                </div>
            </div>
            <div className="relative py-6">
                <div className="absolute inset-0 flex flex-col" aria-hidden="true">
                    <div className="flex-1" />
                    <div className="w-full flex-1 bg-gray-800" />
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <Image
                        src={FamilyBanner}
                        alt="The Draper Family"
                        className="relative rounded-lg shadow-lg"
                        priority
                    />
                </div>
            </div>
            <Content>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <PageData.default />
            </Content>
        </AppShell>
    );
};

export default Page;
