import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import Global, { RoleConstants } from 'src/app/Global';
import UserCriteria from 'src/app/modules/common/criterias/user.criteria';
import { UserService } from 'src/app/modules/common/services/user.service';
import { DatePipe } from '@angular/common';

declare var Bloodhound: any;
declare var Handlebars: any;
declare var $: any;
@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent extends BaseComponent implements OnInit {
  options: any;
  criteria: UserCriteria = new UserCriteria();
  searchText: string = '';
  @Output() onChangePassword:EventEmitter<boolean> = new EventEmitter();
  
  constructor(public authService: AuthenticationService,
    private userService: UserService,
    private datePipe: DatePipe,
    private router: Router) {
    super(authService);
    this.criteria.ItemPerPage = 100
  }

  ngOnInit() {
    this.registerSearch();
  }

  registerSearch() {
    let strUrl = `${Global.apiUrl}/api/User/SearchAllUser`;
    const datas = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: strUrl,
        prepare: function (query, settings) {
          this.searchText = query;
          settings.url = `${Global.apiUrl}/api/User/SearchAllUser?q=${query}`;
          if (this.currentUser && this.currentUser.access_token) {
            const headers = {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + ' ' + this.currentUser.access_token
            };
            settings.headers = headers;
          }
          return settings;
        }.bind(this),
        filter: function (data) {
          return data.Data;
        }
      }
    });
    datas.initialize();
    const typeAhead = $('#txtSearch').typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 3,
        tabAutocomplete: true,

      },
      {
        name: 'User',
        source: function show(q, cb, cba) {
          this.userService.SearchAllUser(q).subscribe(r => {
            cba(r);
          })
        }.bind(this),
        limit: 100,
        templates: {
          empty: [
            '<span class="col-md-12 text-center" style="width :100%">',
            '<b style="padding:5px;"> Not found any records</b>',
            '</span>'
          ].join('\n'),
          suggestion: function (data) {
            let template = '';
            let linkImage = data.ProfilePicture ? data.ProfilePicture : 'https://s3.amazonaws.com/zumedic-network-storage/User/Images/avatar.png';

            template += '<div class="row ml-0 mr-0">';
            template += '<div class="col-md-3">';
            template += '<img class="rounded-circle" style="width:30px;height:30px;" src="' + linkImage + '"/>';
            template += '</div>';
            template += '<div class="col-md-9 no-padding">';
            template += '<h6 class="col-md-12 text-bold-500"> ' + data.FullName + '</h6>';
            template += '<div class="col-md-12">' + (data.BirthDate ? `${this.datePipe.transform(data.BirthDate, 'dd/MM/yyyy')}` : '') + '</div>';
            template += '</div>';
            template += '</div>';
            return template;
          }.bind(this)
        }
      }
    );
    typeAhead.bind('typeahead:selected', (obj, selected, name) => {
      if (selected) {
        $('#txtSearch').typeahead('val', ''); 
      }
      $('#typeaheadInput').typeahead('close');
      return false;
    });
    typeAhead.bind('typeahead:autocompleted', (obj, selected, name) => {
      if (selected) {
        $('#txtSearch').typeahead('val', '');
        this.router.navigate(['/', 'management', 'edit-client', selected.Id]);
      }
      $('#typeaheadInput').typeahead('close');
      return false;
    });
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate(['/']);
  }

  changepassword(){
    this.authService.onChangePassword.emit(true);
  }
}