import React, { useState, useEffect } from 'react'
import PT from 'prop-types'

import { Container, TimePanel, Meta, Touchable, Title, IconUp, IconDown } from './styles'

const TimeSelect = ({ time, onChange }) => {
  const [defTime, setDefTime] = useState(time)
  const [hour, setHour] = useState(time.toFormat('hh'))
  const [min, setMin] = useState(time.toFormat('mm'))
  const [aside, setAside] = useState(time.toFormat('a'))

  const handleTimeChange = (type, value) => {
    return () => {
      switch (type) {
        case 'hour':
          setDefTime(defTime.plus({ hours: value }))
          break

        case 'min':
          setDefTime(defTime.plus({ minutes: value }))
          break

        default:
          break
      }
    }
  }

  useEffect(() => {
    setHour(defTime.toFormat('hh'))
    setMin(defTime.toFormat('mm'))
    setAside(defTime.toFormat('a'))

    onChange(defTime)
  }, [defTime, onChange])

  return (
    <Container>
      <TimePanel>
        <Meta>
          <Touchable onPress={handleTimeChange('hour', 1)}>
            <IconUp />
          </Touchable>

          <Title>{hour}</Title>

          <Touchable onPress={handleTimeChange('hour', -1)}>
            <IconDown />
          </Touchable>
        </Meta>

        <Meta>
          <Title>:</Title>
        </Meta>

        <Meta>
          <Touchable onPress={handleTimeChange('min', 10)}>
            <IconUp />
          </Touchable>

          <Title>{min}</Title>

          <Touchable onPress={handleTimeChange('min', -10)}>
            <IconDown />
          </Touchable>
        </Meta>
      </TimePanel>

      <TimePanel ml={2}>
        <Meta>
          <Touchable onPress={handleTimeChange('hour', 12)}>
            <IconUp />
          </Touchable>

          <Title>{aside}</Title>

          <Touchable onPress={handleTimeChange('hour', -12)}>
            <IconDown />
          </Touchable>
        </Meta>
      </TimePanel>
    </Container>
  )
}

TimeSelect.propTypes = {
  time: PT.object.isRequired,
  onChange: PT.func.isRequired,
}

export { TimeSelect }
