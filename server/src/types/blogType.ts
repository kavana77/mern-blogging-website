import {Document} from "mongoose"

export interface IBlog extends Document {
    title: string;
    firstLine: string;
    content: string;
    image: string;
    imagePublicId?: string;
    tags: string;
    category: string;
    author: {
        name: string;
        bio?: string;
        profilePic?: string;
        socialLinks?: {
            twitter?: string;
            github?: string;
            linkedin?: string;
        }
    }
    readingTime?: string;
    createdAt: Date;
    updatedAt?: Date;
}