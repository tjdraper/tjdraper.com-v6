import { useRouter } from 'next/router';

interface Segments {
    [key: number]: string;
}

const useUri = (): {
    path: string;
    segments: Segments;
    segmentsZeroIndex: Array<string>;
} => {
    const router = useRouter();

    const path = router.pathname;

    const segments = {} as Segments;

    const segmentsZeroIndex = path.slice(1).split('/');

    segmentsZeroIndex.forEach((segment, i) => {
        segments[i + 1] = segment;
    });

    return {
        path,
        segments,
        segmentsZeroIndex,
    };
};

export default useUri;
