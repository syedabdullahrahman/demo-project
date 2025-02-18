import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  standalone: true,
  selector: 'app-add-tutorial',
  imports: [FormsModule,
    ReactiveFormsModule, NgIf],
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    id : '',
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };
    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert("Tutorial saved.");
        },
        error => {
          console.log(error);
          alert("Save unsuccessful.");
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      id: '',
      title: '',
      description: '',
      published: false
    };
  }

}
