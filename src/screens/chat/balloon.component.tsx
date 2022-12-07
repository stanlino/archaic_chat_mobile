import { ReactNode } from "react"

import { useScoketStore } from "../../store/socket"

import { Message } from "../../@types/dtos/message"

import { SystemMessage, UserMessage } from "./styles"

interface BalloonProps {
  item: Message
  previousItem: Message | null
  nextItem: Message | null
}

export function Balloon({ item, nextItem, previousItem }: BalloonProps) {
  if (item.type === 'system') {
    return (
      <SystemMessage.View>
        <SystemMessage.Text>{item.message}</SystemMessage.Text>
      </SystemMessage.View>
    )
  }

  return (
    <OwnerBalloon item={item} nextItem={nextItem} previousItem={previousItem}>
      <UserMessage.Text>
        {item.message}
      </UserMessage.Text>
    </OwnerBalloon>
  )
}

interface OwnerBalloonProps extends BalloonProps {
  children: ReactNode
}

function OwnerBalloon({ item, nextItem, previousItem, children }: OwnerBalloonProps) {

  const [ socketId ] = useScoketStore(state => [state.socket_id]) 

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
          }}
        >
          {children}
        </UserMessage.View>
      </UserMessage.Content>
    </UserMessage.Container>
  )
}