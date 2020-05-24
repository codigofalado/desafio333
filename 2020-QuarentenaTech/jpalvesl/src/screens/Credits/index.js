import React from 'react';
import { Zocial, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Container, Wrapper, Avatar, NameText, InformationText, SocialText, Bold, SocialContent, SocialItem } from './styles';

import info from '../../assets/personal.json';

import avatar from '../../assets/avatar.jpeg';

function Credits() {
  return (
    <Container>
      <Wrapper>
        <LinearGradient 
          colors={['#000', '#860c4e']}
          style={{flex: 1}}
        >
          
          <Avatar source={avatar} resizeMode="contain" />

          <NameText><Bold>Nome:</Bold> {info.name}</NameText>
          <InformationText>
            <Entypo name="location-pin" size={24} color="white" />
            {info.location}
          </InformationText>
          <InformationText>
            <Entypo name="graduation-cap" size={24} color="white" />
            {info.course}
          </InformationText>

          <InformationText>
            <Bold>Bio: </Bold> {info.bio}  
          </InformationText>

          <SocialContent>
            <SocialItem>
              <Zocial name="github" size={24} color="white" />
              <SocialText>Github</SocialText>
            </SocialItem>

            <SocialItem>
              <Zocial name="twitter" size={24} color="white" />
              <SocialText>Twitter</SocialText>
            </SocialItem>
          </SocialContent>
        </LinearGradient>
      </Wrapper>
    </Container>
  )
}

export default Credits;