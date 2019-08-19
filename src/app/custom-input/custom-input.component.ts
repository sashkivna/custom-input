import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
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
export class CustomInputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() ngModel;
  @Input() disabled;
  @Output() touched = new EventEmitter<boolean>();
  @Output() dissabled = new EventEmitter<boolean>();
  model: number;
  active: boolean;
  private jsonString: string;
  private parseError: boolean;
  private data: any;

  private propagateChange = (data: any) => {};

  public writeValue(obj: any) {
    if (obj) {
      this.data = obj;
      this.model = obj;
      this.jsonString =
        JSON.stringify(this.data, undefined, 4);
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {
  }

  private onChange(event) {
    this.propagateChange(this.data);
  }

  constructor() { }

  ngOnInit() {
    this.ngModel ? this.model = this.ngModel : this.model = 0;
    this.disabled === 'true' ? this.active = true : this.active = false;
    this.dissabled.emit(this.active);
  }

  increment(event) {
    this.touched.emit(true);
    this.registerOnTouched();
    this.registerOnChange(event);
    this.model++;
  }

  decrement(event) {
    this.touched.emit(true);
    this.registerOnTouched();
    this.registerOnChange(event);
    this.model--;
  }

  public validate(c: FormControl) {
    return (!this.parseError) ? null : {
      jsonParseError: {
        valid: false,
      },
    };
  }

  setDisabledState(isDisabled: boolean) {
   // this.renderer.setElementProperty(this.textInput.nativeElement, 'disabled', isDisabled);
    // disable other components here
  }
}
