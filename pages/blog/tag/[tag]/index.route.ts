import BlogListing, {BlogListingProps} from "../../BlogListing";
import {ParsedUrlQuery} from "querystring";
import {GetStaticPaths, GetStaticProps} from "next";
import {getIndexData} from "../../BlogData";
import getPostsFromIndexCache from "../../BlogData/getPostsFromIndexCache";
import slugifyTag, {deSlugifyTag} from "../../BlogData/SlugifyTag";

interface Props extends BlogListingProps {
    pageTitle: string;
}

interface Params extends ParsedUrlQuery {
    tag: string,
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const results = await getPostsFromIndexCache({
        limit: 999999999999999,
    });

    const tags = [] as Array<string>;

    results.posts.forEach((post) => {
        post.tags?.forEach((tag) => {
            if (tags.indexOf(tag) >= 0) {
                return;
            }

            tags.push(tag);
        });
    });

    const paths = [] as Array<{params: Params}>;

    tags.forEach((tag) => {
        paths.push({params: { tag: slugifyTag(tag) }});
    });

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
    { params}
) => {
    let tagSlug = params?.tag || '';
    let tag = deSlugifyTag(tagSlug);

    return {
        props: {
            indexData: await getIndexData({
                tag,
            }),
            pageTitle: `Tagged ${tag} | Blog`,
            tag,
        }
    };
}

export default BlogListing;
