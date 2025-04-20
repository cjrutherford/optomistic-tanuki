import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@optomistic-tanuki/form-ui';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';

@Component({
  selector: 'lib-mfa-block',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, ButtonComponent, CardComponent],
  templateUrl: './mfa-block.component.html',
  styleUrls: ['./mfa-block.component.scss'],
})
export class MfaBlockComponent {
  mfaForm: FormGroup;
  @Input() onboarding = false;
  @Input() qrCodeUrl = '';
  @Output() submitMfa = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.mfaForm = this.fb.group({
      token: ['']
    });
  }

  onSubmit() {
    const token = this.mfaForm.value.token;
    // Logic to handle the MFA token submission
    console.log('MFA Token Submitted:', token);
  }
}
