import styled from 'styled-components/native'
import { space } from 'styled-system'

import { Box, Image as ImageUI, Text as TextUI, Button as ButtonUI, Link } from 'components/ui'

export const Modal = styled.Modal.attrs({
  animationType: 'none',
  transparent: true,
})``

export const Container = styled(Box).attrs({
  p: 5,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Overlay = styled.TouchableWithoutFeedback``

export const OverlayBackground = styled(Box).attrs({
  bg: 'black',
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Body = styled(Box).attrs({
  py: 8,
  px: 6,
  bg: 'night100',
  shadow: 'card',
  borderRadius: 2,
})`
  width: 100%;
  align-items: center;
`

export const Image = styled(ImageUI).attrs({
  mb: 5,
})``

export const Title = styled(TextUI).attrs({
  mb: 6,
  fontSize: 2,
  fontFamilyGroup: 'group.bfast',
})`
  text-align: center;
`

export const Text = styled(TextUI).attrs((props) => {
  return {
    fontFamilyStyle: props.hasTitle ? 'styles.regular' : 'styles.semiBold',
  }
})`
  text-align: center;
`

export const Buttons = styled(Box).attrs({
  mt: 7,
})`
  align-items: center;
`

export const Button = styled(ButtonUI).attrs((props) => {
  return {
    useRoomVariant: true,
    mb: props.isLast ? 0 : 5,
  }
})`
  ${space}
`

export const SkipButton = styled(Link).attrs({
  my: 4,
})`
  ${space}
`
