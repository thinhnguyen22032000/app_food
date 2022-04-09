import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {NAME_APP} from '../../adminConfig'
import Logo from '../../share/Logo'
import { colors } from '../../styleVariable'
import InputCustom from '../../components/Input'
import ButtonCustom from '../../components/Button'
import {updateData} from '../../firebase/helpers'
import { firestore } from '../../firebase/config'
import Loading from '../../components/Loading'


const AdminContact = () => {
  const [contact, setContact] = useState(null)
  const [loading, setLoading]=  useState(true)

  const [hotline, setHotline] = useState('')
  const [email, setEmail] = useState('')
  const [fanpage, setFanpage] = useState('')
  const [hotline2, setHotline2] = useState('')

  const loadData = () => {
    firestore().collection('contact').doc('contact').get()
    .then((data) => {
        const obj = data._data
        setHotline(obj.hotline)
        setEmail(obj.email)
        setFanpage(obj.fanpage)
        setHotline2(obj.hotline2)
        setLoading(false)
    })
    .catch(err => console.log(err))
   }

  useEffect(() => {
     loadData()
  }, [])

 
  console.log(contact)
  const handleSubmit = () => {
    updateData('contact', 'contact', {
      hotline: hotline,
      email  : email,
      fanpage: fanpage,
      hotline2: hotline2
    })
    .then(() => alert('Thành công'))
    .catch((err) => console.log(err))
  }
  
  if(loading) return <Loading/>

  return (
    <ScrollView style={{flex: 1, margin: 20}}>
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
                <View style={[styles.spacing, styles.inputGroup]}>
                  <Text style={styles.subtitle}>Hotline:</Text>
                  <InputCustom height={30} width={'80%'} placeholder={'Liên hệ'} value={hotline} onChangeText={setHotline}/>
                </View>
                <View style={[styles.spacing, styles.inputGroup]}>
                  <Text style={styles.subtitle}>Email:</Text>
                  <InputCustom height={30} width={'80%'} placeholder={'Email'} value={email} onChangeText={setEmail}/>
                </View>
                <View style={[styles.spacing, styles.inputGroup]}>
                  <Text style={styles.subtitle}>Fanpage:</Text>
                  <InputCustom height={30} width={'80%'} placeholder={'Fanpage'} value={fanpage} onChangeText={setFanpage}/>
                </View>
                
            </View>
        </View>
        <View style={styles.section}>
            <Text style={[styles.title, styles.spacing]}>{`Tổng đài cho đối tác của ${NAME_APP}`}</Text>
            <View style={[styles.spacing, styles.inputGroup]}>
                  <Text style={styles.subtitle}>Hotline:</Text>
                  <InputCustom height={30} width={'80%'} placeholder={'Liên hệ'} value={hotline2} onChangeText={setHotline2}/>
                </View>
        </View>
        <Text style={styles.spacing}>{`${NAME_APP} hân hạnh được phục vụ quý khách`}</Text>
        <Text style={styles.spacing}>{`Spfood biết quí khách có nhiều lựa chọn, cảm ơn đã lựa chon ${NAME_APP}`}</Text>
    </View>
    <ButtonCustom title={'Cập nhật'} onPress={handleSubmit}/>
  </ScrollView>
  )
}

export default AdminContact

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.text_color,
    fontWeight: '700',
 },
 subtitle: {
   marginBottom: 10,
 },
 spacing: {
   marginBottom: 12
 },
 inputGroup: {
   flexDirection: 'row',
   alignItems: 'center',
 }
})