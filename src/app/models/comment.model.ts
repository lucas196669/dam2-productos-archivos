export interface CommentModel {
  comments(comments: any): unknown; // O puedes llamarlo CommentModel
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  total: string
}