import React, { useCallback } from 'react'
import { Button, Alert, Linking, View, StyleSheet } from 'react-native';

const Menu = () => {
    /* const token = props.route.params.token */
    const urlManual = 'https://drive.google.com/file/d/17EEN26C9qHg4-nWG-rk9aIhObmTtGrES/view?usp=sharing'

    const AbrirURLManual = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`No existe la URL: ${url}`);
            }
        }, [url]);

        return <Button title={children} onPress={handlePress} />;
    };

    return (
        <View style={styles.container}>
            <AbrirURLManual url={urlManual}>Abrir Manual del Usuario</AbrirURLManual>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E4EC',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Menu