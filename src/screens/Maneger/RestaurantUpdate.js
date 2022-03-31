import {StyleSheet, View, Alert, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../../components/Loading';
import {updateData, handleUpload} from '../../firebase/helpers';
import InputCustom from '../../components/Input';
import {colors, margin} from '../../styleVariable';
import TagItem from '../../components/modal/tag/TagItem';
import TagSelector from '../../components/modal/tag/TagSelector';
import TimerSelect from '../../components/TimerSelect';
import ButtonCustom from '../../components/Button'
import CategoriesSelector from '../../components/CategoriesSelector';
import OverlayCustom from '../../components/Overlay';

export default function RestaurantUpdate({route, navigation}) {

  const {item} = route.params;
  const [name, setName] = useState(item.name);
  const [lang, setLang] = useState(item.lang);
  const [lat, setLat] = useState(item.lat);
  const [img, setImg] = useState(null);
  const [imgShow, setImgShow] = useState(item.img);
  const [loading, setLoading] = useState(false);
  const [timeOpen, setTimeOpen] = useState(item?.activeTime?.open || null);
  const [timeClose, setTimeClose] = useState(item?.activeTime?.close || null);
  const [category, setCategory] = useState(item?.category || null)
  const [err, setErr] = useState(null)
  const [isHandle, setIsHandle] = useState(false)

  const [tagSelector, setTagSelector] = useState(item.tags || []);

  const handlePopTag = item => {
    const filterData = tagSelector.filter(tag => tag.id != item.id);
    setTagSelector(filterData);
  };

  const handleUpdate = async item => {
    if(name !== '' && lang !== '' && lat !== ''){
      setLoading(true);
    let data;
    if (img) {
      data = {
        name: name,
        lang: lang,
        lat: lat,
        tags: tagSelector,
        activeTime: {open: timeOpen, close: timeClose},
        img: await handleUpload(img.uri),
        category: category
      };
      console.log('co img');
    } else {
      data = {
        name: name,
        lang: lang,
        lat: lat,
        activeTime: {open: timeOpen, close: timeClose},
        tags: tagSelector,
        category: category
      };
    }
    updateData('restaurants', item.id, data, item)
      .then(() => {
        setLoading(false);
        setIsHandle(true)
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        Alert.alert('Vui long dien du thong tin');
      });

    }else{
      setErr('Vui long điền đủ thông tin.')
    }
    
    
  };

  useEffect(() => {
    setTimeout(() => {
      if(isHandle) return navigation.navigate('Restaurants')
    }, 1000)
  }, [isHandle])

  const handleChangeImg = () => {
    launchImageLibrary()
    .then(data => {
      setImg({uri: data.assets[0].uri});
      console.log('img: ', data.assets[0].uri);
    })
    .catch(err => console.log('err: ', err));
  }

  return (
    <ScrollView style={styles.container}>
      <OverlayCustom loading={loading}/>
      <InputCustom
        placeholder="Tên cửa hàng"
        value={name}
        onChangeText={setName}
        leftIcon={<IconAntDesign name="home" size={20} />}
        errorMessage={err}
      />
      <InputCustom
        placeholder="lang"
        value={lang}
        onChangeText={setLang}
        leftIcon={<IconAntDesign name="enviromento" size={20} />}
        errorMessage={err}
      />
      <InputCustom
        placeholder="lat"
        value={lat}
        onChangeText={setLat}
        leftIcon={<IconAntDesign name="enviromento" size={20} />}
        errorMessage={err}
      />
      {/* selec time */}
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={{fontSize: 16, color: colors.text_color, marginBottom: 10}}>
          Thời gian hoạt động (Giờ)
        </Text>
        <View style={styles.section}>
          <TimerSelect timeOpen={timeOpen} setTimeOpen={setTimeOpen} defaulText={'Mở cửa'} />
          <TimerSelect timeClose={timeClose} setTimeClose={setTimeClose} defaulText={'Đóng cửa'} />
        </View>
      </View>
     {/* select */}
      <View style={[styles.section, {marginBottom: 20}]}>
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
      <View style={[styles.section, {marginBottom: 20}]}>
        <CategoriesSelector category={category} setCategory={setCategory}/>
      </View>
      <View style={styles.imgWrap}>
        {img !== null ? (
          <View style={styles.imgContainer}>
            <TouchableOpacity onPress={handleChangeImg}>
            <Image style={styles.img} source={img} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imgContainer}>
            <TouchableOpacity onPress={handleChangeImg}>
            <Image style={styles.img} source={{uri: imgShow}} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{marginTop: 10, marginBottom: 40}}>
      <ButtonCustom
        title={'Cập nhật'}
        bgColor={'#3241ed'}
        onPress={() => handleUpdate(item)}
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
  imgWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 80,
    backgroundColor: 'gray',
  },
  section: {
    
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: 10,
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
  imgContainer: {
    flex: 1,
    backgroundColor: colors.input_color,
    padding: 10,
    borderColor: colors.text_color,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dotted',
    alignSelf: 'center',
  },
});
