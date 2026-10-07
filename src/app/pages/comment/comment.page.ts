import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/angular';
import { CommentModel } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ]
})
export class CommentsPage implements OnInit {
  private commentService = inject(CommentService);
  theme = inject(ThemeService);

  readonly pageSize = 10;
  comments = signal<CommentModel['comments']>([]);
  total = signal<number>(0);
  loading = signal(false);
  error = signal('');
  page = signal<number>(1);
  totalPages = computed(() => Math.ceil(this.total() / this.pageSize));

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.loading.set(true);
    this.error.set('');
    const skip = (this.page() - 1) * this.pageSize;

    this.commentService.getComment(this.pageSize, skip).subscribe({
      next: (response: CommentModel) => {
        this.comments.set(response.comments);
        this.total.set(Number(response.total));
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error(err);
        this.error.set('No se han podido cargar los comentarios.');
        this.loading.set(false);
      }
    });
  }

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
    this.loadComments();
  }
}