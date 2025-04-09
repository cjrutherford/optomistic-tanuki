import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';
import { TextAreaComponent, TextInputComponent } from '@optomistic-tanuki/form-ui';

@Component({
  selector: 'lib-register-block',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, TextInputComponent, TextAreaComponent],
  templateUrl: './register-block.component.html',
  styleUrl: './register-block.component.scss',
})
export class RegisterBlockComponent {
  @Input() registerHeader = 'Register';
  @Input() registerButtonText = 'Register';
  @Input() callToAction = 'Join us on your journey';
  @Input() heroSource = 'https://source.unsplash.com/random/800x600/?nature,water'; 
  @Output() submit = new EventEmitter<{email: string; password: string, firstName: string, lastName: string, confirmation: string, bio: string}>();
  registerForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
      confirmation: this.fb.control(''),
      bio: this.fb.control(''),
    });
  }

  onFormChange(e: string) {
    console.log(e);
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.submit.emit(this.registerForm.value);
  }
}
