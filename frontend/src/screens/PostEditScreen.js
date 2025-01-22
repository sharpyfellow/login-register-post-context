import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { BASE_URL } from '../config';
import { AuthContext } from './context/AuthContext';

const PostEditScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [loading, setLoading] = useState(false);
  const { authState } = useContext(AuthContext);

  const editPost = () => {
    setLoading(true);
    axios
      .put(
        `${BASE_URL}/post/update-post/${post._id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      )
      .then(res => {
        setLoading(false);
        console.log(res.data);
        Alert.alert('Success', 'Post updated successfully');
        navigation.navigate('Home');
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
        Alert.alert('Error', `Failed to update post: ${e.message}`);
      });
  };

  const deletePost = () => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/post/delete-post/${post._id}`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
      .then(res => {
        setLoading(false);
        console.log(res.data);
        Alert.alert('Success', 'Post deleted successfully');
        navigation.navigate('Home');
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on deleting post ${e.message}`);
        Alert.alert('Error', `Failed to delete post: ${e.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={val => setTitle(val)}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={val => setDescription(val)}
      />
      <Button title="Update Post" onPress={editPost} />
      <Button title="Delete Post" onPress={deletePost} color="red" />
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

export default PostEditScreen;