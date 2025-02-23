
import { AttachmentDto, CommentDto } from '.';


export interface CreatePostDto {
    title: string;
    content: string;
    attachments?: string[];
  }
  
  export interface PostDto {
    id: string;
    title: string;
    content: string;
    attachments?:AttachmentDto[];
    userId: string;
    createdAt: Date;
    links?: { url: string }[];
    comments?: CommentDto[];
  }
  
  export interface UpdatePostDto {
    title?: string;
    content?: string;
    attachments?: string[];
  }
  
  export interface SearchPostDto {
    title?: string;
    content?: string;
    userId?: string;
  }