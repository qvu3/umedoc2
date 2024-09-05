import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as ClassicEditor from '../../../../../assets/ckeditor-custom-build/ckeditor';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Global from 'src/app/Global';
const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CkeditorClassicComponent),
  multi: true
};
@Component({
  selector: 'app-ckeditor-classic',
  templateUrl: './ckeditor-classic.component.html',
  styleUrls: ['./ckeditor-classic.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class CkeditorClassicComponent implements OnInit, ControlValueAccessor {
  public Editor = ClassicEditor
  public CKEditorConfig: any = {};
  public value: string;
  private onTouch: any = () => { };
  private onModelChange: any = () => { };
  @Input() allowUploadImage: boolean = true;
  editor: any;
  isFirst: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    var toolbar = ["undo", "redo", "bold", "italic", "blockQuote",
      "imageTextAlternative", "heading",
      , "|", 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight',
      '|', 'alignment',
      '|', "link", "numberedList",
      "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow",
      "mergeTableCells"];
    if (this.allowUploadImage) {
      toolbar.push("imageUpload")
    }
    this.CKEditorConfig = {
      "alignment": {
        options: ['left', 'right', 'center', 'justify']
      },
      "image": {
        // You need to configure the image toolbar, too, so it uses the new style buttons.
        toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],

        styles: [
          // This option is equal to a situation where no style is applied.
          'full',

          // This represents an image aligned to the left.
          'alignLeft',

          // This represents an image aligned to the right.
          'alignRight'
        ]
      },
      "toolbar": toolbar
    }
  }



  writeValue(obj: string): void {
    this.value = obj;
    this.onModelChange(obj);
    this.onTouch(obj);
    if (this.editor && this.isFirst && this.value) {
      this.editor.data.set(this.value);
      this.isFirst = false;
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onReady(editor) {
    this.editor = editor;
    this.isFirst = true;
    if (this.value) {
      this.editor.data.set(this.value);
    }else{
      this.editor.data.set('');
    }

    editor.model.document.on('change', (event) => {
      this.writeValue(editor.getData())
    });
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      return new UploadAdapter(loader, this.http, this.allowUploadImage);
    }

    class UploadAdapter {
      allowUploadImage: boolean = true;
      loader: any;
      url: string = `${Global.apiUrl}/api/utility/uploadImageArticle/`;
      constructor(loader, public http: HttpClient, allowUploadImage) {
        this.loader = loader;
        this.allowUploadImage = allowUploadImage;
      }

      upload() {
        return this.loader.file
          .then(file => new Promise(
            (resolve, reject) => {
              if (!this.allowUploadImage) {
                reject('');
              }
              if (file.size && file.size > 4000000) {
                reject('Please choose an image less than 4Mb!');
              }
              const data = new FormData();
              data.append('file', file);
              this.http.post(this.url, data).subscribe(r => {
                resolve({ default: r });
              },
                error => {
                  var strError = error && error.error ? error.error : `Could not  upload your Image,  please try  again.`
                  reject(strError);
                })
            })
          );
        // Perform uploading and return a promise to that action.
      }

      abort() {
        // Abort current upload process.
        console.log('abort');
      }
    }
  }
}
