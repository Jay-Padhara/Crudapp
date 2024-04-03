import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/Ionicons/';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Ctouchable from '../Component/Ctouchable';

export default function Data({route}) {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [cindex, setIndex] = useState();

  useEffect(() => {
    handleData();
  }, [data]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection('users')
      .onSnapshot(doc => {
        console.log(doc.docs);
      });

    return () => subscriber();
  }, [data]);

  const handleData = async () => {
    const userData = await firebase.firestore().collection('users').get();
    setData(userData.docs);
  };

  const handleDel = async index => {
    setVisible(true);
    setIndex(index);
    console.log(index);
  };

  const handleDelete = async () => {
    setShow(true);
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const doc = snapshot.docs[cindex];
        console.log(doc);

        if (doc) {
          doc.ref
            .delete()
            .then(() => {
              console.log('User deleted successfully!');
              setVisible(false);
              setShow(false);
              unsubscribe();
            })
            .catch(error => {
              console.error('Error deleting user:', error);
            });
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={styles.htext}>
        <Text style={styles.htext}>User Data</Text>
      </View>

      {show ? (
        <ActivityIndicator size={40} color="red" hidesWhenStopped />
      ) : null}

      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <ScrollView style={styles.contain}>
                <Text style={styles.usertext}>
                  First Name : {item._data.Fname}
                </Text>
                <Text style={styles.usertext}>
                  Last Name :{item._data.Lname}
                </Text>
                <Text style={styles.usertext}>Email : {item._data.Email}</Text>
                <Text style={styles.usertext}>
                  Password : {item._data.Password}
                </Text>

                <View style={styles.icon}>
                  <TouchableOpacity>
                    <Icon1
                      name="trash"
                      color="red"
                      size={22}
                      onPress={() => handleDel(index)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon2
                      name="update"
                      color="green"
                      size={23}
                      onPress={() => {
                        navigation.goBack();
                        route.params.onGoBack({items: item});
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.border} />
              </ScrollView>
            );
          }}
        />
      ) : (
        <View style={styles.nodata}>
          <Text style={styles.errortext}>No user data found.</Text>
        </View>
      )}

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalcontain1}>
          <View style={styles.modalcontain2}>
            <Text style={styles.sure}>Are you sure?</Text>

            <View style={styles.butt}>
              <Ctouchable
                style={styles.touch1}
                text="Cancel"
                styles={styles.text}
                onPress={() => setVisible(false)}
              />
              <Ctouchable
                style={styles.touch2}
                text="Yes"
                styles={styles.text}
                onPress={handleDelete}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  htext: {
    fontSize: 25,
    color: 'white',
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },

  errortext: {
    fontSize: 23,
    color: 'white',
  },

  contain: {
    margin: 10,
    padding: 10,
    width: 300,
    borderWidth: 2,
  },

  usertext: {
    margin: 5,
    fontSize: 17,
    color: 'white',
  },

  border: {
    width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  nodata: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  touch1: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    margin: 10,
  },

  touch2: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    margin: 10,
  },

  text: {
    fontSize: 16,
    color: 'white',
  },

  modalcontain1: {
    alignItems: 'center',
    marginTop: 310,
  },

  modalcontain2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    width: 300,
    height: 150,
    borderRadius: 25,
  },

  sure: {
    color: 'black',
    fontSize: 17,
  },

  butt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
