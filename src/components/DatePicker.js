import { Button, Text, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import React , { useState } from 'react'
import { colors } from '../styleVariable'

const DateTimePicker = ({date, setDate}) => {
  const [open, setOpen] = useState(false)
 console.log(typeof date)
  return (
    <>
      <Text style={{padding: 4, color: colors.text_color}}>Lưu ý: ngày khuyến mãi phải tính từ hôm nay</Text>
      <Button title="Chọn ngày khuyến mãi" onPress={() => setOpen(true)} />
      <Text>{`${date}`}</Text>
      <DatePicker
        minimumDate={new Date()}
        mode="datetime"
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default DateTimePicker