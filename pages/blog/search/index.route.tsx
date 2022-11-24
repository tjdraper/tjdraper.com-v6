import { GetServerSideProps } from 'next';
import CustomPage, { ComponentType } from '../../CustomPage';
import SearchForm from './SearchForm';
import searchPosts from '../BlogData/searchPosts';
import { Results } from '../BlogData/getPosts';
import Breadcrumbs from '../../Layout/Breadcrumbs';
import BlogListingCard from '../BlogListingCard';

interface Props extends Results {
    searchTerm: string;
}

export const getServerSideProps: GetServerSideProps = async (
    { query },
) => {
    const { q } = query;

    const props = {
        searchTerm: '',
        totalPosts: 0,
        posts: [],
    } as Props;

    if (!q || typeof q !== 'string') {
        return {
            props,
        };
    }

    props.searchTerm = q;

    const results = await searchPosts(q);

    return {
        props: {
            ...props,
            ...results,
        },
    };
};

const Page: CustomPage = ({
    searchTerm,
    totalPosts,
    posts,
}: Props) => {
    if (!searchTerm) {
        return <SearchForm />;
    }

    let resultsText = 'result';

    if (totalPosts > 1 || totalPosts < 1) {
        resultsText += 's';
    }

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                {
                    name: 'Blog',
                    href: '/blog',
                },
                {
                    name: 'Search',
                },
            ]}
            />
            <SearchForm q={searchTerm} />
            <div className="relative px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Your search for &ldquo;
                            {searchTerm}
                            &rdquo; returned
                            {' '}
                            {totalPosts}
                            {' '}
                            {resultsText}
                            .
                        </h2>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogListingCard
                                key={`blog-card-${post.uri}`}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

Page.type = ComponentType.standardPage;

export default Page;
