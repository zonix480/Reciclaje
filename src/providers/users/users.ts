import { Injectable } from '@angular/core';
import { GlobalProvider } from "../global";
import { ApiProvider } from "../api";
/**
 * User provider from server
*/
@Injectable()
export class UserProvider {

  /**
   * Constructor Method
   * @param 
  */
  constructor(
    public globalProv: GlobalProvider,
    public apiProv: ApiProvider,
  ) {
  }

  /**
   * Return function API Provider
   * @param params
  */
  public setCallPromise(type: string, data: object, url: string, headers: any): Promise<any> {
    switch (type) {
      case 'post':
        return this.apiProv.post(data, url);
        break;
      case 'post_with_headers':
        return this.apiProv.postHeaders(data, url, headers);
        break;
      default:
        break;
    }
  }

  /**
* Return function API Provider
* @param params
*/
  public setCallObservable(type: string, url: string, headers: any) {
    switch (type) {
      case 'get':
        return this.apiProv.get(url);
        break;
      case 'get_with_headers':
        return this.apiProv.getHeaders(url, headers);
        break;
      default:
        break;
    }
  }


  /**
  * Handle server errors
  * @param error
  */
  private handleError(error): void {
    console.log(error);
  }


}
