import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SedanPost} from './vehicle/interfaces/sedanPost';
import {tap, take, exhaustMap} from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class PostsService {
  public url = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient,
              private userService: UserService){}

  async createPost(vehicle: SedanPost, token: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    return this.http
      .post(this.url, vehicle,
        {
          headers: headers
        }).toPromise().then(posts => {
          console.log(posts);
      });
  }

  async updatePost(vehicle: SedanPost, token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    console.log("in here");
    console.log(vehicle);
    return this.http
      .put(this.url, vehicle,
        {
          headers: headers
        }).toPromise();
  }

  async deletePost(id: number, token: any){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    console.log(id);
    console.log(token);
    return this.http
      .delete("http://localhost:8080/api/vehicles/"+id,
        {headers: headers
    }).toPromise();
  }

  fetchPosts(token: any){
    // return this.userService.token.pipe(take(1), exhaustMap(token => {
      console.log(token);
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
      return this.http
      .get<SedanPost[]>(this.url, {
        headers: headers
      });
  }
}
