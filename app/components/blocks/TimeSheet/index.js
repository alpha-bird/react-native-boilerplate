import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react'
import { withTheme } from 'styled-components/native'
import { Animated, Easing, Modal, PanResponder } from 'react-native'
import PT from 'prop-types'

import { getSpace } from 'theme'

import DateTime from 'luxon/src/datetime'

import merge from 'lodash/merge'
import reduce from 'lodash/reduce'
import noop from 'lodash/noop'

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
  DateRange,
  TimeRange,
  getBottomSpace,
} from './styles'

const TimeSheetComponent = forwardRef(
  ({ title, onChange, onCloseAfterChange, weekFrom, weekTo, timeFrom, timeTo, ...props }, ref) => {
    const startWeek = useRef(weekFrom)
    const endWeek = useRef(weekFrom)
    const startTime = useRef(timeFrom)
    const endTime = useRef(timeTo)

    const calculateHeight = () => {
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
      const extraBottomSpace = getBottomSpace(props, true)
      const content = getHeight(Content)

      // TODO calculate time selection content
      return header + extraBottomSpace + content
    }

    const [visible, setVisible] = useState(false)
    const translateY = useRef(calculateHeight())
    const sheetAnimation = useRef(new Animated.Value(translateY.current))
    const overlayAnimation = useRef(new Animated.Value(0))

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
      hideSheet(value)
    }

    const handleCancel = () => {
      hide()
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

    const handleWeekChange = ({ from, to }) => {
      onChange({
        weekFrom: from,
        weekTo: to,
        timeFrom: startTime.current,
        timeTo: endTime.current,
      })
    }

    const handleTimeChange = ({ from, to }) => {
      onChange({
        weekFrom: startWeek.current,
        weekTo: endWeek.current,
        timeFrom: from,
        timeTo: to,
      })
    }

    const renderContent = () => {
      return (
        <>
          <DateRange onChange={handleWeekChange} />

          <TimeRange onChange={handleTimeChange} mt={5} />
        </>
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

                <HeaderButton onPress={handleCancel}>Done</HeaderButton>
              </Meta>
            </Header>

            <Content>{renderContent()}</Content>
          </Body>
        </Container>
      </Modal>
    )
  },
)

TimeSheetComponent.propTypes = {
  timeFrom: DateTime,
  timeTo: DateTime,
  title: PT.string.isRequired,
  weekFrom: PT.number,
  weekTo: PT.number,
  onChange: PT.func.isRequired,
  onCloseAfterChange: PT.func,
}

TimeSheetComponent.defaultProps = {
  onCloseAfterChange: noop,
  timeFrom: DateTime.fromObject({ hour: 9, minute: 0, second: 0 }),
  timeTo: DateTime.fromObject({ hour: 20, minute: 0, second: 0 }),
  weekFrom: 0,
  weekTo: 1,
}

export const TimeSheet = withTheme(TimeSheetComponent)
