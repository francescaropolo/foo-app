import { Component, OnInit } from '@angular/core';

import { FooService } from '../../services/foo.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  foos: Array<any> = [];

  constructor(private fooService: FooService) { }

  ngOnInit() {
    this.fooService.getAll()
    .then((results) => {
      this.foos = results;
    })
  }

  handleDeleteClick(id) {
    this.fooService.delete(id)
      .then(() => {
        this.foos = this.foos.filter((foo) =>{
          return foo._id !== id;
        })
      })
  }

}
