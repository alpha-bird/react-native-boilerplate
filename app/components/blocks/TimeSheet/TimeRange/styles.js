import styled from 'styled-components/native'
import { space } from 'styled-system'

import { getColor } from 'theme'

import { chevronDownIcon } from 'assets/images'

import { Box, Text, TouchableOpacity, FieldLabel as FieldLabelUI } from 'components/ui'

export { TouchableWithoutFeedback } from 'components/ui'

export const Container = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
`

export const TimePanel = styled(Box).attrs({
  borderRadius: 3,
  borderWidth: 1,
  borderColor: 'night50',
  px: 3,
})`
  flex-direction: row;
  align-items: center;
`

export const Content = styled(Box)`
  justify-content: center;
`

export const Meta = styled.View`
  align-items: center;
`

export const FieldLabel = styled(FieldLabelUI).attrs(() => {
  return {
    mb: 2,
  }
})`
  ${space}
`

export const Touchable = styled(TouchableOpacity).attrs({
  py: 4,
  px: 4,
})`
  ${space}
`

export const Time = styled(Text).attrs({
  fontFamilyStyle: 'style.bold',
  fontSize: 2,
})``

export const Title = styled(Text).attrs({
  color: 'text',
  fontSize: 2,
  fontFamilyStyle: 'style.bold',
})``

export const IconUp = styled.Image.attrs({
  source: chevronDownIcon,
})`
  transform: rotate(180deg);

  tint-color: ${(props) => {
    return getColor('white')(props)
  }};

  ${space}
`

export const IconDown = styled.Image.attrs({
  source: chevronDownIcon,
})`
  tint-color: ${(props) => {
    return getColor('white')(props)
  }};

  ${space}
`
