import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Wrapper = styled.ScrollView``;

export const Avatar = styled.Image`
  height: 150px;
  width: 150px;
  align-self: center;
`;

export const NameText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const InformationText = styled.Text`
  color: #fff;
  font-size: 14px;
  margin: 0 16px 8px 16px;
`;

export const SocialContent = styled.View`
  flex-direction: row;
  align-self: center;
`;

export const SocialItem = styled.TouchableOpacity`
  align-items: center;
  margin-right: 20px;
`;

export const SocialText = styled.Text`
  color: #fff;
  font-size: 12px;
`;