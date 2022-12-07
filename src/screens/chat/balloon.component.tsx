import { ReactNode } from "react"
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { useScoketStore } from "../../store/socket"

import { Message } from "../../@types/dtos/message"

import { SystemMessage, UserMessage } from "./styles"
import { useMessagesStore } from "../../store/messages"
import { Vibration } from "react-native"

interface BalloonProps {
  item: Message
  previousItem: Message | null
  nextItem: Message | null
  scrollToIndex: (message: Message) => void
}

export function Balloon({ item, nextItem, previousItem, scrollToIndex }: BalloonProps) {
  if (item.type === 'system') {
    return (
      <SystemMessage.View>
        <SystemMessage.Text>{item.message}</SystemMessage.Text>
      </SystemMessage.View>
    )
  }

  return (
    <OwnerBalloon item={item} nextItem={nextItem} previousItem={previousItem}>
      {item.reply && (
        <UserMessage.Reply onPress={() => scrollToIndex(item.reply!)}>
          <UserMessage.ReplyUsername style={{ color: item.reply.color }}>
            {item.reply.username}
          </UserMessage.ReplyUsername>
          <UserMessage.ReplyMessage>
            {item.reply.message}
          </UserMessage.ReplyMessage>
        </UserMessage.Reply>
      )}
      <UserMessage.Text>
        {item.message}
      </UserMessage.Text>
    </OwnerBalloon>
  )
}

interface OwnerBalloonProps {
  children: ReactNode
  item: Message
  previousItem: Message | null
  nextItem: Message | null
}

function OwnerBalloon({ item, nextItem, previousItem, children }: OwnerBalloonProps) {

  const [ socketId ] = useScoketStore(state => [state.socket_id]) 
  const [ currentReplyedMessage, setCurrentReplyedMessage ] = useMessagesStore(store => [store.currentReplyedMessage, store.setCurrentReplyedMessage])

  const currentMessageIsFromCurrentUser = item.socket_id === socketId
  const previousMessageIsFromCurrentUser = previousItem?.socket_id === item.socket_id
  const nextMessageIsFromCurrentUser = nextItem?.socket_id === item.socket_id

  const alignItems = currentMessageIsFromCurrentUser ? 'flex-end' : 'flex-start'
  const marginTop = previousMessageIsFromCurrentUser ? 4 : 8

  const borderTopRightRadius = currentMessageIsFromCurrentUser &&
    previousMessageIsFromCurrentUser ? 0 : 16

  const borderTopLeftRadius = !currentMessageIsFromCurrentUser &&
    previousMessageIsFromCurrentUser ? 0 : 16

  const borderBottomRightRadius = currentMessageIsFromCurrentUser &&
    nextMessageIsFromCurrentUser ? 0 : 16

  const borderBottomLeftRadius = !currentMessageIsFromCurrentUser &&
    nextMessageIsFromCurrentUser ? 0 : 16

  const showAvatar = !nextMessageIsFromCurrentUser && !currentMessageIsFromCurrentUser

  const showUsername = !previousMessageIsFromCurrentUser && !currentMessageIsFromCurrentUser

  return (
    <Swipeable
      friction={2}
      leftThreshold={40}
      renderRightActions={currentMessageIsFromCurrentUser ? RenderActions : undefined}
      renderLeftActions={!currentMessageIsFromCurrentUser ? RenderActions : undefined}
      onSwipeableOpen={(_, swipeable) => {
        if (swipeable) {
          swipeable.close()
        }
      }}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      onEnded={() => {
        Vibration.vibrate(50)
        setCurrentReplyedMessage(item)
      }}
    >
      <UserMessage.Container
        style={{
          alignItems,
          marginTop,
        }}
      >
        {showUsername && 
          <UserMessage.Name style={{ color: item.color }}>
            {item.username}
          </UserMessage.Name>
        }
        <UserMessage.Content>
          <UserMessage.Avatar 
            style={{ backgroundColor: showAvatar ? item.color : '#0000' }} 
          />
          <UserMessage.View
            style={{
              borderTopRightRadius,
              borderTopLeftRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              ...{...(!currentMessageIsFromCurrentUser && {
                backgroundColor: '#0003'
              })}
            }}
          >
            {children}
          </UserMessage.View>
        </UserMessage.Content>
      </UserMessage.Container>
    </Swipeable>
  )
}

function RenderActions(progressAnimatedValue: any, dragAnimatedValue: any) {
  return (
    <UserMessage.ReplyIndicatorView>
      <UserMessage.ReplyIndicatorIcon name="reply" />
    </UserMessage.ReplyIndicatorView>
  )
}