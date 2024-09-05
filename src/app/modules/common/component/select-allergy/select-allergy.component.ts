import { Component, OnInit, AfterViewInit, forwardRef, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Options } from 'select2';
import Global from 'src/app/Global';
import { AllergyAssignmentModel } from '../../models/allergy-info.model';

const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectAllergyComponent),
  multi: true
};
declare var $: any;
@Component({
  selector: 'app-select-allergy',
  templateUrl: './select-allergy.component.html',
  styleUrls: ['./select-allergy.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class SelectAllergyComponent implements OnInit, ControlValueAccessor {
  @Input() index: number;
  @Input() data: AllergyAssignmentModel;
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter();
  options: Options
  ajaxOptions: any;
  results = [];
  constructor() { }
  public value: any;
  private onTouch: any = () => { };
  private onModelChange: any = () => { };

  ngOnInit(): void {
    this.ajaxOptions = {
      url: `${Global.apiUrl}/api/PatientProfile/SearchAllergy`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'GET',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        return `q=${params.term}`;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        this.results = $.map(data, function (obj) {
          return { id: obj.Name, text: obj.Name, codeType: obj.CodeType, code: obj.Code };
        });
        return {
          results: this.results
        };
      }
    };

    this.options = {
      width: 'auto',
      minimumInputLength: 3,
      ajax: this.ajaxOptions,
      initSelection: (element, callback) => {
        if (this.data && this.data.Name) {
          var item = { id: this.data.Name, text: this.data.Name, codeType: this.data.CodeType, code: this.data.Code };
          callback(item);
        }
      }
    } as Options;


  }

  changeValue(event) {
    if (event) {
      let items = this.results.filter(x => x.id == event);
      if (items && items.length > 0) {
        let item = items[0];
        let allergy = new AllergyAssignmentModel();
        allergy.OnsetDate = new Date();
        allergy.Name = item.text;
        allergy.Code = item.code;
        allergy.CodeType = item.codeType;
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
