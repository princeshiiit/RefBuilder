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
import {handleSubmit} from '../ViewModel/TabCreate_ViewModel.js';

export function CreateTab() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [validationErrors, setValidationErrors] = useState({}); // State variable to hold validation errors

  const handleFormSubmit = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }
    if (!lastName) {
      errors.mobile = 'Mobile number is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      mobile,
      addressLine1,
      addressLine2,
      suburb,
      state,
      postalCode,
      country,
    };

    const clearedFormData = handleSubmit(formData);

    setFirstName(clearedFormData.firstName);
    setLastName(clearedFormData.lastName);
    setEmail(clearedFormData.email);
    setMobile(clearedFormData.mobile);
    setAddressLine1(clearedFormData.addressLine1);
    setAddressLine2(clearedFormData.addressLine2);
    setSuburb(clearedFormData.suburb);
    setState(clearedFormData.state);
    setPostalCode(clearedFormData.postalCode);
    setCountry(clearedFormData.country);
    setValidationErrors({});
  };

  const isValidEmail = email => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
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
          {validationErrors.firstName && (
            <Text style={styles.errorText}>{validationErrors.firstName}</Text>
          )}
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          {validationErrors.lastName && (
            <Text style={styles.errorText}>{validationErrors.lastName}</Text>
          )}
          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          {validationErrors.email && (
            <Text style={styles.errorText}>{validationErrors.email}</Text>
          )}
          <Text style={styles.label}>Mobile</Text>
          <TextInput
            placeholder="Mobile No."
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
          {validationErrors.mobile && (
            <Text style={styles.errorText}>{validationErrors.mobile}</Text>
          )}
          <Text style={styles.labelSeperator}>Address</Text>
          <Text style={styles.label}>Address Line 1:</Text>
          <TextInput
            placeholder="Enter your address line 1"
            value={addressLine1}
            onChangeText={setAddressLine1}
            style={styles.input}
          />
          {validationErrors.addressLine1 && (
            <Text style={styles.errorText}>
              {validationErrors.addressLine1}
            </Text>
          )}
          <Text style={styles.label}>Address Line 2:</Text>
          <TextInput
            placeholder="Enter your address line 2"
            value={addressLine2}
            onChangeText={setAddressLine2}
            style={styles.input}
          />
          {validationErrors.addressLine2 && (
            <Text style={styles.errorText}>
              {validationErrors.addressLine2}
            </Text>
          )}
          <Text style={styles.label}>Suburb:</Text>
          <TextInput
            placeholder="Enter your suburb"
            value={suburb}
            onChangeText={setSuburb}
            style={styles.input}
          />
          {validationErrors.suburb && (
            <Text style={styles.errorText}>{validationErrors.suburb}</Text>
          )}
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
          {validationErrors.postalCode && (
            <Text style={styles.errorText}>{validationErrors.postalCode}</Text>
          )}
          <Text style={styles.label}>Country:</Text>

          <CustomDropdown
            options={countryList}
            selectedValue={country}
            onValueChange={itemValue => setCountry(itemValue)}
            style={styles.CustomDropdown}
          />
          {validationErrors.country && (
            <Text style={styles.errorText}>{validationErrors.country}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>Create Referral</Text>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20,
  },
  inputContainer: {
    flex: 1,
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
    color: 'grey',
  },
  CustomDropdown: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
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
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});
