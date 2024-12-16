import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URLS } from "../utils/utils";
import { IApiResponse, IBook } from "../utils/types";

@Injectable({
  providedIn: "root"
})

export class BookService {
  private httpClient = inject(HttpClient);

  getBooks() {
    return this.httpClient.get<IApiResponse<IBook[]>>(API_URLS.getBooks);
  }

  getBook(id: string) {
    return this.httpClient.get<IApiResponse<IBook>>(`${API_URLS.getBook}/${id}`);
  }
}