import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Global from '../../../../Global';
import { AllergyAssignmentModel } from '../../models/allergy-info.model';
import { HttpClient } from '@angular/common/http';
import { debounceTime, switchMap, map } from 'rxjs/operators';

const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectAllergyComponent),
  multi: true
};

@Component({
  selector: 'app-select-allergy',
  templateUrl: './select-allergy.component.html',
  styleUrls: ['./select-allergy.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class SelectAllergyComponent implements OnInit, ControlValueAccessor {
  @Input() index!: number;
  @Input() data!: AllergyAssignmentModel;
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter();

  public value: any;
  public results: { id: string, text: string, codeType: number, code: string }[] = [];
  private onTouch: any = () => { };
  private onModelChange: any = () => { };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (this.data && this.data.Name) {
      this.value = { id: this.data.Name, text: this.data.Name, codeType: this.data.CodeType, code: this.data.Code };
    }
  }

  // Method to fetch results based on input value using HTTP request
  searchAllergies(term: string) {
    return this.http.get<any[]>(`${Global.apiUrl}/api/PatientProfile/SearchAllergy?q=${term}`).pipe(
      map((data) => {
        return data.map((obj) => ({
          id: obj.Name,
          text: obj.Name,
          codeType: obj.CodeType,
          code: obj.Code,
        }));
      })
    );
  }

  changeValue(event: any) {
    if (event) {
      const selectedItem = this.results.find(item => item.id === event.id);
      if (selectedItem) {
        const allergy = new AllergyAssignmentModel();
        allergy.OnsetDate = new Date();
        allergy.Name = selectedItem.text;
        allergy.Code = selectedItem.code;
        allergy.CodeType = selectedItem.codeType;
        allergy.Reaction = '';
        allergy.ReactionType = 1;
        allergy.StatusType = 1;
        this.writeValue(event);
        this.onValueChanged.emit({ index: this.index, data: allergy });
      }
    }
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.onModelChange(obj);
    this.onTouch(obj);
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
