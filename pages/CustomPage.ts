import { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils';

export enum ComponentType {
    raw,
    standardPage,
    markdownPage,
}

interface ComponentProperties {
    type?: ComponentType;
    pageTitle?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomPage = ComponentProperties & NextComponentType<NextPageContext, any, any>;

export default CustomPage;
