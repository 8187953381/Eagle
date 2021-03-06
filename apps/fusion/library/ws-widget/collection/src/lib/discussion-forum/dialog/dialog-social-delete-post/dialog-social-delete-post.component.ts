/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { ConfigurationsService } from '@ws-widget/utils'
import { WsDiscussionForumService } from '../../ws-discussion-forum.services'

@Component({
  selector: 'ws-widget-dialog-social-delete-post',
  templateUrl: './dialog-social-delete-post.component.html',
  styleUrls: ['./dialog-social-delete-post.component.scss'],
})
export class DialogSocialDeletePostComponent implements OnInit {
  isDeleting = false
  errorInDeleting = false
  userId = ''
  constructor(
    public dialogRef: MatDialogRef<DialogSocialDeletePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postId: string },
    private socialSvc: WsDiscussionForumService,
    private configSvc: ConfigurationsService,
  ) {
    if (this.configSvc.userProfile) {
      this.userId = this.configSvc.userProfile.userId || ''
    }
  }

  ngOnInit() { }

  deletePost() {
    this.isDeleting = true
    if (this.userId) {
      this.socialSvc.deletePost(this.data.postId, this.userId).subscribe(
        (_data: any) => {
          this.isDeleting = false
          this.dialogRef.close(true)
        },
        () => {
          this.isDeleting = false
          this.errorInDeleting = true
        },
      )
    }
  }
}
