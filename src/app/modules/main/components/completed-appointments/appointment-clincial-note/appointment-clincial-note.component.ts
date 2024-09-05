import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-clincial-note',
  templateUrl: './appointment-clincial-note.component.html',
  styleUrls: ['./appointment-clincial-note.component.css']
})
export class AppointmentClincialNoteComponent implements OnInit {
  id: string;
  constructor(activateRouter: ActivatedRoute) {
    activateRouter.parent.params.subscribe(r => {
      if (r && r["{id}"]) {
        this.id = r["{id}"];
      }
    });
  }

  ngOnInit(): void {

  }

}
