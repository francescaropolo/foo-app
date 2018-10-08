import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FooService } from '../../services/foo.service';



@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  feedbackEnabled = false;
  error = null;
  processing = false;

  newFoo: any = {
    bar: '',
    baz: ''
  }


  constructor(private fooService: FooService, private router: Router) { }

  ngOnInit() {
    
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.fooService.create(this.newFoo)
        .then((result) => {
          this.router.navigate(['/detail', result._id]);
        })
        .catch((err) => {
          this.error = err.error.code; // :-)
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
