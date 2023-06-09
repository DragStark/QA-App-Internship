import React, {useState} from 'react';
import {
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CATEGORIES, COLORS} from '../../../constants';

const AddRoomModal = ({visible, onClose, onSave}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    if (!name || !description || !category) {
      Alert.alert('Error', 'Hãy nhập đầy đủ các ô!');
    } else {
      onSave({name, description, category});
      //clear all fields when saving
      setName('');
      setDescription('');
      setCategory('');
    }
  };

  const handleCategoryChange = selectedCategory => {
    setCategory(selectedCategory);
  };

  const keys = Object.keys(CATEGORIES);
  const renderCategories = () => {
    return keys.map(key => (
      <View style={styles.categoryBtn} key={key}>
        <Button
          title={CATEGORIES[key]}
          color={
            category === CATEGORIES[key] ? COLORS.secondary : COLORS.primary
          }
          onPress={() => handleCategoryChange(CATEGORIES[key])}
        />
      </View>
    ));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Room Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <Text style={styles.title}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Room Description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <Text style={styles.title}>Category</Text>
          <View style={styles.categoriesList}>{renderCategories()}</View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.btnClose} onPress={onClose}>
              <Text style={styles.btnCloseText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    width: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryBtn: {
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btnClose: {
    backgroundColor: COLORS.grayLight,
    padding: 5,
    width: 120,
    alignItems: 'center',
  },
  btnCloseText: {
    color: COLORS.gray,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnSave: {
    backgroundColor: COLORS.primary,
    padding: 5,
    width: 120,
    alignItems: 'center',
  },
  btnSaveText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddRoomModal;
