import BlogListing, {BlogListingProps} from "../../../BlogListing";
import {ParsedUrlQuery} from "querystring";
import {GetStaticPaths, GetStaticProps} from "next";
import {getIndexData} from "../../../BlogData";
import getPostsFromIndexCache from "../../../BlogData/getPostsFromIndexCache";
import slugifyTag, {deSlugifyTag} from "../../../BlogData/SlugifyTag";
import {DefaultPerPage} from "../../../BlogData/constants";

interface Props extends BlogListingProps {
    pageTitle: string;
}

interface Params extends ParsedUrlQuery {
    tag: string,
    pageNum: string,
}

type Tags = { [key: string]: {
    name: string;
    slug: string;
    totalEntries: number;
}; };

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const results = await getPostsFromIndexCache({
        limit: 999999999999999,
    });

    const tags = {} as Tags;

    results.posts.forEach((post) => {
        post.tags?.forEach((tag) => {
            const tagLower = tag.toLowerCase();

            tags[tagLower] = tags[tagLower] || {
                name: tag,
                slug: slugifyTag(tag),
                totalEntries: 0,
            }

            tags[tagLower].totalEntries += 1;
        });
    });

    const keys = Object.keys(tags);

    const paths = [] as Array<{params: Params}>;

    keys.forEach((key) => {
        const tag = tags[key];

        const totalPages = Math.ceil(tag.totalEntries / DefaultPerPage);

        if (totalPages < 2) {
            return;
        }

        let activePageNum = 2;

        while (activePageNum <= totalPages) {
            paths.push({
                params: {
                    tag: tag.slug,
                    pageNum: activePageNum.toString()
                }
            });

            activePageNum += 1;
        }
    })

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
    { params}
) => {
    const currentPageNum = parseInt(params?.pageNum || '0');
    const tagSlug = params?.tag || '';
    const tag = deSlugifyTag(tagSlug);

    return {
        props: {
            indexData: await getIndexData({
                currentPageNum,
                tag,
            }),
            pageTitle: `Page  | Tagged ${tag} | Blog`,
            tag,
        }
    };
}

export default BlogListing;
