import React, { useRef, useState } from 'react'
import PT from 'prop-types'

import map from 'lodash/map'

import { Container, Content, TouchableWithoutFeedback, WeekDay, Meta, Title } from './styles'

const WEEK_DAYS = [
  { value: 0, label: 'M' },
  { value: 1, label: 'T' },
  { value: 2, label: 'W' },
  { value: 3, label: 'T' },
  { value: 4, label: 'F' },
  { value: 5, label: 'S' },
  { value: 6, label: 'S' },
]

const DateRange = ({ from, to, onChange }) => {
  const [step, setStep] = useState(0)
  const start = useRef(from)
  const end = useRef(to)

  const handleDayPress = (day) => {
    return () => {
      if (step === 0) {
        start.current = day.value
      } else {
        end.current = day.value
      }

      if (start.current > end.current) {
        const temp = start.current
        start.current = end.current
        end.current = temp
      }

      onChange({
        from: start.current,
        to: end.current,
      })

      setStep((step + 1) % 2)
    }
  }

  const contentEl = map(WEEK_DAYS, (day) => {
    const { value, label } = day
    // const rangeEl = value > start.current && value < end.current && (
    //   <Range>
    //     <Title>{label}</Title>
    //   </Range>
    // )

    // const activeEl = (value === start.current || value === end.current) && (
    //   <Active>
    //     <Title>{label}</Title>
    //   </Active>
    // )

    // const draftEl = (value < start.current || value > end.current) && (
    //   <Draft>
    //     <Title>{label}</Title>
    //   </Draft>
    // )

    return (
      <Content key={value} index={value}>
        <Meta from={start.current} to={end.current} index={value} />

        <TouchableWithoutFeedback onPress={handleDayPress(day)}>
          <WeekDay from={start.current} to={end.current} index={value}>
            <Title>{label}</Title>
          </WeekDay>
        </TouchableWithoutFeedback>
      </Content>
    )
  })

  return <Container>{contentEl}</Container>
}

DateRange.propTypes = {
  from: PT.number,
  to: PT.number,
  onChange: PT.func.isRequired,
}

DateRange.defaultProps = {
  from: -1,
  to: 7,
}

export { DateRange }
