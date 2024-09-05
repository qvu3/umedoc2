import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})
export class SelectLanguageComponent implements OnInit, AfterViewInit {
  @Input() colClass:string="col-md-3 col-6";
  constructor(private translateService: TranslateService) { }
  lang: string = 'en';

  ngOnInit(): void {
    this.getLang();
  }

  ngAfterViewInit() {

  }

  changeLanguage() {
    this.lang = this.lang ?? 'en';
    sessionStorage.setItem('lang', this.lang ?? 'en');
    this.translateService.use(this.lang);
  }

  getLang() {
    this.lang = sessionStorage.getItem('lang') ?? 'en';
    this.translateService.use(this.lang);
  }

}
