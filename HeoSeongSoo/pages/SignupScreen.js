import React from  'react';
import { Alert, Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { StackActions } from '@react-navigation/native';
import { TextInput, Button, ActivityIndicator, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ServerUrl } from '../components/TextComponent';
import { styles } from '../components/StyleSheetComponent';
import BackButton from '../components/buttons/BackButton';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';


const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    padding-top: ${Constants.statusBarHeight}px;
`;

const ErrorMsg = styled.Text`
    color: red;
    font-size: 12px;
`;

const PassMsg = styled.Text`
    color: green;
    font-size: 12px;
`;

function SignupScreen({ navigation, route }) {
    const [textAccount, setTextAccount] = React.useState('');
    const [textNickname, setTextNickname] = React.useState(route.params?.nickname);
    const [textPassword, setTextPassword] = React.useState('');
    const [textPasswordConfrim, setTextPasswordConfrim] = React.useState('');
    const [modalImageVisible, setModalImageVisible] = React.useState(false);
    const [indicatorVisible, setIndicatorVisible] = React.useState(false);
    const [userImage, setUserImage] = React.useState(null);
    const [userToken, setUserToken] = React.useState(route.params?.userToken);

    const [accountError, setAccountError] = React.useState(null);
    const [accountPass, setAccountPass] = React.useState(null);
    const [nicknameError, setNicknameError] = React.useState(null);
    const [imageError, setimageError] = React.useState(null);
    const [passwordError, setPasswordError] = React.useState(null);

    React.useEffect(() => {
        const imageUri = route.params?.image?.uri
        setUserImage(imageUri);
        // imageUri 서버에 업로드 uploadCategory 첨부, 후 모달 재오픈
        // setModalVisible(true);
    }, [route.params?.image]);

    const patchUserNickname = () => {
        const requestHeaders = {
            headers: {
                Authorization: `JWT ${userToken}`
            }
        }

        const patchData = {
            nickname: textNickname
        }

        axios.patch(ServerUrl.url + 'rest-auth/user/', patchData, requestHeaders)
        .then(res => {
            // empty
        })
        .catch(err => {
            console.error(err)
            if (err.response.data.nickname[0] === "이 필드의 글자 수가 20 이하인지 확인하십시오."){
                setNicknameError('닉네임은 20글자 이하로 입력해주세요.')
            }
        })
    }

    const getUserPersonalColor = () => {
        if (userImage === null) {
            return
        }
        setIndicatorVisible(true);
        const requestHeaders = {
            headers: {
                Authorization: `JWT ${userToken}`,
                "Content-Type": "multipart/form-data",
            }
        }

        const userImageData = {
            uri: userImage,
            type: 'image/jpeg',
            name: 'item.jpg',
        }
        const fd = new FormData();
        fd.append('img', userImageData);

        axios.post(ServerUrl.url + 'accounts/personalcolor/', fd, requestHeaders)
        .then(res => {
            if (res.data === '정면 사진을 올려주세요.') {
                setimageError('다른 이미지를 올려주세요');
            } else {
                // signUp(userToken);
                let color;
                switch (res.data){
                    case ('봄웜톤(spring)'):
                        color = 'spring';
                        break;
                    case ('여름쿨톤(summer)'):
                        color = 'summer';
                        break;
                    case ('가을웜톤(fall)'):
                        color = 'fall';
                        break;
                    case ('겨울쿨톤(winter)'):
                        color = 'winter';
                        break;
                }
                navigation.dispatch(
                    StackActions.replace("PersonalColor", {color: color, userToken: userToken})
                );
            }
            setIndicatorVisible(false);
        })
        .catch(err => {
            setIndicatorVisible(false);
            console.error(err)
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setUserImage(result.uri);
        // 서버에 result 업로드, uploadCategory 첨부
    }
    return (
        <Container>
            {userToken === undefined ? (
                <>
                    <BackButton 
                    onPress={() => navigation.goBack()}
                    ></BackButton>
                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TextInput
                            label="아이디"
                            value={textAccount}
                            onChangeText={text => {
                                setTextAccount(text);
                                setAccountError(null);
                                setAccountPass(null);
                                }
                            }
                            style={{ width: '60%', backgroundColor: 'rgba(0, 0, 0, 0)'}}
                            theme={{colors: {primary: '#0d3754'}}}
                        />
                        {accountPass === null ?
                            <Button
                                mode="text"
                                onPress={() => {
                                    setAccountError(null);
                                    setAccountPass(null);
                                    if (textAccount !== ''){
                                        axios.get(ServerUrl.url + `accounts/chk/${textAccount}`)
                                        .then(res => {
                                            if (res.data === '사용 할 수 있는 아이디입니다.') {
                                                setAccountPass(res.data);
                                            } else {
                                                setAccountError(res.data);
                                            }
                                        })
                                        .catch(err => console.error(err))
                                    } 
                                }}
                                style={{paddingVertical: 8, width: '25%', backgroundColor: '#0d3754'}}
                                labelStyle={{color: 'white'}}
                            >
                                중복확인
                            </Button>
                        :
                            <Button
                                mode="text"
                                style={{paddingVertical: 8, width: '25%', borderWidth: 1, borderColor: '#2db400'}}
                                labelStyle={{color: '#2db400'}}
                            >
                                확인완료
                            </Button>
                        }
                        
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {accountError && <ErrorMsg style={{ width: '85%', backgroundColor: 'rgba(0, 0, 0, 0)', marginLeft: 20}}>{ accountError }</ErrorMsg>}
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                            label="비밀번호"
                            type="password"
                            value={textPassword}
                            onChangeText={text => setTextPassword(text)}
                            secureTextEntry
                            style={{ width: '85%', backgroundColor: 'rgba(0, 0, 0, 0)'}}
                            theme={{colors: {primary: '#0d3754'}}}
                        />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                            label="비밀번호 확인"
                            value={textPasswordConfrim}
                            onChangeText={text => setTextPasswordConfrim(text)}
                            secureTextEntry
                            style={{ width: '85%', backgroundColor: 'rgba(0, 0, 0, 0)'}}
                            theme={{colors: {primary: '#0d3754'}}}
                        />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {passwordError !== null ? <ErrorMsg style={{ width: '85%', backgroundColor: 'rgba(0, 0, 0, 0)', marginLeft: 20}}>{ passwordError }</ErrorMsg> : null}
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                        <Button
                            mode="contained"
                            onPress={() => {
                                if (textAccount.length === 0 || textPassword.length === 0 || textPasswordConfrim.length === 0) {
                                    return Alert.alert("", "모든 정보를 입력해주세요.");
                                } else if (textPassword !== textPasswordConfrim) {
                                    return Alert.alert("", "비밀번호가 일치하지 않습니다.");
                                } else if (textPassword.length < 8) {
                                    return setPasswordError('비밀번호는 8자리 이상 이어야 합니다.');
                                } else if (textAccount.length < 6) {
                                    return setAccountError('아이디는 6글자 이상 이어야 합니다.');
                                } else if (accountPass === null) {
                                    return setAccountError('중복 확인을 해주세요.')
                                } else {
                                    setPasswordError(null)
                                    setAccountError(null)
                                    const signupData = {
                                        username: textAccount,
                                        password1: textPassword,
                                        password2: textPasswordConfrim
                                    }
                                    // 회원가입 로직 -> 닉네임, 아이디 중복 확인 처리
                                    axios.post(ServerUrl.url + 'rest-auth/registration/', signupData)
                                    .then(res => {
                                        setTextNickname(textAccount);
                                        setUserToken(res.data.token);
                                    })
                                    .catch(err => {
                                        if (err.response.data?.username) {
                                            setAccountError(err.response.data?.username[0])
                                        } else if (err.response.data?.password1) {
                                            setPasswordError(err.response.data?.password1[0])
                                        }
                                    })
                                }
                            }}
                            style={{borderWidth: 1, borderColor: '#0d3754', width: 200, marginBottom: 15}}
                            labelStyle={{fontSize:20, color: '#0d3754'}}
                            theme={{colors: {primary: 'rgba(0, 0, 0, 0)'}}}
                        >
                            가입하기
                        </Button>
                    </View>
                </>
            ) : (
                <>  
                    <Modal
                        transparent={true}
                        visible={indicatorVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <ActivityIndicator
                                    style={{marginBottom: 12}}
                                    animating={true}
                                    transparent={true}
                                    color={'#c9a502'}
                                    size={'large'}
                                />
                                <Text>퍼스널 컬러를 분석중입니다</Text>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalImageVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <TouchableHighlight
                                    style={{width: Dimensions.get('window').width * 0.7, marginBottom: 15, marginRight: 0, paddingRight: 0, alignItems: 'flex-end'}}
                                    underlayColor="none"
                                    onPress={() => {
                                        setModalImageVisible(!modalImageVisible);
                                    }}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                </TouchableHighlight>

                                <Text style={styles.textStyle, {color: 'black', marginBottom: 7}}>*얼굴의 정면이 완전히 나온 사진을 올려주세요</Text>
                                <TouchableHighlight
                                    style={{ ...styles.openButton }}
                                    onPress={() => {
                                        navigation.navigate('Camera', {backScreen: 'Sign up'});
                                        setModalImageVisible(!modalImageVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>카메라</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{ ...styles.openButton }}
                                    onPress={() => {
                                        pickImage();
                                        setModalImageVisible(!modalImageVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>갤러리에서 가져오기</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <BackButton 
                    onPress={() => navigation.goBack()}
                    ></BackButton>
                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TextInput
                            label="닉네임"
                            value={textNickname}
                            secureTextEntry={false}
                            onChangeText={text => setTextNickname(text)}
                            style={{ width: '85%', backgroundColor: 'rgba(0, 0, 0, 0)'}}
                            theme={{colors: {primary: '#0d3754'}}}
                        />
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'flex-end'}}>
                        {nicknameError !== null ? <ErrorMsg style={{ width: '85%', backgroundColor: 'rgba(0, 0, 0, 0)', marginLeft: 20}}>{ nicknameError }</ErrorMsg> : null}
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <View style={{marginBottom: 10, borderColor: '#c9a502', backgroundColor:'white', alignItems: 'center', borderRadius: 20, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 20}}>
                            <Text>퍼스널 컬러란?</Text>
                            <Text style={{fontSize: 12}}>개인이 가진 신체의 색과 어울리는 색을 뜻하며,</Text>
                            <Text style={{fontSize: 12}}>이를 통해 효과적인 이미지 메이킹이 가능합니다</Text>
                        </View>
                        <Button
                            mode="outlined"
                            onPress={() => {
                                setModalImageVisible(true);
                            }}
                            style={{borderWidth: 1, borderColor: '#0d3754', width: '85%', marginBottom: 15}}
                            labelStyle={{fontSize:16, color: '#0d3754'}}
                            theme={{colors: {primary: 'rgba(0, 0, 0, 0)'}}}
                        >
                            퍼스널 컬러 진단을 위한 사진 업로드
                        </Button>
                        
                    </View>
                    
                        {userImage && 
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                            <Image source={{ uri: userImage }} style={{ width: '85%', height: 200, resizeMode: 'contain' }}/>
                        </View>
                        }
                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'flex-end'}}>
                        {imageError && <ErrorMsg style={{ width: '85%', backgroundColor: 'rgba(0, 0, 0, 0)'}}>{ imageError }</ErrorMsg>}
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                        <Button
                            mode="outlined"
                            onPress={() => {
                                if (textNickname.length < 3) {
                                    return setNicknameError('닉네임을 3글자 이상 입력해주세요.')
                                } else if (userImage === undefined || userImage === null) {
                                    return setimageError('이미지를 등록해주세요. 이미지는 저장되지 않습니다.')
                                } else {
                                    patchUserNickname();
                                    getUserPersonalColor();
                                }
                            }}
                            style={{borderWidth: 1, borderColor: '#0d3754', width: '85%', marginBottom: 15}}
                            labelStyle={{fontSize:16, color: '#0d3754'}}
                            theme={{colors: {primary: 'rgba(0, 0, 0, 0)'}}}
                        >
                            진단 시작!
                        </Button>
                    </View>
                </>
            )}
        </Container>
    );
}

export default SignupScreen;