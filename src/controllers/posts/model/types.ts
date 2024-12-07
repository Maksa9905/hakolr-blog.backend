import { WithParams } from '#shared/types';

export type GetPostsParams = WithParams<{
    title: string;
    content: string;
}>