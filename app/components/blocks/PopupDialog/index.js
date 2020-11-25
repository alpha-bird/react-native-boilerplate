import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getPopup, isHiding, show, hide, ignore } from 'store/slices/popup'

import Component from './PopupDialog'

const SELECTOR = createStructuredSelector({
  isHiding,
  popup: getPopup,
})

const ACTIONS = {
  onHide: hide,
  // onHidden: PopupCreators.hidden,
  onIgnore: ignore,
  onShow: show,
  // onNegativePress: PopupCreators.chooseNegative,
  // onPositivePress: PopupCreators.choosePositive,
  // onSkipPress: PopupCreators.chooseSkip,
}

export const PopupDialog = connect(SELECTOR, ACTIONS)(Component)
