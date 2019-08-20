import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    }   ]
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  model: number;
  parseError: string;

  onChange = (value: number) => {};
  onTouch = () => {};

  public writeValue(model: number) {
    if (model) {
      this.model = model;
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched() {
    this.onTouch();
  }

  increment() {
    this.model++;
    this.onChange(this.model);
    this.onTouch();
  }

  decrement() {
    this.model--;
    this.onChange(this.model);
    this.onTouch();
  }

  public validate(c: FormControl) {
    return (!this.parseError) ? null : {
      jsonParseError: {
        valid: false,
      },
    };
  }

  setDisabledState(isDisabled: boolean) {
    // this.disabled = isDisabled;
  }
}
