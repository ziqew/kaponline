import { Component, OnInit } from '@angular/core';

import { User, PasswordResetService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-user-mgmt-reset-dialog',
    templateUrl: './user-management-reset-dialog.component.html'
})
export class UserMgmtResetDialogComponent implements OnInit {
    user: User;
    resetLink: string;
    showClipboardSuccess: boolean;
    showClipboardError: boolean;
    isGeneratingLink: boolean;

    constructor(private passwordResetService: PasswordResetService, public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.resetLink = '';
        this.showClipboardSuccess = false;
        this.showClipboardError = false;
        this.isGeneratingLink = false;
    }

    generateResetLink(email: string) {
        this.isGeneratingLink = true;
        this.passwordResetService.getResetLink(email).subscribe(
            value => {
                this.resetLink = value;
                this.isGeneratingLink = false;
            },
            () => {
                this.isGeneratingLink = false;
            }
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
