import React, { useRef } from 'react'
import PT from 'prop-types'

import DateTime from 'luxon/src/datetime'

import { TimeSelect } from './TimeSelect'
import { Container, Content, FieldLabel, Title } from './styles'

const TimeRange = ({ from, to, onChange }) => {
  const start = useRef(from)
  const end = useRef(to)

  const handleChangeFrom = (time) => {
    start.current = time

    onChange({
      from: time,
      to: end.current,
    })
  }

  const handleChangeTo = (time) => {
    end.current = time

    onChange({
      from: start.current,
      to: time,
    })
  }

  return (
    <Container mt={5}>
      <Content>
        <FieldLabel label="From" />
        <TimeSelect time={from} onChange={handleChangeFrom} />
      </Content>

      <Content mt={5}>
        <Title>-</Title>
      </Content>

      <Content>
        <FieldLabel label="To" />
        <TimeSelect time={to} onChange={handleChangeTo} />
      </Content>
    </Container>
  )
}

TimeRange.propTypes = {
  from: DateTime,
  to: DateTime,
  onChange: PT.func.isRequired,
}

TimeRange.defaultProps = {
  from: DateTime.fromObject({ hour: 9, minute: 0, second: 0 }),
  to: DateTime.fromObject({ hour: 20, minute: 0, second: 0 }),
}

export { TimeRange }
