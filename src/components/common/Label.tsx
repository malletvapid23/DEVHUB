import React, { ReactNode, SFC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'

import { Octicons as Icon } from '../../libs/vector-icons'
import {
  contentPadding,
  mutedOpacity,
  radius as defaultRadius,
} from '../../styles/variables'

import theme from '../../styles/themes/dark'

export interface IProps {
  borderColor?: string
  children: ReactNode
  color?: string
  containerProps?: ViewProps
  containerStyle?: StyleProp<ViewStyle>
  isPrivate?: boolean
  muted?: boolean
  outline?: boolean
  radius?: number
  textColor?: string
  textProps?: TextProps
}

const styles = StyleSheet.create({
  labelContainer: {
    borderRadius: defaultRadius,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: contentPadding,
    paddingVertical: 2,
  } as ViewStyle,

  labelText: {
    fontSize: 14,
  } as TextStyle,
})

const Label: SFC<IProps> = ({
  borderColor,
  color,
  children,
  containerStyle,
  containerProps = {},
  muted,
  outline,
  isPrivate,
  radius = defaultRadius,
  textColor,
  textProps = {},
}) => (
  <View
    style={[
      styles.labelContainer,
      containerStyle,
      { borderColor: borderColor || color || theme.base04 },
      !outline && {
        backgroundColor: color || theme.base04,
      },
      Boolean(radius) && { borderRadius: radius },
    ]}
    {...containerProps}
  >
    <Text
      numberOfLines={1}
      style={[
        styles.labelText,
        {
          color:
            textColor ||
            (outline
              ? color || (muted ? theme.base05 : theme.base04)
              : '#FFFFFF'),
        },
        muted && { opacity: mutedOpacity },
      ]}
      {...textProps}
    >
      {Boolean(isPrivate) && (
        <Text>
          <Icon name="lock" />{' '}
        </Text>
      )}
      {children}
    </Text>
  </View>
)

export default Label
