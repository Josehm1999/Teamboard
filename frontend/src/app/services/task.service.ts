import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerTask(task: any) {
    return this._http.post<any>(this.env + 'task/saveTask', task);
  }

  updateTask(task: any) {
    return this._http.put<any>(this.env + 'task/updateTask', task);
  }

  deleteTask(_id: any) {
    return this._http.delete<any>(this.env + `task/deleteTask/${_id}`);
  }
}
