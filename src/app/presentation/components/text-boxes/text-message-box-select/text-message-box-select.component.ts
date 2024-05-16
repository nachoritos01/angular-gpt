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
interface Option{
  id: string;
  text: string;
}
export interface TextMessageBoxEvet  {
  prompt: string;
  selectedOption:string;
}
@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box-select.component.html',
  styleUrl: './text-message-box-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {
  @Input() placeholder: string = 'Type a message';
  @Input({ required:true}) options: Option[] = [];
  @Output() onMessage = new EventEmitter<TextMessageBoxEvet>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required],
  });

  public handlesubmit() {
    if (this.form.invalid) return;
    const { prompt , selectedOption} = this.form.value;
    this.onMessage.emit({ prompt: prompt!, selectedOption: selectedOption!});
    this.form.reset();
  }
}
