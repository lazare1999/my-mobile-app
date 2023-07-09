
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AxiosFunctions from '../axiosFunctions/axiosFunctions';
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import {GE, EN} from '../locale/locale'
import { useDispatch, useSelector } from 'react-redux';
import { getLang, setLang } from '../localstore/localstore';
import {I18n} from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const axiosFunctions = new AxiosFunctions()
const Home = () => {


  const dispatch=useDispatch()

  const [data, setData] = useState(null)
  const navigation = useNavigation()


  const lang=useSelector(getLang)  
  
  const i18n= new I18n()
  
  
  
    i18n.enableFallback=true
    i18n.locale=lang
    i18n.translations={GE,EN}





  useEffect(() => {



    axiosFunctions.getProducts().then(response => {

      setData(response.data)

      AsyncStorage.setItem('productInfo',JSON.stringify(response.data)) 

    })





  }, [])


  useEffect(()=>{

        (async()=>{

            let info=await AsyncStorage.getItem('productInfo')

            let parsedInfo=JSON.parse(info)


              let temporaryInfo=parsedInfo.products.findIndex((obj)=>{

                    return obj.id==1

              })

 
              parsedInfo.products.splice(temporaryInfo,1)

             await AsyncStorage.setItem('productInfo',JSON.stringify(parsedInfo.products))
              

        })()




  },[])




  useEffect(()=>{

      (async()=>{

        await AsyncStorage.removeItem('productInfo')


      })()



  },[])

  return (
    <View>
        
      <View style={{
        width: Dimensions.get('window').width,
        height: 90,
        backgroundColor: 'crimson',
        justifyContent: 'flex-end',
       

      }}>

        <View style={{
          flexDirection:'row'
        }}>
        <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => {

          navigation.openDrawer()


        }}>
          <Icon name='menu' size={50}/>
        </TouchableOpacity>

        </View>
      </View>

      <SafeAreaView style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>

          {/*<Text>{i18n.t('theLageIS')}</Text>*/}

        <View>

          {

            data && (
              <ScrollView  >
                {

                  data.products.map((obj, i) => (
                    <TouchableOpacity key={i} onPress={() => {

                      navigation.navigate('Detailed', { id: obj.id })

                    }}>
                      <View style={styles.cards}  >
                        <View>
                          <Image source={{ uri: obj.thumbnail }} resizeMode='contain' style={styles.image} />
                        </View>
                        <View style={styles.infoBox}>
                          <Text style={styles.title}>{obj.title}</Text>
                          <Text>{obj.description}</Text>
                          <Text>ფასი: {obj.price} ₾</Text>
                          <Text>ბრენდი: {obj.brand}</Text>
                          <Text>რეიტინგი: {obj.rating}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))

                }

              </ScrollView>
            )
          }

        </View>
      </SafeAreaView>
    </View>


  )

}

const styles = StyleSheet.create({
  cards: {
    width: Dimensions.get('window').width,
    marginTop: 10,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    marginLeft: 'auto',
    marginRight: 'auto'

  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },
  infoBox: {
    padding: 10

  }
});


export default Home