import { Video, VideoResolutions } from '../videos/types/video';

export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'Tomb Raider',
            author: 'America',
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: '2025-09-13T11:22:33.456Z',
            publicationDate: '2025-09-13T11:22:33.456Z',
            availableResolutions: [VideoResolutions.P2160],
        },
        {
            id: 2,
            title: '3 Bogatirya',
            author: 'Russia',
            canBeDownloaded: false,
            minAgeRestriction: 8,
            createdAt: '2025-08-13T11:22:33.456Z',
            publicationDate: '2025-08-13T11:22:33.456Z',
            availableResolutions: [VideoResolutions.P720],
        },
    ],
};
