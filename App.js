import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contats from 'expo-contacts';
import { useEffect, useState } from 'react';


export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const {status} = await Contats.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contats.getContactsAsync(
        { fields: [Contats.Fields.PhoneNumbers] }
      );
      if (data.length > 0 ) {
        setContacts(data)
        
      }
    }
  }


  return (

    <View style={styles.container}>
      <View style={styles.list}>
      <FlatList 
        data={contacts}
        renderItem= {({item}) => 
          <Text>{item.name} - {item.phoneNumbers[0].number}  </Text>
          
      }
        
       />
       </View>
      
      <Button style={styles.button}
      title='Get Contacts'
      onPress={getContacts}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    marginBottom: 30
  },
 
  list: {
    flex: 2,
    marginTop: 10
  }
});
