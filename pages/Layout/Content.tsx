import { marked } from 'marked';
import widont from 'widont';

const Content = (
    {
        heading,
        children,
    }: {
        heading?: {
            preHeading?: JSX.Element | JSX.Element[] | string | string[] | null;
            preHeading2?: JSX.Element | JSX.Element[] | string | string[] | null;
            heading?: JSX.Element | JSX.Element[] | string | string[] | null;
            content?: JSX.Element | JSX.Element[] | string | string[] | null;
        };
        children?: JSX.Element | JSX.Element[] | string | string[];
    },
) => {
    const hasHeading = heading?.preHeading
        || heading?.preHeading2
        || heading?.heading
        || heading?.content;

    const hasH1 = heading?.preHeading || heading?.heading;

    return (
        <div className="relative overflow-hidden bg-white">
            <div className="relative px-4 sm:px-6 lg:px-8">
                {(() => {
                    if (!hasHeading) {
                        return null;
                    }

                    return (
                        <div className="mx-auto max-w-prose text-lg py-8">
                            {(() => {
                                if (!hasH1) {
                                    return null;
                                }

                                return (
                                    <h1>
                                        {(() => {
                                            if (!heading.preHeading) {
                                                return null;
                                            }

                                            return (
                                                <span className="block text-center text-sm font-semibold text-tjd-red-500">
                                                    {(() => {
                                                        if (typeof heading.preHeading === 'string' || heading.preHeading instanceof String) {
                                                            const content = heading.preHeading as string;

                                                            return <span dangerouslySetInnerHTML={{ __html: String(widont(marked.parseInline(content))).toString() }} />;
                                                        }

                                                        return heading.preHeading;
                                                    })()}
                                                </span>
                                            );
                                        })()}
                                        {(() => {
                                            if (!heading.preHeading2) {
                                                return null;
                                            }

                                            return (
                                                <span className="block text-center text-sm font-semibold">
                                                    {(() => {
                                                        if (typeof heading.preHeading2 === 'string' || heading.preHeading2 instanceof String) {
                                                            const content = heading.preHeading2 as string;

                                                            return <span dangerouslySetInnerHTML={{ __html: String(widont(marked.parseInline(content))).toString() }} />;
                                                        }

                                                        return heading.preHeading2;
                                                    })()}
                                                </span>
                                            );
                                        })()}
                                        {(() => {
                                            if (!heading.heading) {
                                                return null;
                                            }

                                            return (
                                                <span className="mt-2 block text-center text-4xl font-bold leading-8 tracking-tight text-gray-900 sm:text-5xl">
                                                    {(() => {
                                                        if (typeof heading.heading === 'string' || heading.heading instanceof String) {
                                                            const content = heading.heading as string;

                                                            return <span dangerouslySetInnerHTML={{ __html: String(widont(marked.parseInline(content))).toString() }} />;
                                                        }

                                                        return heading.heading;
                                                    })()}
                                                </span>
                                            );
                                        })()}
                                    </h1>
                                );
                            })()}
                            {(() => {
                                if (!heading.content) {
                                    return null;
                                }

                                return (
                                    <p className="mt-8 text-xl leading-8 text-gray-800">
                                        {(() => {
                                            if (typeof heading.content === 'string' || heading.content instanceof String) {
                                                const content = heading.content as string;

                                                return <span dangerouslySetInnerHTML={{ __html: String(widont(marked.parseInline(content))).toString() }} />;
                                            }

                                            return heading.content;
                                        })()}
                                    </p>
                                );
                            })()}
                        </div>
                    );
                })()}
                <div className="py-8">
                    <div className="prose prose-lg mx-auto mt-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

Content.defaultProps = {
    heading: undefined,
    children: undefined,
};

export default Content;
