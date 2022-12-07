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

  return (
    <Layout>
      <Container>
        <Rooms />
      </Container>
      <Footer>
        <Input placeholder='Escreva o código da sala' autoCapitalize='none' />
        <Button>
          <Text>Criar sala</Text>
        </Button>
      </Footer>
    </Layout>
  )
}