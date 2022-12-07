import { useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Layout } from '../../components/layout'
import { Text } from '../../components/text'

import {
  Container, 
  Footer,
} from './styles'

import { Rooms } from './rooms.component'

export function RoomsScreen(){

  const navigation = useNavigation()

  const [newRoomCode, setNewRoomCode] = useState('')

  function handleCreateRoom() {

    if (!newRoomCode) return

    navigation.navigate('chat', { room: newRoomCode })
  }

  return (
    <Layout>
      <Container>
        <Rooms />
      </Container>
      <Footer>
        <Input onChangeText={setNewRoomCode} placeholder='Escreva o código da sala' autoCapitalize='none' />
        <Button onPress={handleCreateRoom}>
          <Text>Criar sala</Text>
        </Button>
      </Footer>
    </Layout>
  )
}