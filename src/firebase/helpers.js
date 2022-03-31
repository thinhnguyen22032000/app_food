import { firestore, storage } from "./config"

export const handleFileName = (file) => {
    return file.substring(file.lastIndexOf('/')+1)
}

export const handleUpload = async (file) => {
    const fileName = handleFileName(file)
    try {
      const fileRef = storage().ref(fileName)
      await fileRef.putFile(file)
      const url = await fileRef.getDownloadURL()
      return url
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

export const handleDeleteFile = async (file) => {
  const ref = storage().refFromURL(file)
  try {
    if(ref) {
      await ref.delete()
    }
  } catch (err) {
    return
  }
  
}

export const getFileUrl = (file) => {
  if(file) {
    const ref = storage().ref(file)
    if(ref){
      ref.getDownloadURL().then((url) => url)
    }
  }else{
    console.log('file not exist')
  }
}

export const addData = async (collection, obj) => {
    await firestore().collection(collection).add(obj)
}

export const getData = async (collection) => {
  await firestore().collection(collection).get()
}

export const deleteData = async (collection, id, file) => {
  if(file) {
    await handleDeleteFile(file)
  }
  await firestore().collection(collection).doc(id).delete()
}

export const getDataWhereUid = async (collection, uid) => {
  await firestore().collection(collection).where('uid', '==', uid).get()
}

export const getDataById = async (collection, id) => {
  await firestore().collection(collection).doc(id).get()
}

// update data
export const updateData = async (collection, id, obj, item) => {
    if(obj.img) {
      await handleDeleteFile(item.img)
    }
    await firestore().collection(collection).doc(id).update(obj)
}