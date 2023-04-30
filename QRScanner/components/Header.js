import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Philter: A Product Validator</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'red',
    },
    title: {
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',

    }
});