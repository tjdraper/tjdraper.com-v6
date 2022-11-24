import Image from 'next/image';
import widont from 'widont';
import { marked } from 'marked';
import TagsMarkup from './TagsMarkup';
import Post from './BlogData/Post';

const BlogListingCard = ({ post }: { post: Post }) => {
    const { yyyy, mm, dd } = post;

    const date = new Date(`${yyyy}-${mm}-${dd}T13:00:00`);

    const author = post.author || 'TJ';

    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
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

                    return (
                        <div
                            className="bg-gray-100 h-48 w-full object-cover"
                        />
                    );
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
};

export default BlogListingCard;
