import React from  'react';
import { Alert, Text, View } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { TextInput, Button } from 'react-native-paper';
import AuthContext from '../components/AuthContext';

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    padding-top: ${Constants.statusBarHeight}px;
`;

function LoginScreen({ navigation }) {
    const [textAccount, setTextAccount] = React.useState('');
    const [textPassword, setTextPassword] = React.useState('');
    
    const { signIn } = React.useContext(AuthContext);

    return (
        <Container>
            <TextInput
                label="Account"
                value={textAccount}
                onChangeText={text => setTextAccount(text)}
            />
            <TextInput
                label="Password"
                type="password"
                value={textPassword}
                onChangeText={text => setTextPassword(text)}
                secureTextEntry
            />
            <Button
                icon="account-key"
                mode="contained"
                onPress={() => {
                    if (textAccount.length === 0 || textPassword.length === 0) {
                        return Alert.alert("", "아이디 혹은 비밀번호를 확인하세요.")
                    }
                    console.log(textAccount, textPassword)
                    signIn({ textAccount, textPassword });
                }}
            >
                로그인
            </Button>
            <View
                // style={{alignItems: 'flex-end'}}
            >
                <Button
                    // style={{width: '50%'}}
                    icon="account-plus"
                    mode="text"
                    onPress={() => {
                        navigation.navigate('Sign up');
                    }}
                >
                    회원가입
                </Button>
            </View>
        </Container>
    )
}

export default LoginScreen;