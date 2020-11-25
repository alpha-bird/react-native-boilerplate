import styled from 'styled-components/native'
import { height } from 'styled-system'

import { getMetrics, getSpace } from 'theme'

import { Box } from '../Box'
import { Link } from '../Link'
import { Text } from '../Text'
import OptionComponent from './Option'

export const getBottomSpace = (props, isExtra) => {
  const bottomSpace = getMetrics('bottomSpace')(props)
  const contentBottomSpace = bottomSpace > 0 ? 0 : getSpace(4)(props)

  return isExtra ? bottomSpace + contentBottomSpace : contentBottomSpace
}

export const getMaxHeight = (props) => {
  return props.maxHeight || getMetrics('screenHeight')(props) * 0.9
}

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
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

export const Body = styled(Box).attrs((props) => {
  return {
    pb: getMetrics('bottomSpace')(props),
    bg: 'night100',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  }
})``

export const Header = styled(Box).attrs({
  px: 5,
  height: 80,
  borderBottomWidth: 1,
  borderBottomColor: 'night50',
})`
  justify-content: center;
`

export const HeaderHandle = styled(Box).attrs({
  height: 4,
  width: 40,
  borderRadius: 1,
  backgroundColor: 'night50',
  mb: 5,
})`
  align-self: center;
`

export const Meta = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const HeaderTitle = styled(Text).attrs({
  numberOfLines: 1,
  fontFamilyStyle: 'style.bold',
  fontSize: 2,
})``

export const HeaderButton = styled(Link).attrs({
  color: 'persimmon100',

  messageProps: {
    fontFamilyStyle: 'style.bold',
  },
})``

export const Content = styled.ScrollView.attrs((props) => {
  return {
    keyboardShouldPersistTaps: 'handled',

    contentContainerStyle: {
      paddingBottom: getBottomSpace(props, false),
    },
  }
})``

export const Option = styled(OptionComponent).attrs({
  height: 48,
})`
  ${height}
`
