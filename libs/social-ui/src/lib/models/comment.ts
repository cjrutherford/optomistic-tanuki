export interface CreateCommentDto {
    content: string;
    postId: string;
  }
  
  export interface CommentDto {
    id: string;
    content: string;
    postId: string;
    userId: string;
    
  }
  
  export interface UpdateCommentDto {
    content?: string;
  }
  
  export interface SearchCommentDto {
    content?: string;
    postId?: string;
    userId?: string;
  }