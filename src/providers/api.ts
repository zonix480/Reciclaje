import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment as ENV} from "../environments/environment.prod";
import {Observable} from 'rxjs';

/**
 * Api provider connect server
 */
@Injectable()
export class ApiProvider {

  /**
   * Constructor Method
   * @param any
   */
  constructor(public http: HttpClient) {
  }

  /**
   * Petition basic POST
   * @param
   */
  public post(data: object, url: string) {
    return new Promise((resolve, reject) => {
      this.http.post(`${ENV.BASE_URL}/` + url, data)
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch(e => {
          this.handleError(e);
        });
    });
  }

  /**
   * Petition POST with Headers "Bearer auth"
   * @param
   */
  public postHeaders(data: object, url: string, headers: any) {
    return new Promise((resolve, reject) => {
        this.http.post(`${ENV.BASE_URL}/` + url, data, {headers: headers})
          .toPromise()
          .then((res) => {
            resolve(res);
          })
          .catch(e => {
            this.handleError(e);
          });
      });
  }

  /**
   * Petition Basic GET 
   * @param
   */
  public get(url: string): Observable<any> {
    return this.http.get(`${ENV.BASE_URL}/${url}`);
  }

  /**
   * Petition GET with Headers "Bearer auth"
   * @param
   */
  public getHeaders(url: string, headers: any): Observable<any> {
    return this.http.get(`${ENV.BASE_URL}/${url}`, {headers: headers});
  }
  
  /**
   * Petition Delete with Headers "Bearer auth"
   * @param
   */
  public deleteHeaders(url: string, headers: any): Observable<any> {
    return this.http.delete(`${ENV.BASE_URL}/${url}`, {headers: headers});
  }

  /**
   * Handle server errors
   * @param error
   */
  private handleError(error):void {
    console.log(error);
  }


}  