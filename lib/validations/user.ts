import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string({
        required_error: "Image path is required",
        invalid_type_error: "Image path must be a string",
     }).url(),
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    bio: z.string().min(3).max(1000),
})