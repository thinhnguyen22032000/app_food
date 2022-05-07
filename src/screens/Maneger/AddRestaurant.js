import {
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Divider} from 'react-native-elements';
import {firestore} from '../../firebase/config';
import {handleUpload} from '../../firebase/helpers';
import {UserContext} from '../../contexts/userContext';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../../components/Loading';
import InputCustom from '../../components/Input';
import {colors, margin} from '../../styleVariable';
import TimerSelect from '../../components/TimerSelect';
import CurrentImagePicker from '../../components/CurrentImagePicker';
import TagSelector from '../../components/modal/tag/TagSelector';
import ButtonCustom from '../../components/Button';
import CategoriesSelector from '../../components/CategoriesSelector';

import {getCurrentDate} from '../../helpers'

export default function AddRestaurant({navigation}) {
  const {userInfo} = useContext(UserContext);
  const [name, setName] = useState('');
  const [lang, setLang] = useState('');
  const [lat, setLat] = useState('');
  const [img, setImg] = useState();
  const [timeOpen, setTimeOpen] = useState(null);
  const [timeClose, setTimeClose] = useState(null);
  const [category, setCategory] = useState(null)

  const [loading, setLoading] = useState(false);
  const [tagSelector, setTagSelector] = useState([]);
  const [err, setErr] = useState(null)
  const [isHandle, setIsHandle] = useState(false)

  const handleAddData = async () => {
    if(name !== '' && lang !== '' && lat !== '' && img != undefined ){
      setLoading(true);
      firestore()
        .collection('storePending')
        .add({
          name: name,
          lang: lang.trim(),
          lat: lat.trim(),
          img: await handleUpload(img.uri),
          activeTime: {
            open: timeOpen,
            close: timeClose,
          },
          user: {
            id: userInfo.uid,
            email: userInfo.email,
          },
          tags: tagSelector,
          category: category,
          date_release: getCurrentDate()
        })
        .then(() => {
          setLoading(false);
          setIsHandle(true)
        })
        .catch(error => {
          console.log(error);
        });
    }else{
      setErr('Vui long điền đủ thông tin.')
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if(isHandle){
        navigation.navigate('Maneger')
        Alert.alert('Thông báo', 'Thêm thành công!. Đang trong danh sách chờ');
      }
    }, 1000)
  }, [isHandle])

  console.log(category)
  


  const handleFocusInput = () => {
     setIsFocus(!isFocus)
  }

  if (loading) return <Loading />;

  const fields = [
    {required: true, errorMessage: err ,value:name, placeholder: 'Tên cửa hàng', onChangeText: setName, leftIcon: () => (<IconAntDesign name="home" size={20} />)},
    {keyboardType:'numeric', required: true, errorMessage: err ,value:lang, placeholder: 'Kinh độ', onChangeText: setLang, leftIcon: () => (<IconAntDesign name="enviromento" size={20} />)},
    {keyboardType:'numeric', required: true, errorMessage: err ,value:lat, placeholder: 'Vĩ độ', onChangeText: setLat, leftIcon: () => (<IconAntDesign name="enviromento" size={20} />)},
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 10}}>
        <Text style={{color: colors.text_color, fontSize: 20}}>Chú ý:</Text>
        <Text style={{color: colors.text_color}}>Sau khi đăng kí cửa hàng vui lòng đợi hoặc liên hệ quản trị viên để được phê duyệt</Text>
        <Text style={{color: colors.text_color}}>{`(*) thông tin không thể trống`}</Text>
      </View>
      <Divider style={{marginBottom: 20}}/>
     {
       fields.map((item, index) => (
        <InputCustom
        key={index}
        required = {item.required}
        placeholder = {item.placeholder} 
        value={item.value}
        onChangeText={item.onChangeText}
        leftIcon={item.leftIcon}
        errorMessage={item.errorMessage}
        keyboardType={item.keyboardType || null}
        label={item.placeholder}
      />
       ))
     }
      <View>
        <Text style={{fontSize: 16, color: colors.text_color}}>
          Thời gian hoạt động (Giờ)
        </Text>
        <View style={styles.section}>
          <TimerSelect setTimeOpen={setTimeOpen} defaulText={'Mở cửa'} />
          <TimerSelect setTimeClose={setTimeClose} defaulText={'Đóng cửa'} />
        </View>
      </View>
      <View style={[margin.mt20]}>
        {/* <View style={styles.tagsContainer}>
          {tagSelector.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handlePopTag(item)}>
              <TagItem active item={item} />
            </TouchableOpacity>
          ))}
        </View> */}
        <TagSelector
          tagSelector={tagSelector}
          setTagSelector={setTagSelector}
        />
      </View>
      <View style={[styles.section, margin.mt20]}>
        <CategoriesSelector setCategory={setCategory}/>
      </View>
      <CurrentImagePicker setImg={setImg} img={img} error={err} required />
      <View style={{marginTop: 10, marginBottom: 40}}>
      <View style={{flex: 1, alignItems: 'center'}}>
      <ButtonCustom
        title={'Thêm mới'}
        bgColor={colors.blue_color}
        onPress={handleAddData}
        width={'94%'}
      />
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white_color
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
  tagsContainer: {
    flex: 1,
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
