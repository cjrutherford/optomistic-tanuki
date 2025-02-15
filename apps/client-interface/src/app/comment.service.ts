import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = '/api/social/comment';

  constructor(private http: HttpClient) { }

  createComment(commentDto: CreateCommentDto): Observable<CommentDto> {
    return this.http.post<CommentDto>(this.baseUrl, commentDto);
  }

  getComment(id: string): Observable<CommentDto> {
    return this.http.get<CommentDto>(`${this.baseUrl}/${id}`);
  }

  updateComment(id: string, updateCommentDto: UpdateCommentDto): Observable<CommentDto> {
    return this.http.put<CommentDto>(`${this.baseUrl}/update/${id}`, updateCommentDto);
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchComments(searchCriteria: SearchCommentDto): Observable<CommentDto[]> {
    return this.http.post<CommentDto[]>(`${this.baseUrl}/find`, searchCriteria);
  }
}
