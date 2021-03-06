/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { IResolveResponse } from '@ws-widget/utils'
import { NsTnc } from '../models/tnc.model'

@Injectable()
export class TncPublicResolverService implements Resolve<Observable<IResolveResponse<NsTnc.ITnc>> | IResolveResponse<NsTnc.ITnc>> {

  constructor(
    private http: HttpClient,
  ) { }

  resolve(): Observable<IResolveResponse<NsTnc.ITnc>> {
    return this.getPublicTnc().pipe(
      map(data => ({ data, error: null })),
      catchError(error => of({ error, data: null })),
    )
  }
  getPublicTnc(locale?: string): Observable<NsTnc.ITnc> {
    let url = '/apis/public/v8/tnc'
    if (locale) {
      url += `?locale=${locale}`
    }
    return this.http.get<NsTnc.ITnc>(url)
  }
}
