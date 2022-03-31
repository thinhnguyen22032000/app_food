import { updateData } from "./helpers"


export const updateRestaurant = async (collection, id, input) => {
    const {name, lat, lang, img} = input
   if(name != '' && lang != '' && lat != '') {
       if(!img){
         await updateData(collection, id, input)
       }else{
        //    img is url
        // await handleDeleteFile(img)
        // const fileName = handleFileName(img)
        // await updateData(collection, id, input)
       }
   }else{
       return new Promise((res, rej) => rej)
   }
}