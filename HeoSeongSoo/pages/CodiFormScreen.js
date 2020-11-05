import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image, ScrollView, Dimensions } from 'react-native';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { CategoryText } from '../components/TextComponent';
import RowContainer from '../components/RowContainer';

function CodiFormScreen({ navigation, route }) {
    const [uploadCategory, setUploadCategory] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [hatImage, setHatImage] = React.useState(null);
    const [topImage, setTopImage] = React.useState(null);
    const [pantsImage, setPantsImage] = React.useState(null);
    const [shoesImage, setShoesImage] = React.useState(null);
    const [outerImage, setOuterImage] = React.useState(null);
    const [bagImage, setBagImage] = React.useState(null);
    const [watchImage, setWatchImage] = React.useState(null);
    const [AccImage, setAccImage] = React.useState(null);

    React.useEffect(() => {
        const imageUri = route.params?.image.uri
        if (imageUri) {
            switch (uploadCategory) {
                case 'top':
                    setTopImage(imageUri);
                    break;
                case 'pants':
                    setPantsImage(imageUri);
                    break;

                case 'shoes':
                    setShoesImage(imageUri);
                    break;

                case 'outer':
                    setOuterImage(imageUri);
                    break;

                case 'hat':
                    setHatImage(imageUri);
                    break;

                case 'bag':
                    setBagImage(imageUri);
                    break;

                case 'watch':
                    setWatchImage(imageUri);
                    break;

                case 'accessory':
                    setAccImage(imageUri);
                    break;
            }
        }
    }, [route.params?.image]);

    React.useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            navigation.navigate.goBack();
          }
        }
      })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            console.log(uploadCategory)
            switch (uploadCategory) {
                case 'top':
                    setTopImage(result.uri);
                    break;
                case 'pants':
                    setPantsImage(result.uri);
                    break;

                case 'shoes':
                    setShoesImage(result.uri);
                    break;

                case 'outer':
                    setOuterImage(result.uri);
                    break;

                case 'hat':
                    setHatImage(result.uri);
                    break;

                case 'bag':
                    setBagImage(result.uri);
                    break;

                case 'watch':
                    setWatchImage(result.uri);
                    break;

                case 'accessory':
                    setAccImage(result.uri);
                    break;
            }
        }
      };

    const createSet = () => {
        // 저장된 이미지들을 취합합니다.
        // axios.post()
        // .then(res => {
            navigation.navigate('All')
        // })
    }
    
    return (
        <ScrollView>
            <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            navigation.navigate('Camera', {backScreen: 'Form'});
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>카메라</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            pickImage();
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>갤러리에서 가져오기</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>내 옷장에서 가져오기</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>닫기</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>
            </View>
            <View style={{height: Dimensions.get('window').height}}>
            <RowContainer style={styles.RowContainerHeight}>
                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('hat');
                    }}>
                    {hatImage !== null ? 
                        <Image source={{ uri: hatImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.hat }</Text>
                    }
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('top');
                    }}>
                    
                    {topImage !== null ? 
                        <Image source={{ uri: topImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.top }</Text>
                    }
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('outer');
                    }}>
                    {outerImage !== null ? 
                        <Image source={{ uri: outerImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.outer }</Text>
                    }
                </TouchableHighlight>
            </RowContainer>

            <RowContainer style={styles.RowContainerHeight}>
                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('accessory');
                    }}>
                    {AccImage !== null ? 
                        <Image source={{ uri: AccImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.accessory }</Text>
                    }
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('pants');
                    }}>
                    {pantsImage !== null ? 
                        <Image source={{ uri: pantsImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.pants }</Text>
                    }
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('bag');
                    }}>
                    {bagImage !== null ? 
                        <Image source={{ uri: bagImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.bag }</Text>
                    }
                </TouchableHighlight>
            </RowContainer>

            <RowContainer style={styles.RowContainerHeight}>
                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('watch');
                    }}>
                    {watchImage !== null ? 
                        <Image source={{ uri: watchImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.watch }</Text>
                    }
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.uploadBox}
                    onPress={() => {
                    setModalVisible(true);
                    setUploadCategory('shoes');
                    }}>
                    {shoesImage !== null ? 
                        <Image source={{ uri: shoesImage }} style={styles.uploadedItem} /> 
                    : 
                        <Text style={styles.textStyle}>{ CategoryText.shoes }</Text>
                    }
                </TouchableHighlight>
            
                <View style={styles.uploadBox}/>
            </RowContainer>

            <TouchableHighlight
                style={styles.recButton}
                onPress={createSet}
            >
                <Text style={styles.textStyle}>등록</Text>
            </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'stretch',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    uploadedItem: {
        width: '100%',
        height: '100%',
        resizeMode: 'center',
    },
    RowContainerHeight: {
        height: '25%',
    },
    uploadBox: {
        width: '30%',
        height: '100%',
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 0.5,
        borderColor: 'white',
    },
    openButton: {
      height: 40,
      backgroundColor: '#191970',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginBottom: 10,
    },
    recButton: {
        height: 40,
        backgroundColor: '#CD5C5C',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
      },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default CodiFormScreen;