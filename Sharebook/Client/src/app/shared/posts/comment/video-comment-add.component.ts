import {Observable} from 'rxjs';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostComment} from "../../shared-post-comment/post-comment";
import {FormReactive} from "../../forms/form-reactive";
import {User} from "../../shared-main/user/user.model";
import {Post} from "../../shared-main/post/post.model";
import {FormValidatorService} from "../../forms/form-validator.service";
import {Notifier} from "../../../core/notification/notifier.service";
import {VideoCommentService} from "../../shared-post-comment/video-comment.service";
import {VIDEO_COMMENT_TEXT_VALIDATOR} from "../../forms/form-validators/video-comment-validators";
import {IPostCommentCreate} from "../../shared-post-comment/models/post-comment-model";

@Component({
  selector: 'app-video-comment-add',
  templateUrl: './video-comment-add.component.html',
  styleUrls: ['./video-comment-add.component.scss']
})
export class VideoCommentAddComponent extends FormReactive implements OnChanges, OnInit {
  @Input() user: User;
  @Input() video: Post;
  @Input() parentComment?: PostComment;
  @Input() parentComments?: PostComment[];
  @Input() focusOnInit = false;
  @Input() textValue?: string;

  @Output() commentCreated = new EventEmitter<PostComment>();
  @Output() cancel = new EventEmitter();

  @ViewChild('visitorModal', {static: true}) visitorModal: NgbModal;
  @ViewChild('emojiModal', {static: true}) emojiModal: NgbModal;
  @ViewChild('textarea', {static: true}) textareaElement: ElementRef;

  addingComment = false;
  addingCommentButtonValue: string;

  constructor(
    protected formValidatorService: FormValidatorService,
    private notifier: Notifier,
    private videoCommentService: VideoCommentService,
    private modalService: NgbModal,
    private router: Router) {
    super();
  }

  get emojiMarkupList() {
    const emojiMarkupObjectList = require('markdown-it-emoji/lib/data/light.json');

    // Populate emoji-markup-list from object to array to avoid keys alphabetical order
    const emojiMarkupArrayList = [];
    for (const emojiMarkupName in emojiMarkupObjectList) {
      if (emojiMarkupName) {
        const emoji = emojiMarkupObjectList[emojiMarkupName];
        emojiMarkupArrayList.push([emoji, emojiMarkupName]);
      }
    }

    return emojiMarkupArrayList;
  }

  ngOnInit() {
    this.buildForm({
      text: VIDEO_COMMENT_TEXT_VALIDATOR
    });

    if (this.user) {
      if (!this.parentComment) {
        this.addingCommentButtonValue = `Comment`;
      } else {
        this.addingCommentButtonValue = `Reply`;
      }

      this.initTextValue();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.textValue && changes.textValue.currentValue && changes.textValue.currentValue !== changes.textValue.previousValue) {
      this.patchTextValue(changes.textValue.currentValue, true);
    }
  }

  onValidKey() {
    this.check();
    if (!this.form.valid) return;

    this.formValidated();
  }

  openVisitorModal(event: any) {
    if (this.user === null) { // we only open it for visitors
      // fixing ng-bootstrap ModalService and the "Expression Changed After It Has Been Checked" Error
      event.srcElement.blur();
      event.preventDefault();

      this.modalService.open(this.visitorModal);
    }
  }

  openEmojiModal(event: any) {
    event.preventDefault();
    this.modalService.open(this.emojiModal, {backdrop: true, size: 'lg'});
  }

  hideModals() {
    this.modalService.dismissAll();
  }

  formValidated() {
    // If we validate very quickly the comment form, we might comment twice
    if (this.addingComment) return;

    this.addingComment = true;

    const commentCreate: IPostCommentCreate = this.form.value;
    let obs: Observable<PostComment>;

    if (this.parentComment) {
      obs = this.addCommentReply(commentCreate);
    } else {
      obs = this.addCommentThread(commentCreate);
    }

    obs.subscribe(
      comment => {
        this.addingComment = false;
        this.commentCreated.emit(comment);
        this.form.reset();
      },

      err => {
        this.addingComment = false;

        this.notifier.error(err.text);
      }
    );
  }

  isAddButtonDisplayed() {
    return this.form.value['text'];
  }

  getUri() {
    return window.location.href;
  }

  getAvatarUrl() {
    if (this.user) {
      return this.user.picture;
    }

    return User.GET_DEFAULT_AVATAR_URL();
  }

  gotoLogin() {
    this.hideModals();
    this.router.navigate(['/login']);
  }

  cancelCommentReply() {
    this.cancel.emit(null);
    this.form.value['text'] = this.textareaElement.nativeElement.value = '';
  }

  private addCommentReply(commentCreate: IPostCommentCreate) {
    return this.videoCommentService
      .addCommentReply(this.video.id, this.parentComment.id, commentCreate);
  }

  private addCommentThread(commentCreate: IPostCommentCreate) {
    return this.videoCommentService
      .addCommentThread(this.video.id, commentCreate);
  }

  private initTextValue() {
    if (this.textValue) {
      this.patchTextValue(this.textValue, this.focusOnInit);
      return;
    }

    if (this.parentComment) {
      const mentions = this.parentComments
        .filter(c => c.user && c.user.id !== this.user.id) // Don't add mention of ourselves
        .map(c => '@' + c.by);

      const mentionsSet = new Set(mentions);
      const mentionsText = Array.from(mentionsSet).join(' ') + ' ';

      this.patchTextValue(mentionsText, this.focusOnInit);
    }
  }

  private patchTextValue(text: string, focus: boolean) {
    setTimeout(() => {
      if (focus) {
        this.textareaElement.nativeElement.focus();
      }

      // Scroll to textarea
      this.textareaElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});

      // Use the native textarea autosize according to the text's break lines
      this.textareaElement.nativeElement.dispatchEvent(new Event('input'));
    });

    this.form.patchValue({text});
  }
}