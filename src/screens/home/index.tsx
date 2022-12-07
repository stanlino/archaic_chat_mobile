import React, { useRef } from 'react'

import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/layout'
import { Text } from '../../components/text'
import { Button } from '../../components/button'
import { Input } from '../../components/input'

import { Container, Hero, Footer } from './styles'
import { useUserStore } from '../../store/user'

export function HomeScreen(){

  const navigation = useNavigation()

  const [username, setUsername] = useUserStore(state => [state.username, state.setUsername])

  function handleFindRooms() {
    if (username.length < 1) return 
      
    navigation.navigate('rooms')
  }

  return (
    <Layout>
      <Container>
        <Text heading>Archaic Chat</Text>
        <Text style={{ marginVertical: 8 }}>Encontre salas de chat e converse com pessoas do mundo inteiro</Text>
        <Hero source={require('../../../assets/png/chat_hero.png')}/>
        <Footer>
          <Input 
            value={username} 
            onChangeText={setUsername} 
            placeholder="Digite seu nome" 
            autoComplete='username'
            style={{ marginBottom: 8 }}
          />
          <Button onPress={handleFindRooms}>
            <Text>Encontrar salas</Text>
          </Button>
        </Footer>
      </Container>
    </Layout>
  )
}