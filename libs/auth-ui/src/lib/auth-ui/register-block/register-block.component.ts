import { Component, Input } from '@angular/core';
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
  @Input() registerHeader: string = 'Register';
  @Input() registerButtonText: string = 'Register';
  @Input() callToAction: string = 'Join us on your journey';
  @Input() heroSource: string = 'https://source.unsplash.com/random/800x600/?nature,water'; 
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

  onFormChange(e: string, control: string) {
    console.log(e);
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
