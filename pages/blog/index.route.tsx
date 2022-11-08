import AppShell from '../Layout/AppShell';
import { getTotalPosts } from './BlogData';

export async function getStaticProps () {
    return {
        props: {
            totalPosts: await getTotalPosts(),
        },
    };
}

const Page = (
    {
        totalPosts,
    }: {
        totalPosts: number;
    },
) => (
    <AppShell pageTitle="Blog">
        <div>Hello World</div>
        <div>
            Total Posts:
            {' '}
            {totalPosts}
        </div>
    </AppShell>
);

export default Page;
