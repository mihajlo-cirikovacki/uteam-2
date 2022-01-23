import { HStack, Spacer, Icon, Heading, Flex } from '@chakra-ui/react';
import { FaTeamspeak } from 'react-icons/fa';

import TopBarLink from './TopBarLink';

import { useAuthContext } from 'context/AuthContext.jsx';

function TopBar() {
  const { currentUser, isUserLoggedIn, handleLogout } = useAuthContext();
  const guestLinks = [
    {
      text: 'Login',
      href: '/login',
    },
    {
      text: 'Register',
      href: '/register',
    },
  ];
  const userLinks = [
    {
      text: 'Logout',
      href: '/',
      onClick: () => handleLogout(),
    },
    {
      text: currentUser?.username,
      href: '/my-profile',
    },
    {
      text: 'profilePhoto',
      href: '/my-profile',
      imagePathURL: currentUser?.imagePathURL,
      imageName: currentUser?.imageName,
    },
  ];
  const links = isUserLoggedIn ? userLinks : guestLinks;

  return (
    <HStack
      pos="fixed"
      top="0"
      left="0"
      w="100%"
      p={{ base: '1rem', sm: '2rem', md: '3rem' }}
      h="100px"
      color="color.whiteText"
      bgGradient="linear(color.backgroundLight 50%, color.background 100%)"
    >
      <HStack>
        <Icon as={FaTeamspeak} fontSize="7xl"></Icon>
        <Heading as="h2" size="2xl">
          uTeam
        </Heading>
      </HStack>
      <Spacer />
      <HStack>
        <Flex alignItems="center" flexDir={{ base: 'column', smmd: 'row' }}>
          {links.map((linkObj, index) => (
            <TopBarLink
              text={linkObj.text}
              href={linkObj.href}
              onClick={linkObj.onClick}
              imagePathURL={linkObj.imagePathURL}
              imageName={linkObj.imageName}
              key={index}
            />
          ))}
        </Flex>
      </HStack>
    </HStack>
  );
}

export default TopBar;
