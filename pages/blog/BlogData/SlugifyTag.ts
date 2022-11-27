const slugifyTag = (tag: string) => tag
    .split(' ').join('-')
    .split('/').join('_');

export const deSlugifyTag = (tagSlug: string) => tagSlug
    .split('-').join(' ')
    .split('_').join('/');

export default slugifyTag;
