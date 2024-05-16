import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
export interface TextMessageEvent {
  file: File;
  prompt?: string | null;
}
@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box-file.component.html',
  styleUrl: './text-message-box-file.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  @Input() placeholder: string = 'Type a message';
  @Output() onMessage = new EventEmitter<TextMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required],
  });
  public file: File | undefined = undefined;

  public handleSubmit() {
    if (this.form.invalid) return;
    const { prompt, file } = this.form.value;
    console.log(file, prompt);

    this.onMessage.emit({ file: file!, prompt });
    this.form.reset();
  }

  handleSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      console.log(file);
      this.form.controls.file.setValue(file);
      console.log(this.form.value);
    }
  }
}
