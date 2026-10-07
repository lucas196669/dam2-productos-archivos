import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentModel } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/comments';

  getComment(limit = 10, skip = 0): Observable<CommentModel> {
  return this.http.get<CommentModel>(this.apiUrl, { params: { limit, skip } });
}}
