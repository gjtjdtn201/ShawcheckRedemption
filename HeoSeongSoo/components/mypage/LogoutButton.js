import React from 'react';
import { Ionicons } from '@expo/vector-icons';  
import { TouchableHighlight } from 'react-native';

function MainChangeButton(props) {
    return (
        <TouchableHighlight
        style={{ marginTop: 15, marginBottom: 20, marginRight: 5}}
        underlayColor="none"
        onPress={props.onPress} >
            <Ionicons name="ios-arrow-dropleft" size={48} color="black" />
        </TouchableHighlight>

    )
}

export default MainChangeButton;