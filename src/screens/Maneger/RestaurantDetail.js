import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {center, colors, margin, padding, row} from '../../styleVariable';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../contexts/userContext';
import {firestore} from '../../firebase/config';
import Tag from '../../components/Tag';
import {distanceCalc, timeCalc} from '../../firebase/calc';
import Loading from '../../components/Loading';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import MenuItem from '../../components/MenuItem';
import DividerCustom from '../../components/DividerCustom';
import { msToHMS } from '../../helpers';
import {updateData} from '../../firebase/helpers'

const RestaurantDetail = ({route, navigation}) => {
  const {item, isPromotion} = route.params;
  const [liked, setLiked] = useState(false);
  let [likeCount, setLikeCount] = useState(item.like?.count || 0);
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const titleView = useRef(null);
  const isLikeRef = useRef(liked);
  const likeTimeRef = useRef(null);
  const [timeExpire, setTimeExpire] = useState(null)

  useEffect(() => {
    if(item?.promotion?.date_expire){
      const timerId = setInterval(() => {
        let currentDate = Date.parse(new Date());
        let expireDate = item.promotion.date_expire.toMillis();
        let result = expireDate - currentDate;
        let m = new Date(result);
        console.log('kq: ',result)
        setTimeExpire(msToHMS(m));
        if(result <= 0){
          // clearInterval(intervalRef.current)
          clearInterval(timerId)
          setTimeExpire('Hết khuyến mãi')
          updateData('restaurants',item.id, {promotion: {promotion: '0', date_expire: null}})
          console.log('update khuyen mai')
        }
      }, 1000);
      return () => clearInterval(timerId)
    }
   }, []);


  useEffect(() => {
    if (item?.like?.uids) {
      const found = item.like.uids.find(item => item == userInfo.uid);
      if (found) {
        setLiked(true);
      }
    }
  }, []);

  useEffect(() => setLoading(false), []);

  function handleCount(item, newUids, isLikeRef, increase = null) {
    likeCount = increase ? ++likeCount : --likeCount;
    firestore()
      .collection('restaurants')
      .doc(item.id)
      .update({
        like: {count: likeCount, uids: newUids},
      })
      .then(() => {
        setLiked(isLikeRef);
        setLikeCount(prev => {
          return (prev = increase ? prev + 1 : prev - 1);
        });
      });
  }

  const handleUpdateLikeCount = () => {
    let arr;
    if (item?.like?.uids) {
      arr = item.like.uids;
    } else {
      arr = [];
    }
    if (liked === false) {
      if (likeTimeRef.current) {
        clearTimeout(likeTimeRef.current);
      }
      setLiked(true);
      isLikeRef.current = true;
      likeTimeRef.current = setTimeout(() => {
        const newArr = arr.filter(item => item != userInfo.uid);
        console.log('arr',arr)
        newArr.push(userInfo.uid);
        let increase = true;
        handleCount(item, newArr, increase, isLikeRef.current);
      }, 1500);
      // firestore()
      //   .collection('restaurants')
      //   .doc(item.id)
      //   .update({
      //     like: {count: ++likeCount, uids: [...arr]},
      //   })
      //   .then(() => {
      //     setLiked(true);
      //     setLikeCount(prev => prev + 1);
      //   });
      // console.log('mang: ', arr);
    } else {
      if (likeTimeRef.current) {
        clearTimeout(likeTimeRef.current);
      }
      setLiked(false);
      isLikeRef.current = false;
      likeTimeRef.current = setTimeout(() => {
        const newUids = arr.filter(item => item != userInfo.uid);
        handleCount(item, newUids, isLikeRef.current);
      }, 1500);
      // firestore()
      //   .collection('restaurants')
      //   .doc(item.id)
      //   .update({
      //     like: {count: --likeCount, uids: newUids},
      //   })
      //   .then(() => {
      //     setLiked(false);
      //     setLikeCount(prev => prev - 1);
      //   });
    }
  };
  const distance = distanceCalc(item.distance, 1);
  const duration = timeCalc(item.duration, 1);

  if (loading) return <Loading />;

  const MAX_HEIGHT = 280;
  const MIN_HEIGHT = 55;

  return (
    <ImageHeaderScrollView
      maxHeight={MAX_HEIGHT}
      minHeight={MIN_HEIGHT}
      maxOverlayOpacity={0.8}
      minOverlayOpacity={0.3}
      renderHeader={() => (
        <Image
          style={[styles.img, styles.mb]}
          source={{uri: item.img}}
          resizeMode={'cover'}
        />
      )}
      // renderForeground={() => (
      //   <View style={[center, {flex: 1}]}>
      //     <Text style={{color: '#fff'}}>hihi</Text>
      //   </View>
      // )}
      renderFixedForeground={() => (
        <Animatable.View style={[styles.titleView]} ref={titleView}>
          <Text style={{color: '#fff'}}>i have confirmed</Text>
        </Animatable.View>
        //  <Text ref={titleView} style={{color: '#fff', height: 55, opacity: 0,}}>kakaka</Text>
      )}>
      <TriggeringView
        style={styles.container}
        onHide={() => titleView.current.fadeInUp(200)}
        onDisplay={() => titleView.current.fadeOut(100)}>
        <View style={[styles.detailContainer]}>
          <View style={[styles.detailItem, {justifyContent: 'space-between'}]}>
            <Text style={[styles.title, styles.mb]}>{item.name}</Text>
            <Text style={styles.price}>
              {' '}
              <AntDesign name="checkcircle" size={16} /> Đối tác của spFood
            </Text>
          </View>
          <View style={[styles.detailItem, {justifyContent: 'space-between'}]}>
            <Text style={{}}>Thời gian khuyến mãi: {timeExpire || '----'}</Text>
          </View>
          <View style={[styles.detailItem, row, margin.mr20]}>
            {/* <Tag navigation={navigation} item={{id:'lEDDAdvasI9dDv66k6mD',tag: 'trasua'}}/> */}
            <View style={{flexDirection: 'row'}}>
              {item.tags
                ? item.tags.map(item => (
                    <Tag key={item.id} navigation={navigation} item={item} /> // item = {id: 'blala, 'tag: 'trasua'}
                  ))
                : null}
            </View>
          </View>
          <View style={styles.detailItem}>
            <View style={[row, {marginRight: 10}]}>
              <Entypo name="location" size={20} color={colors.text_color} />
              <Text style={[margin.ml4, styles.textItem]}>{distance} km</Text>
            </View>
            <View style={row}>
              <FontAwesome
                name="motorcycle"
                size={18}
                color={colors.text_color}
              />
              <Text style={[margin.ml4, styles.textItem]}>{duration}h</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <View style={[row, {marginRight: 10}]}>
              <Text style={[margin.ml4, styles.textItem]}>
                Mở cửa: {item?.activeTime?.open || '7:00'} h
              </Text>
            </View>
            <View style={row}>
              <Text style={[margin.ml4, styles.textItem]}>
                Miễn phí giao hàng trong 2km
              </Text>
            </View>
          </View>
          <View style={[styles.detailItem, {marginBottom: 20}]}>
            <View style={[row, {marginRight: 10}]}>
              <TouchableOpacity onPress={handleUpdateLikeCount}>
                {liked ? (
                  <AntDesign
                    name="heart"
                    size={20}
                    color={colors.prymary_color}
                  />
                ) : (
                  <AntDesign name="hearto" size={20} />
                )}
              </TouchableOpacity>
              <Text style={[margin.ml4, styles.textItem]}>
                {likeCount} lượt thích
              </Text>
            </View>
            <View style={row}>
              <Text
                onPress={() => navigation.navigate('Comment', {item: item})}
                style={{
                  marginRight: 20,
                  color: colors.prymary_color,
                  fontWeight: '700',
                }}>
                Xem đánh giá {`(${item?.comments?.length || 0}+)`}
              </Text>
            </View>
          </View>
          <DividerCustom />
          <View style={{marginLeft: 20}}>
            {item.menu &&
              item.menu.map((menuItem, index) => (
                <MenuItem
                  idStore={item.id}
                  navigation={navigation}
                  key={index}
                  item={menuItem}
                  percent={item?.promotion?.promotion || null}
                />
              ))}
          </View>
          {/* <Comments route={route} /> */}
        </View>
      </TriggeringView>
    </ImageHeaderScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: 'center',
  },
  detailContainer: {
    flex: 1,
    // backgroundColor: colors.light_color,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
  },
  price: {
    backgroundColor: colors.prymary_color,
    color: colors.white_color,
    padding: 8,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  title: {
    fontSize: 20,
    color: colors.text_color,
  },
  titleView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  img: {
    width: '100%',
    height: 280,
  },
  mb: {
    marginBottom: 10,
  },
  textItem: {
    color: colors.text_color,
  },
});

export default RestaurantDetail;
