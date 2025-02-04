import firestore from '@react-native-firebase/firestore';



export async function createCategory({name,description,userId}){
    try{
        const categoryCreate = await firestore().collection('Categories').add({name,description,userId})
        return categoryCreate

    }catch(e){
        console.log("Error in creating category",e)
    }
}