import { rgba } from 'polished'
import React, { PureComponent } from 'react'
import {
  ImageStyle,
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
import Avatar, { AvatarProps } from '../common/Avatar'
import {
  ConditionalWrap,
  ConditionalWrapProps,
} from '../common/ConditionalWrap'
import { ThemeConsumer } from '../context/ThemeContext'
import { UserConsumer } from '../context/UserContext'

export const columnHeaderItemContentSize = 20

export interface ColumnHeaderItemProps {
  avatarShape?: AvatarProps['shape']
  avatarStyle?: StyleProp<ImageStyle>
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
    fontSize: columnHeaderItemContentSize,
  } as TextStyle,

  title: {
    fontSize: columnHeaderItemContentSize - 2,
  } as TextStyle,

  subtitle: {
    fontSize: columnHeaderItemContentSize - 6,
  } as TextStyle,
})

export class ColumnHeaderItem extends PureComponent<ColumnHeaderItemProps> {
  wrap: ConditionalWrapProps['wrap'] = children =>
    this.props.onPress ? (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.container, this.props.style]}
      >
        {children}
      </TouchableOpacity>
    ) : (
      <View style={[styles.container, this.props.style]}>{children}</View>
    )

  render() {
    const {
      avatarShape,
      avatarStyle,
      iconName,
      iconStyle,
      repo,
      showAvatarAsIcon,
      subtitle,
      subtitleStyle,
      title,
      titleStyle,
      username: _username,
    } = this.props

    return (
      <UserConsumer>
        {({ user }) => {
          const username =
            user && user.login === _username ? undefined : _username

          const smallAvatarSpacing = 5

          return (
            <ThemeConsumer>
              {({ theme }) => (
                <ConditionalWrap condition wrap={this.wrap}>
                  <>
                    {(!!iconName || (showAvatarAsIcon && !!username)) && (
                      <View
                        style={{
                          position: 'relative',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight:
                            title || subtitle
                              ? 8 +
                                (showAvatarAsIcon && username
                                  ? smallAvatarSpacing
                                  : 0)
                              : 0,
                        }}
                      >
                        {iconName ? (
                          <>
                            <Icon
                              color={theme.foregroundColor}
                              name={iconName}
                              style={[styles.icon, iconStyle]}
                            />

                            {showAvatarAsIcon &&
                              !!username && (
                                <Avatar
                                  hitSlop={{
                                    top:
                                      columnHeaderItemContentSize +
                                      smallAvatarSpacing,
                                    bottom: smallAvatarSpacing,
                                    left:
                                      columnHeaderItemContentSize / 2 +
                                      smallAvatarSpacing,
                                    right:
                                      columnHeaderItemContentSize / 2 +
                                      smallAvatarSpacing,
                                  }}
                                  isBot={false}
                                  linkURL=""
                                  repo={repo}
                                  shape={avatarShape}
                                  style={[
                                    {
                                      position: 'absolute',
                                      bottom: 0,
                                      marginLeft: smallAvatarSpacing,
                                      width: 10,
                                      height: 10,
                                    },
                                    avatarStyle,
                                  ]}
                                  username={username}
                                />
                              )}
                          </>
                        ) : (
                          showAvatarAsIcon &&
                          !!username && (
                            <Avatar
                              isBot={false}
                              linkURL=""
                              repo={repo}
                              shape={avatarShape}
                              style={[
                                {
                                  width: columnHeaderItemContentSize,
                                  height: columnHeaderItemContentSize,
                                },
                                avatarStyle,
                              ]}
                              username={username}
                            />
                          )
                        )}
                      </View>
                    )}

                    {!!title && (
                      <Text
                        style={[
                          styles.title,
                          { color: theme.foregroundColor },
                          titleStyle,
                        ]}
                      >
                        {title.toLowerCase()}
                      </Text>
                    )}
                    {!!subtitle && (
                      <Text
                        style={[
                          styles.subtitle,
                          { color: rgba(theme.foregroundColor, mutedOpacity) },
                          subtitleStyle,
                        ]}
                      >
                        {!!title && '  '}
                        {subtitle.toLowerCase()}
                      </Text>
                    )}
                  </>
                </ConditionalWrap>
              )}
            </ThemeConsumer>
          )
        }}
      </UserConsumer>
    )
  }
}
