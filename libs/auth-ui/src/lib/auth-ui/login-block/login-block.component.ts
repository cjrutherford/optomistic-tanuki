import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent } from '@optomistic-tanuki/common-ui';
import { TextInputComponent } from '@optomistic-tanuki/form-ui';

@Component({
  selector: 'lib-login-block',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, TextInputComponent],
  templateUrl: './login-block.component.html',
  styleUrl: './login-block.component.scss',
})
export class LoginBlockComponent {
  @Input()  title = 'login-block works!'; 
  @Input()  description = 'login-block works!';
  @Input() heroSrc = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGxvZ298ZW58MHx8fHwxNjg3NTY5NzA1&ixlib=rb-4.0.3&q=80&w=1080';
  @Input() heroAlt = 'login-block works!';
  @Output() submit = new EventEmitter<{email: string; password: string}>();
  loginForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  onFormChange(e: string, control: string) {
    console.log(e);
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
