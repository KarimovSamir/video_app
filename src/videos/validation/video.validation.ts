import { VideoInputDto } from "../dto/video.input-dto";
import { ValidationError } from "../types/validationError";
import { VideoResolutions } from '../types/video';

export const videoValidation = (data: VideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }

    if (
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }

    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'boolean') {
        errors.push({ field: 'canBeDownloaded', message: 'Invalid canBeDownloaded' });
    }

    if (
        data.minAgeRestriction !== undefined &&
        data.minAgeRestriction !== null &&
        (
            typeof data.minAgeRestriction !== 'number' ||
            !Number.isInteger(data.minAgeRestriction) ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18
        )
    ) {
        errors.push({ field: 'minAgeRestriction', message: 'Invalid minAgeRestriction' });
    }

    if (data.publicationDate !== undefined) {
        if (typeof data.publicationDate !== 'string' ||
            Number.isNaN(Date.parse(data.publicationDate))) {
            errors.push({ field: 'publicationDate', message: 'Invalid publicationDate' });
        }
    }

    if (data.availableResolutions !== undefined) {
        const allowed = Object.values(VideoResolutions) as string[];
        if (
            !Array.isArray(data.availableResolutions) ||
            data.availableResolutions.some((r) => !allowed.includes(r))
        ) {
            errors.push({
                field: 'availableResolutions',
                message: 'availableResolutions must be array of allowed values',
            });
        }
    }

    return errors;
};