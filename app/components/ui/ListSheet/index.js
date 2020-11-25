import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
} from 'react'
import { Animated, Easing, Keyboard, Modal, PanResponder } from 'react-native'
import PT from 'prop-types'

import { withTheme } from 'styled-components/native'

import { getSpace } from 'theme'

import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import reduce from 'lodash/reduce'
import noop from 'lodash/noop'

import PickingService from 'services/picking'

import {
  Container,
  Overlay,
  OverlayBackground,
  Body,
  Header,
  Meta,
  HeaderHandle,
  HeaderTitle,
  HeaderButton,
  Content,
  Option,
  getMaxHeight,
  getBottomSpace,
} from './styles'

const ListSheetComponent = forwardRef(
  (
    {
      options,
      selectedOption,
      title,
      hasDone,
      onCloseAfterChange,
      onKeyboardWillShow,
      onKeyboardWillHide,
      onChange,
      ...props
    },
    ref,
  ) => {
    const scrollEnabled = useRef(false)

    const calculateHeight = useCallback(() => {
      const getHeight = (Comp) => {
        return reduce(
          ['height', 'm', 'mt', 'mb'],
          (acc, property) => {
            const value = merge({}, ...Comp.attrs)[property]
            const computedValue = property === 'height' ? value : getSpace(value)(props)

            return acc + (computedValue || 0)
          },
          0,
        )
      }

      const header = getHeight(Header)
      const optionHeight = options.length * getHeight(Option)
      const extraBottomSpace = getBottomSpace(props, true)
      const maxHeight = getMaxHeight(props)

      let height = header + optionHeight + extraBottomSpace

      if (height > maxHeight) {
        scrollEnabled.current = true
        height = maxHeight
      } else {
        scrollEnabled.current = false
      }

      return height
    }, [options.length, props])

    const [visible, setVisible] = useState(false)
    const translateY = useRef(calculateHeight())
    const sheetAnimation = useRef(new Animated.Value(translateY.current))
    const overlayAnimation = useRef(new Animated.Value(0))

    useEffect(() => {
      PickingService.forPlatform({
        ios: () => {
          Keyboard.addListener('keyboardWillShow', onKeyboardWillShow)
          Keyboard.addListener('keyboardWillHide', onKeyboardWillHide)
        },
        android: () => {
          Keyboard.addListener('keyboardDidShow', onKeyboardWillShow)
          Keyboard.addListener('keyboardDidHide', onKeyboardWillHide)
        },
      })

      return () => {
        PickingService.forPlatform({
          ios: () => {
            Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow)
            Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide)
          },
          android: () => {
            Keyboard.removeListener('keyboardDidShow', onKeyboardWillShow)
            Keyboard.removeListener('keyboardDidHide', onKeyboardWillHide)
          },
        })
      }
    })

    useEffect(() => {
      translateY.current = calculateHeight()

      Animated.timing(sheetAnimation.current, {
        toValue: translateY.current,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }, [options, calculateHeight])

    const showSheet = () => {
      Animated.parallel([
        Animated.timing(sheetAnimation.current, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnimation.current, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    }

    const handleHideSheetComplete = (value) => {
      translateY.current = calculateHeight()
      return () => {
        setVisible(false)
        onCloseAfterChange(value)
      }
    }

    const hideSheet = (value) => {
      Animated.parallel([
        Animated.timing(sheetAnimation.current, {
          toValue: translateY.current,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnimation.current, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(handleHideSheetComplete(value))
    }

    const hide = (value) => {
      if (value) {
        onChange(value)
      }

      hideSheet(value)
    }

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true
      },
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: sheetAnimation.current }])(e, gestureState)
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const gestureLimitArea = calculateHeight() / 3
        const gestureDistance = gestureState.dy
        if (gestureDistance > gestureLimitArea) {
          hide()
        } else {
          Animated.spring(sheetAnimation.current, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    })

    useImperativeHandle(ref, () => {
      return {
        show() {
          setVisible(true)
        },
      }
    })

    useEffect(() => {
      if (visible) {
        showSheet()
      }
    }, [visible])

    const handleCancel = () => {
      hide()
    }

    const handleOptionChange = (value) => {
      hide(value)
    }

    const renderOption = (option, index) => {
      const isSelected = get(selectedOption, 'value') === option.value

      return (
        <Option
          key={option.value || index}
          option={option}
          isSelected={isSelected}
          onChange={handleOptionChange}
        />
      )
    }

    const opacityInterpolation = overlayAnimation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8],
    })

    const overlayStyle = { opacity: opacityInterpolation }

    const bodyStyle = {
      height: translateY.current,
      transform: [{ translateY: sheetAnimation.current }],
    }

    const optionList = map(options, renderOption)

    const doneButtonEl = hasDone && <HeaderButton onPress={handleCancel}>Done</HeaderButton>

    return (
      <Modal visible={visible} animationType="none" transparent onRequestClose={handleCancel}>
        <Container>
          <Overlay onPress={handleCancel}>
            <OverlayBackground as={Animated.View} style={overlayStyle} />
          </Overlay>

          <Body as={Animated.View} style={bodyStyle} {...panResponder.panHandlers}>
            <Header>
              <HeaderHandle />

              <Meta>
                <HeaderTitle>{title}</HeaderTitle>

                {doneButtonEl}
              </Meta>
            </Header>

            <Content scrollEnabled={scrollEnabled.current}>{optionList}</Content>
          </Body>
        </Container>
      </Modal>
    )
  },
)

ListSheetComponent.propTypes = {
  hasDone: PT.bool,
  maxHeight: PT.number, // eslint-disable-line
  options: PT.array,
  selectedOption: PT.object,
  title: PT.string.isRequired,
  onChange: PT.func.isRequired,
  onCloseAfterChange: PT.func,
  onKeyboardWillHide: PT.func,
  onKeyboardWillShow: PT.func,
}

ListSheetComponent.defaultProps = {
  hasDone: true,
  maxHeight: null,
  onCloseAfterChange: noop,
  onKeyboardWillHide: noop,
  onKeyboardWillShow: noop,
  options: [],
  selectedOption: {},
}

export const ListSheet = withTheme(ListSheetComponent)
