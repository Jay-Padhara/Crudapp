import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native'
import Ctouchable from './Ctouchable'

export default function Cmodal() {

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

            <Modal visible={visible} transparent animationType='slide'>
                <View style={{ alignItems: 'center', marginTop: 310 }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey', width: 300, height: 150, borderRadius: 25 }}>

                        <Text style={{ color: 'black', fontSize: 17 }}>Are you sure?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Ctouchable style={styles.touch1} text="Cancel" styles={styles.text} />
                            <Ctouchable style={styles.touch2} text="Yes" styles={styles.text} />
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    touch1: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        margin: 10
    },

    touch2: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        margin: 10
    },

    text: {
        fontSize: 16,
        color: 'white',
    },
});