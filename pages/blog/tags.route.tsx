import { ChevronRightIcon } from '@heroicons/react/20/solid';
import CustomPage, { ComponentType } from '../CustomPage';
import getPostsFromIndexCache from './BlogData/getPostsFromIndexCache';
import Breadcrumbs from '../Layout/Breadcrumbs';
import slugifyTag from './BlogData/SlugifyTag';

type Tags = { [key: string]: {
    name: string;
    slug: string;
    totalEntries: number;
}; };

export async function getStaticProps () {
    const results = await getPostsFromIndexCache({
        limit: 999999999999999,
    });

    const unorderedTags = {} as Tags;

    results.posts.forEach((post) => {
        post.tags?.forEach((tag) => {
            const tagLower = tag.toLowerCase();

            unorderedTags[tagLower] = unorderedTags[tagLower] || {
                name: tag,
                slug: slugifyTag(tag),
                totalEntries: 0,
            };

            unorderedTags[tagLower].totalEntries += 1;
        });
    });

    const keys = Object.keys(unorderedTags);

    keys.sort();

    const tags = {} as Tags;

    keys.forEach((key) => {
        tags[key] = unorderedTags[key];
    });

    return {
        props: {
            tags,
        },
    };
}

const Page: CustomPage = ({ tags }: { tags: Tags }) => (
    <>
        <Breadcrumbs breadcrumbs={[
            {
                name: 'Blog',
                href: '/blog',
            },
            {
                name: 'Tags',
            },
        ]}
        />
        <div className="relative px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pb-28">
            <div className="relative mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Blog Tags
                    </h2>
                </div>
                <div className="mx-auto mt-12 grid max-w-lg">
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {Object.keys(tags).map((tagKey) => {
                                const tag = tags[tagKey];

                                return (
                                    <li key={`tag-${tag.slug}`}>
                                        <a
                                            href={`/blog/tag/${tag.slug}`}
                                            className="block hover:bg-gray-50"
                                        >
                                            <div className="flex items-center px-4 py-4 sm:px-6">
                                                <div className="flex min-w-0 flex-1 items-center">
                                                    <div
                                                        className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4"
                                                    >
                                                        <div>
                                                            <p className="truncate text-sm font-medium text-tjd-red-500">
                                                                {tag.name}
                                                            </p>
                                                        </div>
                                                        <div className="hidden md:block">
                                                            <div>
                                                                <p className="text-sm text-gray-900">
                                                                    Total Entries:
                                                                    {' '}
                                                                    {tag.totalEntries}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <ChevronRightIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
);

Page.type = ComponentType.standardPage;

export default Page;
