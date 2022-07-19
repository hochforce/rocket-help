import { VStack, HStack, IconButton, useTheme, Text, Heading } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';

export function Home() {
  const { colors } = useTheme();

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
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6} >
        <Heading color="gray.100" >

        </Heading>
        <HStack w="full" mt={8} justifyContent="space-between" alignItems="Center" >
          <Text color="gray.200">
            3
          </Text>
        </HStack>

      </VStack>
    </VStack>
  );
}