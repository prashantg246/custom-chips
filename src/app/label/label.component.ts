import { Component, OnInit } from '@angular/core';
type Lable = {
  name: string;
  isSelected: boolean;
};
@Component({
  selector: '[label]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
})
export class LabelComponent implements OnInit {
  constructor() {}
  public isInputFocussed = false;
  public labels: Lable[] = [
    { name: 'Test1', isSelected: false },
    { name: 'Test2', isSelected: false },
    { name: 'Test3', isSelected: false },
  ];
  public selectedLabels: Lable[] = [];
  ngOnInit() {}

  private onEnter(input: HTMLInputElement) {
    if (input.value) {
      const newLabel: Lable = { isSelected: true, name: input.value };
      this.selectedLabels.push(newLabel);
      input.value = '';
    }
  }

  protected onDelete(index: number) {
    console.log(index, 'test');
    let newLabels = [];
    this.selectedLabels.forEach((label: Lable, labelIndex: number) => {
      index != labelIndex && newLabels.push(label);
    });
    this.selectedLabels = newLabels;
  }

  onSelect(index: number, input: HTMLInputElement) {
    console.log(index);
    if (this.labels.length && this.labels[index]) {
      //@TODO check if already exists
      this.selectedLabels.push({ ...this.labels[index], isSelected: true });
      input.value = '';
    }
  }

  onFocus(event?: any) {
    if (event) {
      this.isInputFocussed = true;
    } else {
      setTimeout(() => {
        this.isInputFocussed = false;
      }, 300);
    }
  }

  protected onValueChange(event: any, input: HTMLInputElement) {
    console.log(event);
    if (!input.value && event && event.key === 'Backspace') {
      console.log('delete');
      this.onDelete(this.selectedLabels.length - 1);
    } else if (event && event.key === 'Enter') {
      this.onEnter(input);
    } else {
      //@TODO will use debounce
      const newLabel: Lable = { isSelected: false, name: input.value };
      input.value && this.labels.push(newLabel);
    }
  }
}
