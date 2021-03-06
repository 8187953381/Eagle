/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ENTER, COMMA, SEMICOLON } from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material'

interface IUserShareId {
  email: string
  color: string
  suffix: string
}

@Component({
  selector: 'ws-widget-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
})
export class EmailInputComponent implements OnInit {

  @Input()
  defaultDomain = 'ad.infosys.com' // TODO: read this from instance config

  @Output()
  change = new EventEmitter<string[]>()

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SEMICOLON]
  userEmailIds: IUserShareId[] = []

  // TODO: read this from instance config
  validDomains: string[] = ['ad.infosys.com', 'demo.com']

  errorType: 'no-domain' | 'invalid-domain' | 'none' = 'none'

  constructor() { }

  ngOnInit() { }

  addAll(event: MatChipInputEvent) {
    const input = event.input
    event.value.split(/[,;]+/).map((val: string) => val.trim()).forEach((value: string) => this.add(value))
    input.value = ''
    this.change.emit(this.userEmailIds.map(id => id.email))
  }

  remove(user: IUserShareId): void {
    const index = this.userEmailIds.indexOf(user)
    if (index >= 0) {
      this.userEmailIds.splice(index, 1)
    }
  }

  private add(value: string) {
    if (value) {
      const indexOfAt = value.indexOf('@')
      let suffix = ''
      let email = value
      if (indexOfAt > -1) {
        suffix = value.substring(indexOfAt + 1)
      } else {
        suffix = this.defaultDomain
        email += `@${this.defaultDomain}`
      }

      if (this.validDomains.includes(suffix)) {
        this.errorType = 'none'
        this.userEmailIds.push({
          email,
          suffix,
          color: 'primary',
        })
      } else if (suffix === '') {
        this.errorType = 'no-domain'
      } else {
        this.errorType = 'invalid-domain'
      }
    }
  }

}
