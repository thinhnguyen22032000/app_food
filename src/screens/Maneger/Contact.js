import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '../../share/Logo';
import {colors} from '../../styleVariable';
import { NAME_APP } from '../../adminConfig';
import { firestore } from '../../firebase/config';

const Contact = () => {
  const [contact, setContact] = useState({})
  
  const loadData = () => {
   firestore().collection('contact').doc('contact').get()
   .then((data) => {
     setContact(data._data)
   })
  }
  console.log(contact._data)
  useEffect(() => {
    const subscriber = firestore().collection('contact').onSnapshot((onsap) => {
      loadData()
    })
    return subscriber
  }, [])
  return (
    <View style={{flex: 1, margin: 20}}>
      <View style={{alignItems: 'center'}}>
        <Logo />
        <Text
          style={[styles.spacing,{fontSize: 24, color: colors.text_color, fontWeight: 'bold'}]}>
          Liên hệ với chúng tôi
        </Text>
      </View>
      <View>
          <Text style={styles.spacing}>Mọi thắc mắc trong quá trình sử dụng dịch vụ của chúng tôi vui lòng liên hệ </Text>
          <View style={styles.section}>
              <Text style={[styles.title, styles.spacing]}>Tổng đài chăm sóc khách hàng</Text>
              <View>
                  <Text style={styles.spacing}>Hotline: <Text style={styles.subtitle}>{contact.hotline}</Text></Text>
                  <Text style={styles.spacing}>Email: <Text style={styles.subtitle}>{contact.email}</Text></Text>
                  <Text style={styles.spacing}>Fanpage: <Text style={styles.subtitle}>{contact.fanpage}</Text></Text>
              </View>
          </View>
          <View style={styles.section}>
              <Text style={[styles.title, styles.spacing]}>{`Tổng đài cho đối tác của ${NAME_APP}`}</Text>
              <View>
                  <Text style={styles.spacing}>Hotline: <Text style={styles.subtitle}>{contact.hotline2}</Text></Text>
              </View>
          </View>
          <Text style={styles.spacing}>{`${NAME_APP} hân hạnh được phục vụ quý khách`}</Text>
          <Text style={styles.spacing}>{`Spfood biết quí khách có nhiều lựa chọn, cảm ơn đã lựa chon ${NAME_APP}`}</Text>
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
    title: {
       fontSize: 18,
       color: colors.text_color,
       fontWeight: '700'
    },
    subtitle: {
      color: colors.blue_color
    },
    spacing: {
      marginBottom: 12
    }

});
