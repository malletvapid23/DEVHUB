import React, { Fragment, PureComponent } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { Octicons as Icon } from '../../libs/vector-icons'
import { contentPadding, mutedOpacity } from '../../styles/variables'
import { IGitHubIcon } from '../../types'
import { fade } from '../../utils/helpers/color'
import Avatar, { AvatarProps } from '../common/Avatar'
import { ConditionalWrap } from '../common/ConditionalWrap'

export interface ColumnHeaderItemProps {
  avatarShape?: AvatarProps['shape']
  backgroundColor: string
  foregroundColor: string
  iconName?: IGitHubIcon
  iconStyle?: StyleProp<TextStyle>
  onPress?: () => void
  repo?: string
  showAvatarAsIcon?: boolean
  style?: StyleProp<ViewStyle>
  subtitle?: string
  subtitleStyle?: StyleProp<TextStyle>
  title?: string
  titleStyle?: StyleProp<TextStyle>
  username?: string
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: contentPadding,
  } as ViewStyle,

  icon: {
    fontSize: 20,
  } as TextStyle,

  title: {
    fontSize: 18,
  } as TextStyle,

  subtitle: {
    fontSize: 14,
  } as TextStyle,
})

export default class ColumnHeaderItem extends PureComponent<
  ColumnHeaderItemProps
> {
  render() {
    const {
      avatarShape,
      backgroundColor,
      foregroundColor,
      iconName,
      iconStyle,
      onPress,
      repo,
      showAvatarAsIcon,
      style,
      subtitle,
      subtitleStyle,
      title,
      titleStyle,
      username,
      ...props
    } = this.props

    return (
      <ConditionalWrap
        condition
        wrap={children =>
          onPress ? (
            <TouchableOpacity
              {...props}
              onPress={onPress}
              style={[styles.container, { backgroundColor }, style]}
            >
              {children}
            </TouchableOpacity>
          ) : (
            <View
              {...props}
              style={[styles.container, { backgroundColor }, style]}
            >
              {children}
            </View>
          )
        }
      >
        <Fragment>
          {showAvatarAsIcon
            ? !!username && (
                <Avatar
                  isBot={false}
                  linkURL=""
                  repo={repo}
                  shape={avatarShape}
                  style={[
                    {
                      width: 20,
                      height: 20,
                    },
                    !!title || !!subtitle
                      ? {
                          marginRight: 8,
                        }
                      : undefined,
                  ]}
                  username={username}
                />
              )
            : !!iconName && (
                <Icon
                  color={foregroundColor}
                  name={iconName}
                  style={[
                    styles.icon,
                    (!!title || !!subtitle) && {
                      marginRight: 4,
                    },
                    iconStyle,
                  ]}
                />
              )}

          {!!title && (
            <Text
              style={[styles.title, { color: foregroundColor }, titleStyle]}
            >
              {title.toLowerCase()}
            </Text>
          )}
          {!!subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: fade(foregroundColor, mutedOpacity) },
                subtitleStyle,
              ]}
            >
              {!!title && '  '}
              {subtitle.toLowerCase()}
            </Text>
          )}
        </Fragment>
      </ConditionalWrap>
    )
  }
}
