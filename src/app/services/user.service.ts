import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../../../models';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserDTO[]>('/api/users');
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('/api/users/' + id);
  }

  create(user: UserDTO) {
    return this.http.post<UserDTO>('/api/users', user);
  }

  update(user: UserDTO) {
    return this.http.put<UserDTO>('/api/users', user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }
}