import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {ListItem, Avatar, Divider} from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {center, colors, row, textInput} from '../styleVariable';
import {firestore} from '../firebase/config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UserContext } from '../contexts/userContext';
import Loading from './Loading';
import { Overlay } from 'react-native-elements';

const Comments = ({route}) => {
  const {userInfo} = useContext(UserContext)
  const {item} = route.params;
  const [comments, setComments] = useState([]);
  const [txtComment, setTxtComment] = useState('');
  const [write, setWrite] = useState(false);
  const [countComments, setCountComments] = useState(item?.comments?.length || 0)
  const [loading, setLoading] = useState(true)
  const [loadingSubmitCM, setLoadingSubmitCM] = useState(false)

  const loadData = () => {
    firestore()
      .collection('restaurants')
      .doc(item.id)
      .get()
      .then(data => {
        setComments(data._data.comments);
        setLoading(false)
      });
  };
  console.log(comments);
  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitComment = () => {
    setLoadingSubmitCM(true)
    let arr
    if(comments){
      arr = [...comments]
    }else{
      arr = []
    }
    arr.push({text: txtComment, uid: userInfo.uid});
    setComments([...arr]);
    firestore()
      .collection('restaurants')
      .doc(item.id)
      .update({
        comments: [...arr],
      })
      .then(() => {
        loadData()
        setTxtComment("")
        setCountComments(comments.length+1)
        setLoadingSubmitCM(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingSubmitCM(false)
      });
  };

  if(loading) return (<Loading/>)
  return (
    <KeyboardAwareScrollView>
       <Overlay isVisible={loadingSubmitCM}>
        <Text>Đang xử lý...</Text>
       </Overlay>
      {write ? (
        <View style={[row, styles.containerItem]}>
          <TouchableOpacity onPress={() => setWrite(false)}>
            <AntDesign style={styles.btnComment} name="arrowleft" size={30} />
          </TouchableOpacity>
          <TextInput
            style={textInput}
            value={txtComment}
            onChangeText={setTxtComment}
            placeholder={'Viet danh gia'}
          />
          <TouchableOpacity onPress={handleSubmitComment}>
            <EvilIcons style={styles.btnComment} name="arrow-up" size={40} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[row, styles.containerItem]}>
          <TouchableOpacity onPress={() => setWrite(true)}>
            <AntDesign style={styles.btnComment} name="edit" size={30} />
          </TouchableOpacity>
          <Text>Viet danh gia</Text>
        </View>
      )}
       <Divider
          orientation="horizontal"
          subHeaderStyle={{color: 'blue'}}
        />
      <View style={styles.containerItem}>   
        <ScrollView>
          <Text style={{color: colors.text_color, fontSize: 16, paddingTop: 10, paddingBottom: 10}}>
            Danh sach danh gia {`(${countComments})`}
          </Text>
          {comments &&
            comments.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={require('../assets/avatar.jpg')} />
                <ListItem.Content>
                  <ListItem.Title></ListItem.Title>
                  <ListItem.Subtitle>{l.text}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  containerItem: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  btnComment: {
    color: colors.prymary_color,
    marginRight: 4,
  },
});
