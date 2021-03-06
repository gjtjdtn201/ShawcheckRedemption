import React from 'react';
import { Text, TouchableHighlight, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function MypageButton(props) {
    return (
        <TouchableHighlight
        value={props.value}
        underlayColor= 'none'
        style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center', width: 35, height: 35, margin: '2%'}}
        onPress={props.onPress} 
        >   
            {/* value가 closet일 경우 */}
            {props.value === 'closet' ? (
                <>  
                    <Image
                        style={{width: '95%', height: '95%', resizeMode: 'center'}}
                        source={require('../../assets/items/closet.png')}
                    />
                </>
                ) :
                (
                <>  
                    <Image
                        style={{width: '95%', height: '95%', resizeMode: 'center'}}
                        source={require('../../assets/items/coordiPlus.png')}
                    />
                </>
                )
                }
            
        </TouchableHighlight>

    )
}

export default MypageButton;