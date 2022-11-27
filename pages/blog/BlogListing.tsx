import { marked } from 'marked';
import widont from 'widont';
import IndexData from './BlogData/IndexData';
import * as PageData from './PageData.md';
import Pagination from '../Pagination/Pagination';
import CustomPage, { ComponentType } from '../CustomPage';
import Breadcrumbs, { Breadcrumb } from '../Layout/Breadcrumbs';
import BlogListingCard from './BlogListingCard';
import slugifyTag from './BlogData/SlugifyTag';

interface PageDataMarkdown {
    heading: string;
    tagHeading: string;
}

export interface BlogListingProps {
    indexData: IndexData;
    tag?: string | null | undefined;
}

const BlogListing: CustomPage = (
    {
        indexData,
        tag,
    }: BlogListingProps,
) => {
    const data = PageData as unknown as PageDataMarkdown;

    let breadcrumbs = [{ name: 'Blog' }] as Array<Breadcrumb>;

    let basePath = '/blog';

    if (tag) {
        basePath += `/tag/${slugifyTag(tag)}`;
    }

    if (indexData.currentPageNum > 1) {
        breadcrumbs = [
            {
                name: 'Blog',
                href: '/blog',
            },
        ];

        if (tag) {
            breadcrumbs.push(
                {
                    name: 'Tags',
                    href: '/blog/tags',
                },
                {
                    name: `Tagged ${tag}`,
                    href: `/blog/tag/${slugifyTag(tag)}`,
                },
            );
        }

        breadcrumbs.push({ name: `Page ${indexData.currentPageNum}` });
    } else if (tag) {
        breadcrumbs = [
            {
                name: 'Blog',
                href: '/blog',
            },
            {
                name: 'Tags',
                href: '/blog/tags',
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
                        {indexData.posts.map((post) => (
                            <BlogListingCard
                                key={`blog-card-${post.uri}`}
                                post={post}
                            />
                        ))}
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
