import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/layout'
import { Text } from '../../components/text'
import { Button } from '../../components/button'
import { Input } from '../../components/input'

import { Container, Hero, Footer } from './styles'
import { useUserStore } from '../../store/user'

export function HomeScreen(){

  const [username, setUsername] = useUserStore(state => [state.username, state.setUsername])

  const navigation = useNavigation()

  const handleFindRooms = useCallback(() => {
    if (username) {
      navigation.navigate('rooms')
    }
  }, [])

  return (
    <Layout>
      <Container>
        <Text heading>Archaic Chat</Text>
        <Hero source={require('../../../assets/png/chat_hero.png')}/>
        <Footer>
          <Input value={username} onChangeText={setUsername} placeholder="Digite seu nome" autoComplete='name' />
          <Button onPress={handleFindRooms}>
            <Text>Encontrar salas</Text>
          </Button>
        </Footer>
      </Container>
    </Layout>
  )
}