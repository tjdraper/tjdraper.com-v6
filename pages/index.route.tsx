import Image from 'next/image';
import { NextPage } from 'next';
import { marked } from 'marked';
import AppShell from './Layout/AppShell';
import FamilyBanner from './index-family-banner.jpg';

const Page: NextPage = () => (
    <AppShell>
        <div className="mx-auto mt-2 max-w-7xl px-4 sm:mt-4 sm:px-6">
            <div className="text-center">
                <h1 className="tracking-tight text-gray-900">
                    <span className="block font-bold text-4xl sm:text-5xl mb-2">TJ Draper</span>
                    <span className="block text-tjd-red-500 text-2xl sm:text-3xl">Christian, family man, software engineer, nerd</span>
                </h1>
                <p
                    className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
                    dangerouslySetInnerHTML={{ __html: marked.parseInline('Here you\'ll find an eclectic collection of writings on software, technology, theology, musings, and information about me and my family.') }}
                />
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
                />
            </div>
        </div>
    </AppShell>
);

export default Page;
