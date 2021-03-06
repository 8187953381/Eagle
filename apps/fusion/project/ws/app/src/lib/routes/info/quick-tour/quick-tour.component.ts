/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Component, OnInit } from '@angular/core'
import { IWidgetsPlayerMediaData } from '@ws-widget/collection'
import { NsWidgetResolver } from '@ws-widget/resolver'
import { ConfigurationsService } from '@ws-widget/utils'

@Component({
  selector: 'ws-app-quick-tour',
  templateUrl: './quick-tour.component.html',
  styleUrls: ['./quick-tour.component.scss'],
})
export class QuickTourComponent implements OnInit {
  appLanguage = 'en'
  introVideos: any
  widgetResolverData: NsWidgetResolver.IRenderConfigWithTypedData<
    IWidgetsPlayerMediaData
  > = {
    widgetData: {
      url: '',
      autoplay: true,
      identifier: '',
    },
    widgetHostClass: 'video-full block vertical-height-without-nav',
    widgetSubType: 'playerVideo',
    widgetType: 'player',
  }

  constructor(private configSvc: ConfigurationsService) { }

  ngOnInit() {

    if (this.configSvc.instanceConfig) {
      this.introVideos = this.configSvc.instanceConfig.tourVideo
    }
    if (Object.keys(this.introVideos).length > 1) {
      this.appLanguage = (this.configSvc.activeLocale && this.configSvc.activeLocale.path) || ''
      if (this.appLanguage !== 'de') {
        this.appLanguage = 'en'
      }
    }
    this.widgetResolverData = {
      ...this.widgetResolverData,
      widgetData: {
        ...this.widgetResolverData.widgetData,
        url: this.introVideos[this.appLanguage],
      },
    }
  }
}
