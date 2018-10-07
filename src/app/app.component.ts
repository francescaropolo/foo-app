import { Component, OnInit } from '@angular/core';

import { FooService } from './services/foo.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  foos: Array<any> = [];
  feedbackEnabled = false;
  error = null;
  processing = false;

  newFoo: any = {
    bar: '',
    baz: ''
  }

  constructor(private fooService: FooService) {}

  ngOnInit() {
    this.fooService.getAll()
    .then((results) => {
      this.foos = results;
    })
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.fooService.create(this.newFoo)
        .then((result) => {
          this.foos.push(result)
          this.newFoo = {}
          this.processing = false;
          this.feedbackEnabled = false;
          form.reset(); //WHY????
        })
      // this.someService.method(... data ...)
      //   .then((result) => {
      //     // ... handle result, reset form, etc...
      //     // ... navigate with this.router.navigate(['...'])
      //     // ... maybe turn this to false if your're staying on the page - this.processing = false;
      //   })
        .catch((err) => {
          this.error = err.message.error; // :-)
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

  handleAddClick() {
    this.error= false;
    this.fooService.create(this.newFoo)
      .then((result) => {
        this.foos.push(result)
        this.newFoo = {}
      })
      .catch(() => {
        this.error = true
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
