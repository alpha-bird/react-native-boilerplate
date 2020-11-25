/* eslint no-param-reassign: 0 */

import { createSlice, createSelector } from '@reduxjs/toolkit'

import { REHYDRATE } from 'redux-persist'

import includes from 'lodash/includes'
import pick from 'lodash/pick'
import union from 'lodash/union'

const initialState = {
  popup: null,
  isHidden: true,
  isHiding: false,
  ignoredPopupList: [],
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    [REHYDRATE]: (persistedState) => {
      return initialState.merge(pick(persistedState, 'ignoredPopupList'))
    },
    show: (state, { payload }) => {
      state.popup = payload
      state.isHidden = false
      state.isHiding = false
    },
    hide: (state) => {
      state.isHiding = true
    },
    ignore: (state, { popupId }) => {
      state.ignoredPopupList = union(state.ignoredPopupList, [popupId])
    },
  },
})

export const { show, hide, ignore } = popupSlice.actions

export default popupSlice.reducer

export const selectPopupState = (state) => {
  return state.popup
}

export const getPopup = createSelector(selectPopupState, (state) => {
  return state.popup
})

export const isHiding = createSelector(selectPopupState, (state) => {
  return state.isHiding
})

export const isHidden = createSelector(selectPopupState, (state) => {
  return state.isHidden
})

export const isPopupIgnored = (popupId) => {
  return createSelector(selectPopupState, (state) => {
    return includes(state.ignoredPopupList, popupId)
  })
}
