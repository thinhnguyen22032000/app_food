import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Comments from '../../components/Comments'
import { colors } from '../../styleVariable'

const CommentView = ({route}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
      </View>
      <ScrollView style={{margin: 10}}>
        <Comments route={route} />
      </ScrollView>
    </View>
  );
}

export default CommentView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
      },
      header: {
        height: 50, alignItems: 'center', justifyContent: 'center',marginBottom: 10
      },
      title: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text_color
      }
})