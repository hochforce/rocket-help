import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { VStack, HStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { ChatTeardropText } from 'phosphor-react-native';

import { SignOut } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '2256',
      patrimony: '10056',
      when: '20/07/2022 às 09:27',
      status: 'open'
    },
    {
      id: '2257',
      patrimony: '10057',
      when: '19/07/2022 às 10:00',
      status: 'open'
    },
    {
      id: '2258',
      patrimony: '10058',
      when: '19/07/2022 às 09:27',
      status: 'open'
    },
    {
      id: '2259',
      patrimony: '10059',
      when: '18/07/2022 às 11:30',
      status: 'open'
    },
    {
      id: '2260',
      patrimony: '10060',
      when: '18/07/2022 às 08:45',
      status: 'open'
    },
    {
      id: '2261',
      patrimony: '10061',
      when: '17/07/2022 às 07:24',
      status: 'open'
    },
    {
      id: '2262',
      patrimony: '10062',
      when: '17/07/2022 às 07:00',
      status: 'open'
    }
  ])
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails( orderId: string ){
    navigation.navigate('details', { orderId });
  }

  function handleLogout(){
    auth().signOut().catch(error =>{
      console.log(error);
      return Alert.alert('Sair', 'Não foi possível sair.');
    })
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700" >
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
        mt={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6} >
        <Heading color="gray.100" >

        </Heading>
        <HStack
          w="full"
          mb={8}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type='open'
            title='em andamento'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type='closed'
            title='finalizados'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} onPress={()=>handleOpenDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center" >
                Você ainda não possui {'\n'} solicitações
                {statusSelected === 'open' ? ' em andamento' : ' finalizadas'}
              </Text>
            </Center>
          )}
        />
        <Button title='Nova Solicitação' onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}