import { Button, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { API_URL } from 'config/config.js';

function TopBarLink({ text, href, onClick, imagePathURL, imageName }) {
  return (
    <Link to={href ?? '#'} onClick={onClick ?? console.log()}>
      <Button
        h={text === 'profilePhoto' ? '50px' : 'auto'}
        p={text === 'profilePhoto' ? '0px' : '4px 10px'}
        borderRadius={text === 'profilePhoto' ? '50%' : '4px'}
        m=".2rem 0 .2rem 1rem"
        bg="color.buttonBlue"
        color="color.whiteText"
        _hover={{
          background: 'color.buttonBlueHover',
        }}
        mr="1rem"
      >
        {text === 'profilePhoto' ? (
          <Image borderRadius="full" boxSize="50px" src={API_URL + imagePathURL} alt={imageName} />
        ) : (
          <Text fontSize="2xl">{text}</Text>
        )}
      </Button>
    </Link>
  );
}

export default TopBarLink;
