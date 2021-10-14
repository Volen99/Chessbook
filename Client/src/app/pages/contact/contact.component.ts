import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormReactive} from "../../shared/shared-forms/form-reactive";
import {FormValidatorService} from "../../shared/shared-forms/form-validator.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChatService} from "../../shared/shared-messages/chat.service";
import {ServerService} from "../../core/server/server.service";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {
    BODY_VALIDATOR,
    FROM_EMAIL_VALIDATOR, FROM_NAME_VALIDATOR,
    SUBJECT_VALIDATOR
} from "../../shared/shared-forms/form-validators/instance-validators";
import {HttpStatusCode} from "../../shared/core-utils/miscs";
import {ContactService} from "./contact.service";
import {Location} from "@angular/common";
import {UserStore} from "../../core/stores/user.store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../auth/components";
import {map, takeUntil} from "rxjs/operators";
import {NbMediaBreakpointsService} from "../../sharebook-nebular/theme/services/breakpoints.service";
import {NbThemeService} from "../../sharebook-nebular/theme/services/theme.service";
import {Subject} from "rxjs";

import {
    faTimes,
} from '@fortawesome/pro-light-svg-icons';

type Prefill = {
    fromName?: string
    fromEmail?: string
};

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
    contactForm: FormGroup;

    private destroy$: Subject<void> = new Subject<void>();

    get fromEmail() {
        return this.contactForm.get('fromEmail');
    }

    get fromName() {
        return this.contactForm.get('fromName');
    }

    get subject() {
        return this.contactForm.get('subject');
    }

    get body() {
        return this.contactForm.get('body');
    }

    constructor(protected formValidatorService: FormValidatorService,
                private router: Router,
                private modalService: NgbModal,
                private chatService: ChatService,
                private serverService: ServerService,
                private notifier: NbToastrService,
                private contactService: ContactService,
                private location: Location,
                private userStore: UserStore,
                private fb: FormBuilder,
                private breakpointService: NbMediaBreakpointsService,
                private themeService: NbThemeService,) {
    }

    ngOnInit(): void {
        this.contactForm = this.fb.group ({
            fromEmail: this.fb.control('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
            fromName: this.fb.control('', [Validators.minLength(2), Validators.maxLength(120)]),
            subject: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
            body: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(5000)]),
        });

        this.prefillForm();

        const {xl} = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$),
            )
            .subscribe((isLessThanXl: boolean) => {
                this.isLeftContainerHidden = isLessThanXl;
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    faTimes = faTimes;

    svgStyles = {
        'display': 'inline-block',
        'fill': 'currentcolor',
        'flex-shrink': '0',
        'width': '1.5em',
        'height': '1.5em',
        'max-width': '100% ',
        'position': 'relative',
        'vertical-align': 'text-bottom',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none',
    };

    error: string;
    isLeftContainerHidden = false;
    rightContainerStyles = {
      width: '100%',
    };

    sendForm() {
        const fromEmail = this.contactForm.get('fromEmail').value;
        const fromName = this.contactForm.get('fromName').value;
        const subject = this.contactForm.get('subject').value;
        const body = this.contactForm.get('body').value;

        this.contactService.sendMessage(fromEmail, fromName, subject, body)
            .subscribe({
                next: () => {
                    this.notifier.success('Your message has been sent.', `Success`);
                },
                error: err => {
                    this.error = err.status === HttpStatusCode.FORBIDDEN_403
                        ? `You already sent this form recently`
                        : err.message;
                }
            });
    }

    back() {
        this.location.back();
        return false;
    }

    private prefillForm() {
        let user = this.userStore.getUser();
        if (!user) {
            return;
        }

        this.contactForm.patchValue({
            fromEmail: user.email ?? '',
            fromName: user.screenName.substring(1) ?? '',
            subject: '',
            body: '',
        });

        // this.form.get('fromEmail').setValue(user.email);
        // this.form.get('fromName').setValue(user.screenName);
    }

}
