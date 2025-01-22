import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from './context/AuthContext';

const PostCreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { authState } = useContext(AuthContext);

  const createPost = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/post/create-post`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      )
      .then(res => {
        setLoading(false);
        console.log(res.data);
        Alert.alert('Success', 'Post created successfully');
        navigation.navigate('Home');
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on creating post: ${e.message}`);
        console.log(e.response.data); // Log the full error response
        Alert.alert('Error', `Failed to create post: ${e.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={val => {
          setTitle(val);
        }}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={val => {
          setDescription(val);
        }}
      />
      <Button title="Create Post" onPress={createPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default PostCreateScreen;