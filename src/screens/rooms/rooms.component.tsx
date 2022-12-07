import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Room } from '../../@types/dtos/room'

import { Text } from '../../components/text'

import {
  Card,
  Hero,
  RowLoadingView,
  Wrapper
} from './styles'

export function Rooms() {

  const navigation = useNavigation()

  const [loading, setLoading] = useState(true)

  const [rooms, setRooms] = useState<Room[]>([])

  const isAlone = !loading && !rooms.length

  useEffect(() => {
    fetch('https://archaicchatserver-production.up.railway.app/rooms')
      .then(response => response.json())
      .then(data => {
        setRooms(data)
      })
      .finally(() => {
        setLoading(false)
      })
  },[])

  const handleJoinRoom = useCallback((roomId: string) => {
    navigation.navigate('chat', { room: roomId })
  }, [])

  if (loading) return (
    <Wrapper>
      <RowLoadingView>
        <ActivityIndicator style={{ marginRight: 10 }} size='large' color='#ea580c' />
        <Text>Procurando salas...</Text>
      </RowLoadingView>
    </Wrapper>
  )

  if (isAlone) return (
    <Wrapper>
      <Hero source={require('../../../assets/png/alone_hero.png')} />
      <Text style={{ marginBottom: 10 }}>Parece que só tem você aqui 🙁</Text>
      <Text subtext>Que tal criar uma sala?</Text>
    </Wrapper>
  )

  return (
    <ScrollView>
      <Text heading>Salas</Text>
      {rooms.map(room => (
        <Card.Container key={room.id} onPress={() => handleJoinRoom(room.id)}>
          <Text>#{room.id}</Text>
          <Card.Aside>
            <Text>{room.users.length}</Text>
          </Card.Aside>
        </Card.Container>
      ))}
    </ScrollView>
  )
}