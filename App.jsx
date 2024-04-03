import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Form from './Screens/Form';
import Data from './Screens/Data';
import Cmodal from './Component/Cmodal';

export default function App() {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="Form" component={Form} />
        <stack.Screen name="Data" component={Data} />
        <stack.Screen name="Cmodal" component={Cmodal} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
