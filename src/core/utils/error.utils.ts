import { ValidationError } from '../../videos/types/validationError';

export const CreateErrorMessages = (
    errors: ValidationError[],
): { errorsMessages: ValidationError[] } => {
    return { errorsMessages: errors };
};