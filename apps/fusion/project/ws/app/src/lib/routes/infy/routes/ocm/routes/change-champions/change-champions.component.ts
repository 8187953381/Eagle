/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Component, OnInit, Input } from '@angular/core'
import { IWsChampionsConfig } from '../../models/ocm.model'

@Component({
  selector: 'ws-app-change-champions',
  templateUrl: './change-champions.component.html',
  styleUrls: ['./change-champions.component.scss'],
})
export class ChangeChampionsComponent implements OnInit {
  @Input() config: IWsChampionsConfig = {
    title: '',
    champions: [],
  }

  constructor() {}

  ngOnInit() {}
}
