/* eslint-disable react/no-deprecated */
import { Component, createElement as ce } from 'react'
import PT from 'prop-types'

import get from 'lodash/get'
import merge from 'lodash/merge'

import { Popup } from './styles'

class PopupDialog extends Component {
  componentWillReceiveProps(nextProps) {
    const { popup, isHiding } = this.props

    if (popup !== nextProps.popup || isHiding !== nextProps.isHiding) {
      if (nextProps.popup && nextProps.isHiding) {
        this.popupRef.hide()
      } else if (nextProps.popup) {
        this.popupRef.show()
      }
    }
  }

  handlePopupRef = (popup) => {
    this.popupRef = popup
  }

  handleNegativePress = () => {
    const { onHide, popup } = this.props
    const customCallback = get(popup, 'props.negativeButton.onPress')

    if (popup.config.hideOnResponse) onHide()
    if (customCallback) customCallback()
  }

  handleSkipPress = () => {
    const { onHide, popup } = this.props
    const customCallback = get(popup, 'props.skipButton.onPress')

    if (popup.config.hideOnResponse) onHide()
    if (customCallback) customCallback()
  }

  handlePositivePress = (isIgnored) => {
    const { onHide, onIgnore, popup } = this.props
    const customCallback = get(popup, 'props.positiveButton.onPress')

    if (isIgnored && popup.props.id) {
      onIgnore(popup.props.id)
    }

    if (popup.config.hideOnResponse) onHide()
    if (customCallback) customCallback()
  }

  render() {
    const { popup } = this.props

    const handleHidden = () => {
      const onHiddenFromArguments = get(popup, 'props.onHidden')

      if (onHiddenFromArguments) {
        onHiddenFromArguments()
      }
    }

    return ce(
      Popup,
      merge(
        {},
        get(popup, 'props'),
        get(popup, 'props.positiveButton') && {
          positiveButton: {
            onPress: this.handlePositivePress,
          },
        },
        get(popup, 'props.negativeButton') && {
          negativeButton: {
            onPress: this.handleNegativePress,
          },
        },
        get(popup, 'props.skipButton') && {
          skipButton: {
            onPress: this.handleSkipPress,
          },
        },
        {
          ref: this.handlePopupRef,
          isCloseable: get(popup, 'config.isCloseable'),
          hasCloseButton: get(popup, 'config.hasCloseButton'),
          onHide: handleHidden,
        },
      ),
    )
  }
}

PopupDialog.propTypes = {
  isHiding: PT.bool.isRequired,
  popup: PT.shape({
    config: PT.object,
    props: PT.object,
  }),
  onHide: PT.func.isRequired,
  onIgnore: PT.func.isRequired,
}

PopupDialog.defaultProps = {
  popup: null,
}

export default PopupDialog
