import {
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Button} from 'react-native-elements';
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
import Tag from '../../components/Tag';
import TagItem from '../../components/modal/tag/TagItem';
import ButtonCustom from '../../components/Button';
import CategoriesSelector from '../../components/CategoriesSelector';

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

  console.log(userInfo.email);

  const handleAddData = async () => {
    if(name !== '' && lang !== '' && lat !== '' && img != undefined ){
      setLoading(true);
      firestore()
        .collection('storePending')
        .add({
          name: name,
          lang: lang,
          lat: lat,
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
          category: category
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
        navigation.goBack()
        Alert.alert('Thông báo', 'Thêm thành công!. Đang trong danh sách chờ');
      }
    }, 1000)
  }, [isHandle])

  console.log(category)
  
  const handlePopTag = item => {
    const filterData = tagSelector.filter(tag => tag.id != item.id);
    setTagSelector(filterData);
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.container}>
      <InputCustom
        placeholder="Tên cửa hàng"
        value={name}
        onChangeText={setName}
        leftIcon={<IconAntDesign name="home" size={20} />}
        errorMessage={err}
      />

      <InputCustom
        placeholder="Longitude"
        value={lang}
        onChangeText={setLang}
        leftIcon={<IconAntDesign name="enviromento" size={20} />}
        errorMessage={err}
      />
      <InputCustom
        placeholder="Latitude"
        value={lat}
        onChangeText={setLat}
        leftIcon={<IconAntDesign name="enviromento" size={20} />}
        errorMessage={err}
      />
      <View>
        <Text style={{fontSize: 16, color: colors.text_color}}>
          Thời gian hoạt động (Giờ)
        </Text>
        <View style={styles.section}>
          <TimerSelect setTimeOpen={setTimeOpen} defaulText={'Mở cửa'} />
          <TimerSelect setTimeClose={setTimeClose} defaulText={'Đóng cửa'} />
        </View>
      </View>
      <View style={[styles.section, margin.mt20]}>
        <View style={styles.tagsContainer}>
          {tagSelector.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handlePopTag(item)}>
              <TagItem active item={item} />
            </TouchableOpacity>
          ))}
        </View>
        <TagSelector
          tagSelector={tagSelector}
          setTagSelector={setTagSelector}
        />
      </View>
      <View style={[styles.section, margin.mt20]}>
        <CategoriesSelector setCategory={setCategory}/>
      </View>
      <CurrentImagePicker setImg={setImg} img={img} error={err} />
      <View style={{marginTop: 10, marginBottom: 40}}>
      <ButtonCustom
        title={'Thêm mới'}
        bgColor={colors.blue_color}
        onPress={handleAddData}
      />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
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
