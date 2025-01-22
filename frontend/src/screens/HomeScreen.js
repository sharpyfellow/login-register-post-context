import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { BASE_URL } from '../config';
import { AuthContext } from './context/AuthContext';

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { authState, logout } = useContext(AuthContext);

  useEffect(() => {
    console.log('authState in HomeScreen:', authState);
    getPosts();
  }, [route.params?.post]);

  const getPosts = () => {
    axios
      .get(`${BASE_URL}/post/get-user-post`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
      .then(res => {
        console.log(res.data);
        if (Array.isArray(res.data.userPosts)) {
          setPosts(res.data.userPosts);
        } else {
          console.error("Expected an array but got:", res.data);
        }
      })
      .catch(e => {
        console.log(`Error on getting posts ${e.message}`);
      });
  };

  const renderItem = ({ item }) => {
    const formattedDate = moment(item.createdAt).format("DD:MM:YYYY");
    console.log('Rendering item:', item);
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          navigation.navigate('Post Edit', { post: item });
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.author}>Posted by: {item.postedBy.name}</Text>
        <Text style={styles.date}>Date: {formattedDate}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        ListEmptyComponent={<Text>No posts available</Text>}
      />
      <Button title="Logout" onPress={logout} />
      <Button title="Add Post" onPress={() => navigation.navigate('Post Create')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontWeight: '600',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  date: {
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default HomeScreen;