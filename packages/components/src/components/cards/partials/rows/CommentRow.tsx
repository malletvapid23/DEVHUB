import React from 'react'

import { Omit, stripMarkdown, trimNewLinesAndSpaces } from '@devhub/core'
import { useCSSVariablesOrSpringAnimatedTheme } from '../../../../hooks/use-css-variables-or-spring--animated-theme'
import { Platform } from '../../../../libs/platform'
import { fixURL } from '../../../../utils/helpers/github/url'
import {
  SpringAnimatedText,
  SpringAnimatedTextProps,
} from '../../../animated/spring/SpringAnimatedText'
import { Avatar } from '../../../common/Avatar'
import { Link, LinkProps } from '../../../common/Link'
import { cardStyles, getCardStylesForTheme } from '../../styles'
import { BaseRow, BaseRowProps } from './partials/BaseRow'
import { cardRowStyles } from './styles'

export interface CommentRowProps
  extends Omit<
    BaseRowProps,
    'containerStyle' | 'contentContainerStyle' | 'left' | 'right'
  > {
  addBottomAnchor?: boolean
  analyticsLabel?: LinkProps['analyticsLabel']
  avatarUrl: string | undefined
  body: string
  isRead: boolean
  numberOfLines?: number
  textStyle?: SpringAnimatedTextProps['style']
  url?: string
  userLinkURL: string | undefined
  username: string | undefined
}

export const CommentRow = React.memo((props: CommentRowProps) => {
  const springAnimatedTheme = useCSSVariablesOrSpringAnimatedTheme()

  const {
    addBottomAnchor,
    analyticsLabel,
    avatarUrl,
    body: _body,
    isRead,
    numberOfLines = props.numberOfLines ||
      (props.viewMode === 'compact' ? 1 : 2),
    textStyle,
    url,
    userLinkURL,
    username,
    ...otherProps
  } = props

  const body = trimNewLinesAndSpaces(
    stripMarkdown(`${_body || ''}`),
    Platform.select({ default: 400, web: 150 }),
  )
  if (!body) return null

  const isBot = Boolean(username && username.indexOf('[bot]') >= 0)

  return (
    <BaseRow
      {...otherProps}
      left={
        <Avatar
          avatarUrl={avatarUrl}
          isBot={isBot}
          linkURL={userLinkURL}
          small
          style={cardStyles.avatar}
          username={username}
        />
      }
      right={
        <Link
          analyticsLabel={analyticsLabel}
          href={fixURL(url, { addBottomAnchor })}
          style={cardRowStyles.mainContentContainer}
        >
          <SpringAnimatedText
            numberOfLines={numberOfLines}
            style={[
              getCardStylesForTheme(springAnimatedTheme).commentText,
              textStyle,
              isRead && getCardStylesForTheme(springAnimatedTheme).mutedText,
            ]}
          >
            {body}
          </SpringAnimatedText>
        </Link>
      }
    />
  )
})
