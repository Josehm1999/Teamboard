import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  registerTaskData: any;
  message: string = '';
  token: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _taskService: TaskService,
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerTaskData = {};
  }
  registerTask() {
    this.registerTaskData.user = JSON.parse(
      atob(this._userService.getToken()?.split('.')[1] || '{}')
    );

    if (!this.registerTaskData.user) {
      (this.message = 'An error has ocurred'), this.openSnackBarError();
    }

    if (!this.registerTaskData.name || !this.registerTaskData.description) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
    } else {
      this._taskService.registerTask(this.registerTaskData).subscribe({
        next: () => {
          this._router.navigate(['/listTask']);
          this.message = 'Task created succesfully';
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarSuccesfull'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarError'],
    });
  }
  ngOnInit(): void {}
}
