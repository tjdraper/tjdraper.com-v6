import slugifyTag from './BlogData/SlugifyTag';

const TagsMarkup = ({ tags }: { tags: Array<string> }) => (
    <>
        Tags:
        {' '}
        {tags.map((tag, index) => (
            <span key={`blog-tag-${tag}`}>
                {index !== 0 && ', '}
                <a
                    href={`/blog/tag/${slugifyTag(tag)}`}
                    className="text-tjd-red-500 hover:underline"
                >
                    {tag}
                </a>
            </span>
        ))}
    </>
);

export default TagsMarkup;
