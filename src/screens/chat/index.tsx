import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'

import { Layout } from '../../components/layout'
import { Text } from '../../components/text'

import { useChat } from '../../hooks/useChat'
import { useConnection } from '../../hooks/useConnection'

import { Balloon } from './balloon.component'

import {
  Container, Footer
} from './styles'

export function ChatScreen(){

  const { setOptions } = useNavigation()
  const { params } = useRoute()
  const { room } = params as any

  const [currentMessage, setCurrentMessage] = useState('')

  const { connected, socket } = useConnection(room)
  const { messages, sendMessage, users } = useChat(socket, room)

  const flatlistRef = useRef<FlatList>(null)

  function handleSendMessage() {
    if (!currentMessage) return
    if (currentMessage.trim() === '') return

    sendMessage(currentMessage)
    setCurrentMessage('')
  }

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
            />
          }
        />
        <Footer.Container>
          {connected ? (
            <Footer.Connected>
              <Footer.Input value={currentMessage} onChangeText={setCurrentMessage} placeholder='Escreva uma mensagem' />
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