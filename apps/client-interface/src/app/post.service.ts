import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreatePostDto {
  title: string;
  content: string;
  attachments?: string[];
}

export interface PostDto {
  id: string;
  title: string;
  content: string;
  attachments?: string[];
  userId: string;
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

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = '/api/social/post';

  constructor(private http: HttpClient) { }

  createPost(postDto: CreatePostDto): Observable<PostDto> {
    return this.http.post<PostDto>(this.baseUrl, postDto);
  }

  getPost(id: string): Observable<PostDto> {
    return this.http.get<PostDto>(`${this.baseUrl}/${id}`);
  }

  updatePost(id: string, updatePostDto: UpdatePostDto): Observable<PostDto> {
    return this.http.put<PostDto>(`${this.baseUrl}/update/${id}`, updatePostDto);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchPosts(searchCriteria: SearchPostDto): Observable<PostDto[]> {
    return this.http.post<PostDto[]>(`${this.baseUrl}/find`, searchCriteria);
  }
}
