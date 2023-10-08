import {stateList, countryList} from '../util/constants.js';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';

export function CreateTab() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = () => {
    // Handle the submission of personal details here
    console.log('Personal Details1111:', {
      firstName,
      lastName,
      email,
      addressLine1,
      addressLine2,
      suburb,
      state,
      postalCode,
      country,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Referral Builder</Text>
          <Text style={styles.labelSeperator}>Personal Details</Text>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Text style={styles.labelSeperator}>Address</Text>
          <Text style={styles.label}>Address Line 1:</Text>
          <TextInput
            placeholder="Enter your address line 1"
            value={addressLine1}
            onChangeText={setAddressLine1}
            style={styles.input}
          />
          <Text style={styles.label}>Address Line 2:</Text>
          <TextInput
            placeholder="Enter your address line 2"
            value={addressLine2}
            onChangeText={setAddressLine2}
            style={styles.input}
          />
          <Text style={styles.label}>Suburb:</Text>
          <TextInput
            placeholder="Enter your suburb"
            value={suburb}
            onChangeText={setSuburb}
            style={styles.input}
          />
          <Text style={styles.label}>State:</Text>
          <CustomDropdown
            options={stateList}
            selectedValue={state}
            onValueChange={itemValue => setState(itemValue)}
          />
          <Text style={styles.label}>Postal Code:</Text>
          <TextInput
            placeholder="Enter your postal code"
            value={postalCode}
            onChangeText={setPostalCode}
            style={styles.input}
          />
          <Text style={styles.label}>Country:</Text>

          <CustomDropdown
            options={countryList}
            selectedValue={country}
            onValueChange={itemValue => setCountry(itemValue)}
            style={styles.CustomDropdown}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function CustomDropdown({options, selectedValue, onValueChange}) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionPress = option => {
    onValueChange(option);
    toggleModal();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal}
        style={{backgroundColor: 'lightgray', padding: 10}}>
        <Text>{selectedValue || 'Select an option'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleOptionPress(item)}>
                  <Text style={{fontSize: 16}}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Place title and form side by side
    justifyContent: 'flex-start', // Align title to the left
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20, // Add margin between title and form
  },
  inputContainer: {
    flex: 1, // Take up remaining space
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  labelSeperator: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    color: 'grey', // Change 'blue' to the desired color
  },
  CustomDropdown: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%', // Take up full width
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width: '100%', // Take up full width
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
