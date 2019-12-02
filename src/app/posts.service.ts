import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SedanPost} from './vehicle/interfaces/sedanPost';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  public url = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient){}

  async createPost(vehicle: SedanPost){
    return this.http
      .post(this.url, vehicle,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        }).toPromise().then(posts => {
          console.log(posts);
      });
  }

  async updatePost(vehicle: SedanPost) {
    console.log("in here");
    console.log(vehicle);
    return this.http
      .put(this.url, vehicle,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
        }).toPromise();
  }

  async deletePost(id: number){
    return this.http
      .delete("http://localhost:8080/api/vehicles/"+id,
        {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).toPromise();
  }

  fetchPosts(){
    return this.http
      .get<SedanPost[]>(this.url);
  }
}
