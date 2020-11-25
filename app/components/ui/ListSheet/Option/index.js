import React from 'react'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Touchable, Container, Label } from './styles'

const Option = ({ option, isSelected, style, onChange }) => {
  const handlePress = () => {
    onChange(option.value)
  }

  return (
    <Touchable onPress={handlePress}>
      <Container isSelected={isSelected} style={style}>
        <Label isSelected={isSelected}>{option.extendedLabel || option.label}</Label>
      </Container>
    </Touchable>
  )
}

Option.propTypes = {
  isSelected: PT.bool.isRequired,
  option: PT.object.isRequired,
  style: ViewPropTypes.style,
  onChange: PT.func.isRequired,
}

Option.defaultProps = {
  style: {},
}

export default Option
