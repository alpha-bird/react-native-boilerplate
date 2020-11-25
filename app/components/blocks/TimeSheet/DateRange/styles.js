import styled, { css } from 'styled-components/native'

import { Box, Text } from 'components/ui'

export { TouchableWithoutFeedback } from 'components/ui'

export const Container = styled.View`
  flex-direction: row;
`

export const Content = styled(Box)`
  flex-direction: row;

  ${(props) => {
    if (props.index < 6) {
      return css`
        flex: 1;
      `
    }

    return null
  }}
`

export const Meta = styled(Box).attrs((props) => {
  if (props.from < 0 || props.to > 6) {
    return null
  }

  const style = {
    left: props.index === props.from ? 21 : 0,
    top: 0,
    bottom: 0,
    borderColor: 'night50',
  }

  if (props.index === props.to) {
    style.width = 19
  } else {
    style.right = 0
  }

  if (props.index >= props.from && props.index <= props.to) {
    style.borderTopWidth = 1
    style.borderBottomWidth = 1
  }

  return style
})`
  position: absolute;
`

export const WeekDay = styled(Box).attrs((props) => {
  const style = {
    width: 40,
    height: 40,
    borderColor: 'night50',
    borderRadius: 20,
    shadow: 'button',
    borderWidth: 1,
  }

  if (props.index === props.from || props.index === props.to) {
    style.bg = 'persimmon100'
  }

  if (props.index < props.from || props.index > props.to) {
    style.borderWidth = 1
  } else {
    style.borderWidth = 0
  }

  return style
})`
  align-items: center;
  justify-content: center;
`

export const Title = styled(Text).attrs({
  color: 'text',
  fontFamilyStyle: 'style.bold',
})``
