import { marked } from 'marked';
import Image from 'next/image';
import widont from 'widont';
import IndexData from './BlogData/IndexData';
import * as PageData from './PageData.md';
import Pagination from '../Pagination/Pagination';
import CustomPage, { ComponentType } from '../CustomPage';
import TagsMarkup from './TagsMarkup';
import Breadcrumbs, { Breadcrumb } from '../Layout/Breadcrumbs';

interface PageDataMarkdown {
    heading: string;
    tagHeading: string;
}

const BlogListing: CustomPage = (
    {
        indexData,
        tag,
    }: {
        indexData: IndexData;
        tag?: string | null | undefined;
    },
) => {
    const data = PageData as unknown as PageDataMarkdown;

    let breadcrumbs = [{ name: 'Blog' }] as Array<Breadcrumb>;

    let basePath = '/blog';

    if (tag) {
        basePath += `/tag/${tag.split(' ').join('-')}`;
    }

    if (indexData.currentPageNum > 1) {
        breadcrumbs = [
            {
                name: 'Blog',
                href: '/blog',
            },
        ];

        if (tag) {
            breadcrumbs.push({
                name: `Tagged ${tag}`,
                href: `/blog/tag/${tag.split(' ').join('-')}`,
            });
        }

        breadcrumbs.push({ name: `Page ${indexData.currentPageNum}` });
    } else if (tag) {
        breadcrumbs = [
            {
                name: 'Blog',
                href: '/blog',
            },
        ];

        breadcrumbs.push({ name: `Tagged ${tag}` });
    }

    let { heading } = data;

    if (tag) {
        heading = data.tagHeading.replace('{tag}', tag);
    }

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="relative px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        <h2
                            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                            dangerouslySetInnerHTML={{ __html: String(widont(marked.parseInline(heading))).toString() }}
                        />
                    </div>
                    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                        {indexData.posts.map((post) => {
                            const { yyyy, mm, dd } = post;

                            const date = new Date(`${yyyy}-${mm}-${dd}T13:00:00`);

                            const author = post.author || 'TJ';

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

                                            return <div className="bg-gray-100 h-48 w-full object-cover" />;
                                        })()}
                                    </a>
                                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                {(() => {
                                                    if (!post.tags || post.tags?.length < 1) {
                                                        return '';
                                                    }

                                                    return <TagsMarkup tags={post.tags} />;
                                                })()}
                                            </p>
                                            <a href={post.uri} className="mt-2 block group">
                                                <p
                                                    className="text-xl font-semibold text-gray-900 group-hover:text-tjd-red-500"
                                                    dangerouslySetInnerHTML={{ __html: String(widont(marked.parseInline(post.title))).toString() }}
                                                />
                                                {/* <p className="mt-3 text-base text-gray-500">excerpt</p> */}
                                            </a>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Posted by
                                                        {' '}
                                                        {author}
                                                    </p>
                                                    <time dateTime={`${yyyy}-${mm}-${dd}`}>
                                                        {date.toLocaleDateString()}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-16">
                        <Pagination
                            parameters={{
                                currentPageNum: indexData.currentPageNum,
                                totalPages: indexData.totalPages,
                                basePath,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

BlogListing.type = ComponentType.standardPage;

BlogListing.defaultProps = {
    tag: undefined,
};

export default BlogListing;
