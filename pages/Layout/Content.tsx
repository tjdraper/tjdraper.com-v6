import { marked } from 'marked';

const Content = (
    {
        heading,
        children,
    }: {
        heading?: {
            preHeading?: string;
            heading?: string;
            content?: string;
        };
        children?: JSX.Element | JSX.Element[] | string | string[];
    },
) => {
    const hasHeading = heading?.preHeading
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
                                                <span className="block text-center text-lg font-semibold text-tjd-red-500">
                                                    {marked.parseInline(heading.preHeading)}
                                                </span>
                                            );
                                        })()}
                                        {(() => {
                                            if (!heading.heading) {
                                                return null;
                                            }

                                            return (
                                                <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                                                    {marked.parseInline(heading.heading)}
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
                                    <p className="mt-8 text-xl leading-8 text-gray-500">
                                        {marked.parseInline(heading.content)}
                                    </p>
                                );
                            })()}
                        </div>
                    );
                })()}
                <div className="py-8">
                    <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
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
