import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Ctextinput from '../Component/Ctextinput';
import Ctouchable from '../Component/Ctouchable';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Form() {
  const navigation = useNavigation();

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const [efname, setEfname] = useState(false);
  // const [elname, setElname] = useState(false);
  // const [eemail, setEemail] = useState(false);
  // const [epass, setEpass] = useState(false);

  const [showpasswd, setShowpasswd] = useState(false);
  const [isexist, setExist] = useState(false);

  useEffect(() => {
    handleUpdate();
  });

  const handleUpdate = async () => {
    if (!fname || !lname || !email || !password || password.length < 2) {
      console.log('Please enter credentials');
    } else {
      try {
        const matchdata = await firebase
          .firestore()
          .collection('users')
          .where('Email', '==', email)
          .get();

        if (matchdata.size > 0) {
          setExist(true);
        } else {
          setExist(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function handleAdd() {
    if (!fname || !lname || !email || !password || password.length < 5) {
      console.log('Please enter credentials.');
    } else {
      try {
        const matchdata = firebase
          .firestore()
          .collection('users')
          .where('Email', '==', email)
          .get();

        if ((await matchdata).size > 0) {
          console.log('Data already exists.');
          setExist(true);

          const docId = (await matchdata).docs[0].id;

          await firebase
            .firestore()
            .collection('users')
            .doc(docId)
            .update({
              Fname: fname,
              Lname: lname,
              Email: email,
              Password: password,
            })
            .then(() => {
              console.log('Data updates successfully.');
              setFname();
              setLname();
              setEmail();
              setPassword();
              setExist(false);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          setFname();
          setLname();
          setEmail();
          setPassword();

          const docRef = await firebase.firestore().collection('users').add({
            Fname: fname,
            Lname: lname,
            Email: email,
            Password: password,
          });
          const docId = docRef.id;
          console.log('Document added with ID: ', docId);
          console.log('Data saved successfully.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleGet() {
    navigation.navigate('Data', {
      onGoBack: data => {
        setFname(data.items._data.Fname);
        setLname(data.items._data.Lname);
        setEmail(data.items._data.Email);
        setPassword(data.items._data.Password);
      },
    });
  }

  const handlereset = () => {
    setFname();
    setLname();
    setEmail();
    setPassword();
    setExist(false);
    console.log('Data reseted.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.text}>CRUD operations</Text>
        </View>

        <Text style={styles.labeltext}>First Name :</Text>

        <Ctextinput
          style={styles.textin}
          placeholder="Enter first name..."
          placeholderTextColor="grey"
          keyboardType="name-phone-pad"
          value={fname}
          onChangeText={text => setFname(text)}
        />

        {!fname ? null : fname?.length < 3 ? (
          <Text style={styles.error}>Invalid first name</Text>
        ) : null}

        <Text style={styles.labeltext}>Last Name :</Text>
        <Ctextinput
          style={styles.textin}
          placeholder="Enter last name..."
          placeholderTextColor="grey"
          keyboardType="name-phone-pad"
          value={lname}
          onChangeText={text => setLname(text)}
        />

        {!lname ? null : lname?.length < 3 ? (
          <Text style={styles.error}>Invalid last name</Text>
        ) : null}

        <Text style={styles.labeltext}>Email : </Text>
        <Ctextinput
          style={styles.textin}
          placeholder="Enter email..."
          placeholderTextColor="grey"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        {!email ? null : email?.length < 15 ? (
          <Text style={styles.error}>Invalid email address</Text>
        ) : null}

        <Text style={styles.labeltext}>Password : </Text>

        <View style={styles.pass}>
          <TextInput
            style={styles.passtext}
            placeholder="Enter your password"
            placeholderTextColor="grey"
            value={password}
            keyboardType="ascii-capable"
            onChangeText={text => setPassword(text)}
            secureTextEntry={showpasswd ? false : true}
          />

          <TouchableOpacity onPress={() => setShowpasswd(!showpasswd)}>
            {showpasswd ? (
              <Icon name="eye" color="white" size={22} />
            ) : (
              <Icon name="eye-off" color="grey" size={22} />
            )}
          </TouchableOpacity>
        </View>

        {!password ? null : password?.length < 5 ? (
          <Text style={styles.error}>Password should be of atleast 5.</Text>
        ) : null}

        {isexist ? (
          !fname ||
          !lname ||
          !email ||
          !password ||
          fname?.length < 3 ||
          lname?.length < 3 ||
          email?.length < 15 ||
          password?.length < 5 ? (
            <Ctouchable
              style={styles.distouch1}
              text="Update data"
              styles={styles.text2}
              disabled={true}
            />
          ) : (
            <Ctouchable
              style={styles.touch1}
              onPress={handleAdd}
              text="Update data"
              styles={styles.text2}
            />
          )
        ) : !fname ||
          !lname ||
          !email ||
          !password ||
          fname?.length < 3 ||
          lname?.length < 3 ||
          email?.length < 15 ||
          password.length < 5 ? (
          <Ctouchable
            style={styles.distouch1}
            text="Add data"
            styles={styles.text2}
            disabled={true}
          />
        ) : (
          <Ctouchable
            style={styles.touch1}
            onPress={handleAdd}
            text="Add data"
            styles={styles.text2}
          />
        )}

        <Ctouchable
          style={styles.touch2}
          onPress={handleGet}
          text="Get data"
          styles={styles.text2}
        />

        <Ctouchable
          style={styles.reset}
          onPress={handlereset}
          text="Reset data"
          styles={styles.text2}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },

  text: {
    margin: 20,
    textAlign: 'center',
    fontSize: 23,
    color: 'lightblue',
  },

  text2: {
    fontSize: 16,
    color: 'white',
  },

  text3: {
    fontSize: 17,
    color: 'white',
    marginRight: 30,
  },

  etext: {
    marginTop: 10,
    fontFamily: 'Recursive_Casual-Black',
    fontSize: 17,
    color: 'red',
    textAlign: 'center',
  },

  textcon: {
    marginTop: 10,
  },

  labeltext: {
    marginTop: 15,
    fontSize: 16,
    color: 'white',
  },

  textin: {
    width: Platform.OS === 'android' ? 290 : 350,
    height: 56,
    padding: 15,
    fontSize: 17,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    marginTop: 7,
    color: 'white',
    flexDirection: 'row',
  },

  disstouch: {
    width: 300,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'grey',
    marginBottom: 20,
  },

  touch1: {
    width: 300,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'green',
    marginBottom: 20,
  },

  distouch1: {
    width: 300,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'grey',
    marginBottom: 20,
  },

  touch2: {
    width: 300,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'green',
    marginBottom: 20,
  },

  error: {
    textAlign: 'right',
    marginTop: 5,
    marginRight: 15,
    fontSize: 15,
    color: 'red',
  },

  deletetext: {
    width: 300,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'green',
    marginBottom: 20,
  },

  pass: {
    width: Platform.OS === 'android' ? 290 : 350,
    height: 56,
    padding: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  passtext: {
    width: 240,
    height: 56,
    fontSize: 17,
    color: 'white',
  },

  reset: {
    width: 150,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'green',
    marginLeft: 70,
    marginRight: 70,
  },

  ex: {
    color: 'grey',
  },

  notetext: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    color: 'grey',
  },

  note: {
    fontSize: 14,
    color: 'grey',
  },
});
