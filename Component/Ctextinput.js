import { View, TextInput } from 'react-native'

export default function Ctextinput({ placeholder, placeholderTextColor, value, style, keyboardType, onChangeText, maxlength }) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                style={style}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                maxLength={maxlength}
            />
        </View>
    )
}