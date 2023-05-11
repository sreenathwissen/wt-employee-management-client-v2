import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IManager } from 'src/app/model/IEmployee';

@Component({
  selector: 'app-typeahead-search',
  templateUrl: './typeahead-search.component.html',
  styleUrls: ['./typeahead-search.component.scss']
})
export class TypeaheadSearchComponent {

  @Input() dataSource: IManager[] = [];
  @Input() displayedColumns: string[] = [];
  @Output() onRowClicked: EventEmitter<IManager> = new EventEmitter<IManager>();

  constructor() { }

  onRowSelecetd(row: IManager) {
    this.onRowClicked.emit(row);
  }

}
