import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Image } from "react-native";
import { captureScreen } from 'react-native-view-shot';

export default function HomeScreen() {


    const [imageURI, setImageURI] = useState(
        'https://storage-profili-poslovi.infostud.com/8451/20210819/70d983305aef70ac6286a0daeaaa26c2956015e8a2f0cba986bd90291f5d9feahq',
    );
    const [savedImagePath, setSavedImagePath] = useState('');

    const takeScreenShot = () => {
        // To capture Screenshot
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        }).then(
            //callback function to get the result URL of the screnshot
            (uri) => {
                setSavedImagePath(uri);
                setImageURI(uri);
            },
            (error) => console.error('Oops, Something Went Wrong', error),
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Click on Button Below to Take ScreenShot
                </Text>
                <Image
                    source={{ uri: imageURI }}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={takeScreenShot}>
                    <Text style={styles.buttonTextStyle}>
                        Take Screenshot
                    </Text>
                </TouchableOpacity>
                <Text style={styles.textStyle}>
                    {
                        savedImagePath ?
                            `Saved Image Path\n ${savedImagePath}` : ''
                    }
                </Text>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        textAlign: 'center',
        padding: 10,
    },
    buttonStyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: '#657ec7',
        padding: 5,
        minWidth: 250,
    },
    buttonTextStyle: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
    },
    image: {
        width: 200,
        minHeight: 300,
        resizeMode: 'contain',
        marginTop: 25,
    }
});

