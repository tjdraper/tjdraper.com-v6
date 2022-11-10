import Image from 'next/image';
import { marked } from 'marked';
import Link from 'next/link';
import AppShell from '../Layout/AppShell';
import { getIndexData } from './BlogData';
import IndexData from './BlogData/IndexData';
import * as PageData from './PageData.md';

export async function getStaticProps () {
    return {
        props: {
            indexData: await getIndexData(),
        },
    };
}

interface PageDataMarkdown {
    heading: string;
}

const Page = (
    {
        indexData,
    }: {
        indexData: IndexData;
    },
) => {
    const data = PageData as unknown as PageDataMarkdown;

    return (
        <AppShell pageTitle="Blog">
            <div className="relative px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {marked.parseInline(data.heading)}
                        </h2>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                        {indexData.posts.map((post) => {
                            const { yyyy, mm, dd } = post;

                            const date = new Date(`${yyyy}-${mm}-${dd}T13:00:00`);

                            return (
                                <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                                    <a href={post.uri} className="block flex-shrink-0">
                                        {(() => {
                                            if (post.imagePath) {
                                                return (
                                                    <Image
                                                        width={414}
                                                        height={414}
                                                        src={post.imagePath}
                                                        alt={post.title}
                                                        className="h-48 w-full object-cover"
                                                        priority
                                                    />
                                                );
                                            }

                                            return <div className="bg-tjd-red-100 h-48 w-full object-cover" />;
                                        })()}
                                    </a>
                                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                {(() => {
                                                    if (!post.tags || post.tags?.length < 1) {
                                                        return '';
                                                    }

                                                    return (
                                                        <>
                                                            Tags:
                                                            {' '}
                                                            {post.tags.map((tag, index) => (
                                                                <span key={`blog-tag-${tag}`}>
                                                                    {index !== 0 && ', '}
                                                                    <Link
                                                                        href={`/blog/tag/${tag}`}
                                                                        className="text-tjd-red-500 hover:underline"
                                                                    >
                                                                        {tag}
                                                                    </Link>
                                                                </span>
                                                            ))}
                                                        </>
                                                    );
                                                })()}
                                            </p>
                                            <a href={post.uri} className="mt-2 block group">
                                                <p className="text-xl font-semibold text-gray-900 group-hover:text-tjd-red-500">
                                                    {post.title}
                                                </p>
                                                {/* <p className="mt-3 text-base text-gray-500">excerpt</p> */}
                                            </a>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <time dateTime={`${yyyy}-${mm}-${dd}`}>
                                                    {date.toLocaleDateString()}
                                                </time>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppShell>
    );
};

export default Page;
