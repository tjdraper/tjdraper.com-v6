import { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils';

interface ComponentProperties {
    raw?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomPage = ComponentProperties & NextComponentType<NextPageContext, any, any>;

export default CustomPage;
