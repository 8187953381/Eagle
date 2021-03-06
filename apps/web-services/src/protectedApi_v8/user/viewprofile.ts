/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import axios from 'axios'
import { Router } from 'express'
import { axiosRequestConfig } from '../../configs/request.config'
import { CONSTANTS } from '../../utils/env'
import { ERROR } from '../../utils/message'
const API_END_POINTS = {
  viewProfileOwn: `${CONSTANTS.NODE_API_BASE}/userprofiles/pathfinders/viewprofile`,
}
export const viewProfileApi = Router()
viewProfileApi.get('/:wid', async (req, res) => {
  try {
    const org = req.header('org')
    const rootOrg = req.header('rootOrg')
    const userId = req.params.wid
    const wid = req.params.wid
    if (!rootOrg) {
      res.status(400).send(ERROR.ERROR_NO_ORG_DATA)
      return
    }

    const url = API_END_POINTS.viewProfileOwn
    const response = await axios.get(url, {
      ...axiosRequestConfig,
      headers: {
        'Content-Type': 'application/json',
        org,
        rootOrg,
        userId,
        wid,
      },
    })
    res.status(response.status).send(response.data)
  } catch (err) {
    res
      .status((err && err.response && err.response.status) || 500)
      .send((err && err.response && err.response.data) || err)
  }
})
