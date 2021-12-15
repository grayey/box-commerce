import { Injectable } from "@angular/core";
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class ApiHandlerService{

    private headers = {};

    constructor(private http:HttpClient){}

  /**
   *
   * This is used to make get requests
   * @param path
   * @param data
   * @returns {Observable<R>}
   *
   */
  public get(path: string): Observable<any> {
    return this.http.get(path, this.headers).retryWhen((errors) =>  
        errors.mergeMap(this.errorHandler)
        .delay(1000)
        .take(2)
        ).catch(this.errorHandler)
        .map((res) => res);
  }


  /**
   * This is used catch error
   * @param err
   * @returns {any}
   */
  private errorHandler = (err:any):Observable<any> => Observable.throw(err || 'Server error');
  

}