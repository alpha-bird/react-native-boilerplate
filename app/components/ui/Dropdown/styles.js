import styled, { css } from 'styled-components/native'
import { space } from 'styled-system'

import { Image } from 'react-native'

import { mapToTheme, getColor } from 'theme'
import { chevronDownIcon } from 'assets/images'

import { Box } from '../Box'
import { Text } from '../Text'
import { FieldLabel as FieldLabelUI } from '../FieldLabel'
import { FieldBottom as FieldBottomUI } from '../FieldBottom'
import { ListSheet } from '../ListSheet'
import { TouchableWithoutFeedback } from '../TouchableWithoutFeedback'

export const Container = styled(Box)``

export const FieldLabel = styled(FieldLabelUI).attrs(() => {
  return {
    mb: 2,
  }
})`
  ${space}
`

export const FieldBottom = styled(FieldBottomUI).attrs(() => {
  return {
    mt: 2,
  }
})`
  ${space}
`

export const Picker = styled(TouchableWithoutFeedback)``

export const PickerContent = styled(Box).attrs({
  bg: 'night75',
  px: 4,
  borderRadius: 3,
  borderColor: 'night50',
})`
  height: 48px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;

  ${(props) => {
    return (
      props.hasError &&
      css`
        border-color: ${getColor('negative')(props)};
      `
    )
  }}
`

export const PickerArrow = styled.View`
  width: 32px;
  align-items: center;
  justify-content: center;
`

export const PickerArrowIcon = styled(Image).attrs({
  source: chevronDownIcon,
})`
  tint-color: ${mapToTheme('components.generic.color')};

  ${(props) => {
    return (
      props.hasError &&
      css`
        tint-color: ${getColor('negative')};
      `
    )
  }}
`

export const PickerBody = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const PickerValue = styled(Text).attrs((props) => {
  return {
    numberOfLines: 1,
    color: props.isPlaceholder ? 'night50' : 'text',
  }
})`
  flex: 1;
`

export const PickerValueMissing = styled.View`
  flex: 1;
`

export const Sheet = styled(ListSheet)``
