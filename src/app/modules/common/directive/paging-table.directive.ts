import { Directive, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Global from '../../../Global';
import { CommonDialogService } from '../services/dialog.service';
declare var $: any;

@Directive({
  selector: '[appPagingTable]'
})
export class PagingTableDirective implements AfterViewInit {
  @Input() aoColumnDefs: any;
  @Input() aoColumns: any;
  @Input() aaSorting: any;
  @Input() extraParams: any;
  @Input()
  serverLink!: string;
  @Input() bServer: boolean = true;
  @Input() compRef: any;
  @Input()
  isFilter: boolean = false;
  @Input()
  isLengthChange: boolean = false;
  @Input() setCriteriaFn: any;
  @Input() isRowReorder: boolean = false;
  @Input() indexColReorder: number = 0;
  @Output() tableEvent: EventEmitter<any> = new EventEmitter();
  @Output() onFilterColumn: EventEmitter<any> = new EventEmitter();
  @Output() onCompletedSearch: EventEmitter<any> = new EventEmitter();
  table: any;
  url!: string;
  constructor(private ele: ElementRef, private http: HttpClient,private dialog:CommonDialogService) {

  }

  ngAfterViewInit() {
    this.url = `${Global.apiUrl}${this.serverLink}`;
    this.registertable();
    this.tableEvent.emit(this.table);
  }

  registertable() {
    this.table = $(this.ele.nativeElement).DataTable({
      responsive: true,
      isRowReorder: this.isRowReorder,
      "bProcessing": true,
      "sAjaxSource": this.bServer ? this.url : null,
      "sPaginationType": "simple_numbers",
      "aoColumns": this.aoColumns,
      "aoColumnDefs": this.aoColumnDefs,
      "aaSorting": this.aaSorting,
      "bPaginate": true,
      "iDisplayLength": 20,
      "aLengthMenu": [[20, 50, 100], [20, 50, 100]],
      'bFilter': this.isFilter ? true : false,
      'bSort': true,
      'bInfo': true,
      "bLengthChange": this.isLengthChange != undefined ? this.isLengthChange : true,
      "bServerSide": this.bServer,
      "language": {
        "lengthMenu": "Display _MENU_ records per page",
        "zeroRecords": "Nothing found - sorry",
        "info": "_PAGE_ of _PAGES_ PAGES",
        "infoEmpty": "No records available",
        "infoFiltered": "(filtered from _MAX_ total records)"
      },
      "fnServerData": (sSource: string, aoData: any, fnCallback: (arg0: { aaData: any; iTotalRecords: any; iTotalDisplayRecords: any; } | undefined) => void) => {
        var criteria = this.compRef[this.setCriteriaFn ? this.setCriteriaFn : "SetCriteria"](aoData);

        return this.http.post(sSource, criteria)
          .subscribe((data: any) => {
            if (data) {
              var dt = data;
              var result = { "aaData": dt.Data, "iTotalRecords": dt.TotalRecords, "iTotalDisplayRecords": dt.TotalRecords };
              fnCallback(result);
            } else {
              fnCallback({ aaData: [], iTotalRecords: 0, iTotalDisplayRecords: 0 });
            }
            this.onCompletedSearch.emit(true);
          }, error => {
            this.dialog.showSwalErrorAlert("TimeOut", error.error)
           });
      },
      "drawCallback": (settings: any) => {
        if (!this.isRowReorder) return;


        var rows = this.table.rows({ page: 'current' }).nodes();
        var last: string | null = null;
        var totalColumn = this.aoColumns.length;
        this.table.column(this.indexColReorder, { page: 'current' }).data().each(function (group: string | null, i: any) {
          if (last !== group) {
            if (group == 'Scheduled') {
              $(rows).eq(i).before(
                '<tr class="group"><td colspan="' + totalColumn + '"><span class="badge badge-success badge-lg" style="margin-left:-200px!important;">' + group + '</span></td></tr>'
              );
              last = group;
            }
            if (group == 'On Demand') {
              $(rows).eq(i).before(
                '<tr class="group"><td colspan="' + totalColumn + '"><span class="badge badge-info badge-lg" style="margin-left:-200px!important;">' + group + '</span></td></tr>'
              );
              last = group;
            }
          }
        })
      },
    });
    var id = $(this.ele.nativeElement).attr('id')

    $('#' + id + ' tbody').on('mouseover', 'div', function (event: { currentTarget: any; }) {
      if (event && event.currentTarget) {
        $(event.currentTarget).addClass('show');
      }
    }.bind(this));
    $('#' + id + ' tbody').on('mouseout', 'div', function (event: { currentTarget: any; }) {
      if (event && event.currentTarget) {
        $(event.currentTarget).removeClass('show');
      }
    }.bind(this));
    $('#' + id + ' tbody').on('click', 'button',  (event: { currentTarget: { outerHTML: any; }; }) => {
      var rowId = $(event.currentTarget.outerHTML).attr('param');
      if (event && event.currentTarget && rowId) {
        var methodName = $(event.currentTarget).attr('method-name');
        if (methodName && this.compRef[methodName]) {
          this.compRef[methodName](rowId);
        }
      }
    });
    $('#' + id + ' tbody').on('click', 'a',  (event: { currentTarget: { outerHTML: any; }; }) => {
      var rowId = $(event.currentTarget.outerHTML).attr('param');
      if (event && event.currentTarget && rowId) {
        var methodName = $(event.currentTarget).attr('method-name');
        if (methodName && this.compRef[methodName]) {
          this.compRef[methodName](rowId);
        }
      }
    });
  }
}