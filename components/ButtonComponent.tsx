import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ButtonComponent ({title, onPress, icon, color, size} : any) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <MaterialIcons
                name = {icon}
                size = {20} 
                color = {color ? color : "#657ec7"}/>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        height:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
    },
    text:{
        fontWeight:'bold',
        fontSize:16,
        color:'#657ec7',
        marginLeft:10
    }
})