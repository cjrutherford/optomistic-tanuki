import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'lib-confirm-block',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './confirm-block.component.html',
  styleUrls: ['./confirm-block.component.scss'],
})
export class ConfirmBlockComponent {
  confirmHeader: string = 'Confirm Your Email';
  confirmMessage: string = 'Please confirm your email address by clicking the link we sent to your email. If you did not receive the email, you can resend it below.';

  onResend() {
    // Logic to resend the confirmation email
  }
}
