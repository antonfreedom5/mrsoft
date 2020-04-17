import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API_URL = 'https://cors-anywhere.herokuapp.com/https://mrsoft.by/tz20'; // Запрос отправляется через прокси, т.к. при отправке с localhost, браузер требует дополнительную информацию в заголовке запроса

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public getData() {
    return this.http.get(API_URL + '/list.json');
  }

  public getMore(link: string) {
    return this.http.get(API_URL + link);
  }
}
