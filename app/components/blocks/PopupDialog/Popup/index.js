import React, { Component } from 'react'
import { Animated, Easing, Image } from 'react-native'
import PT from 'prop-types'

import {
  Modal,
  Container,
  OverlayBackground,
  Overlay,
  Body,
  Title,
  Text,
  Buttons,
  Button,
  SkipButton,
} from './styles'

class Popup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      bodyAnimation: new Animated.Value(0),
      overlayAnimation: new Animated.Value(0),
    }
  }

  show = () => {
    this.setState({ isVisible: true }, this.showPopup)
  }

  hide = () => {
    this.hidePopup(() => {
      return this.setState({ isVisible: false })
    })
  }

  showPopup = () => {
    const { bodyAnimation, overlayAnimation } = this.state

    Animated.parallel([
      Animated.timing(bodyAnimation, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()
  }

  hidePopup = (callback) => {
    const { bodyAnimation, overlayAnimation } = this.state

    Animated.parallel([
      Animated.timing(bodyAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(callback)
  }

  handlePositivePress = () => {
    const { positiveButton } = this.props

    positiveButton.onPress()
  }

  handleClose = () => {
    const { isCloseable, onHide } = this.props

    if (isCloseable) {
      onHide()
    }
  }

  renderButtons() {
    const { positiveButton, negativeButton, skipButton } = this.props

    if (!positiveButton && !negativeButton && !skipButton) {
      return null
    }

    const positiveButtonEl = positiveButton && (
      <Button title={positiveButton.text || 'Yes'} onPress={this.handlePositivePress} />
    )

    const negativeButtonEl = negativeButton && (
      <Button
        title={negativeButton.text || 'No'}
        variant="neutral"
        isLast={!skipButton}
        onPress={negativeButton.onPress} // eslint-disable-line
      />
    )

    const skipButtonEl = skipButton && (
      <SkipButton onPress={skipButton.onPress}>{skipButton.text || 'Skip'}</SkipButton>
    )

    return (
      <Buttons>
        {positiveButtonEl}
        {negativeButtonEl}
        {skipButtonEl}
      </Buttons>
    )
  }

  render() {
    const { image, title, text, content } = this.props
    const { isVisible, bodyAnimation, overlayAnimation } = this.state

    const opacityInterpolation = overlayAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.4],
    })

    const overlayStyle = { opacity: opacityInterpolation }
    const bodyStyle = { opacity: bodyAnimation }

    const imageEl = image && <Image source={image} />

    const hasTitle = !!title
    const titleEl = hasTitle && <Title>{title}</Title>

    return (
      <Modal visible={isVisible} onRequestClose={this.handleClose}>
        <Container>
          <Overlay onPress={this.handleClose}>
            <OverlayBackground as={Animated.View} style={overlayStyle} />
          </Overlay>

          <Body as={Animated.View} style={bodyStyle}>
            {imageEl}
            {titleEl}

            <Text hasTitle={hasTitle}>{text}</Text>

            {content}

            {this.renderButtons()}
          </Body>
        </Container>
      </Modal>
    )
  }
}

const buttonProp = PT.shape({
  text: PT.string,
  onPress: PT.func,
})

Popup.propTypes = {
  content: PT.node,
  image: PT.number,
  isCloseable: PT.bool,
  negativeButton: buttonProp,
  positiveButton: buttonProp,
  skipButton: buttonProp,
  text: PT.string,
  title: PT.string,
  onHide: PT.func.isRequired,
}

Popup.defaultProps = {
  content: null,
  image: null,
  isCloseable: true,
  negativeButton: null,
  positiveButton: null,
  skipButton: null,
  text: null,
  title: null,
}

export { Popup }
