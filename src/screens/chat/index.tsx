import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'

import { Message } from '../../@types/dtos/message'

import { Layout } from '../../components/layout'
import { Text } from '../../components/text'

import { useChat } from '../../hooks/useChat'
import { useConnection } from '../../hooks/useConnection'
import { useMessagesStore } from '../../store/messages'

import { Balloon } from './balloon.component'

import {
  Container, Footer
} from './styles'

export function ChatScreen(){

  const { setOptions } = useNavigation()
  const { params } = useRoute()
  const { room } = params as any

  const [currentMessage, setCurrentMessage] = useState('')
  const [inputHeight, setInputHeight] = useState(0)

  const { connected, socket } = useConnection(room)
  const { messages, sendMessage, users } = useChat(socket, room)
  const [ currentReplyedMessage, setCurrentReplyedMessage ] = useMessagesStore(store => [store.currentReplyedMessage, store.setCurrentReplyedMessage]) 

  const flatlistRef = useRef<FlatList>(null)

  function handleSendMessage() {
    if (!currentMessage) return
    if (currentMessage.trim() === '') return

    sendMessage(currentMessage)
    setCurrentMessage('')
    setInputHeight(0)
  }

  const scrollToIndex = useCallback((message: Message) => {
    const index = messages.findIndex(msg => msg.id === message.id)

    flatlistRef.current?.scrollToIndex({index, animated: true})
  }, [flatlistRef, messages])


  useEffect(() => {
    setOptions({
      title: `${room}`,
      headerRight: () => (
        <Text>
          {users.length > 0 ? `${users.length + 1} usuários` : `Só você aqui`}
        </Text>
      )
    })
  },[users])

  return (
    <Layout>
      <Container>
        <FlatList 
          ref={flatlistRef}
          style={{ marginBottom: 8 }}
          onContentSizeChange={() => flatlistRef.current?.scrollToEnd({ animated: false })}
          onLayout={() => flatlistRef.current?.scrollToEnd({ animated: false })}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => 
            <Balloon 
              item={item}
              previousItem={messages[index - 1]}
              nextItem={messages[index + 1]}
              scrollToIndex={scrollToIndex}
            />
          }
        />
        <Footer.Container>
          {connected ? (
            <Footer.Connected>
              <Footer.Content>
                {currentReplyedMessage && (
                  <Footer.ReplyedMessage>
                    <Footer.ReplyedMessageUsername style={{ color: currentReplyedMessage.color }}>
                      {currentReplyedMessage.username}
                    </Footer.ReplyedMessageUsername>
                    <Footer.ReplyedMessageText>
                      {currentReplyedMessage.message}
                    </Footer.ReplyedMessageText>
                  </Footer.ReplyedMessage>
                )}
                <Footer.Input 
                  value={currentMessage} 
                  onChangeText={setCurrentMessage} 
                  placeholder={currentReplyedMessage ? 'Responder...' : 'Digite uma mensagem...'}
                  onContentSizeChange={e => 
                    setInputHeight(e.nativeEvent.contentSize.height)
                  }
                  style={{ 
                    height: Math.max(50, inputHeight),
                    borderTopLeftRadius: currentReplyedMessage ? 0 : 25,
                    borderTopRightRadius: currentReplyedMessage ? 0 : 25,
                  }}
                />
              </Footer.Content>
              <Footer.Button onPress={handleSendMessage}>
                <Footer.Icon name='send' />
              </Footer.Button>
            </Footer.Connected>
          ): (
            <Footer.Disconected>
              <Footer.ActivityIndicator size='small' />
              <Footer.LoadingText>Conectando...</Footer.LoadingText>
            </Footer.Disconected>
          )}
        </Footer.Container>
      </Container>
    </Layout>
  )
}