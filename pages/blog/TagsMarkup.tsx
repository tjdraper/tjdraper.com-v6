import Link from 'next/link';

const TagsMarkup = ({ tags }: { tags: Array<string> }) => (
    <>
        Tags:
        {' '}
        {tags.map((tag, index) => (
            <span key={`blog-tag-${tag}`}>
                {index !== 0 && ', '}
                <Link
                    href={`/blog/tag/${tag.split(' ').join('-')}`}
                    className="text-tjd-red-500 hover:underline"
                >
                    {tag}
                </Link>
            </span>
        ))}
    </>
);

export default TagsMarkup;
