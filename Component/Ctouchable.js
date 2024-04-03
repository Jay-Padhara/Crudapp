import { View, Text, TouchableOpacity } from 'react-native';

export default function Ctouchable({ style, onPress, text, styles, disabled }) {
    return (
        <View>
            <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
                <Text style={styles}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}