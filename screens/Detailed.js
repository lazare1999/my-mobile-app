import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import AxiosFunctions from "../axiosFunctions/axiosFunctions"
import { getProductforCart } from "../localstore/localstore"
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Touchable,
  Alert,
  Platform, StatusBar, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import React from "react";
import Animation from "../animations/Animation";
import { useIsFocused } from '@react-navigation/native';
import Swiper from "../animations/Swiper";
import { useDispatch } from "react-redux";
import { setProductForCart } from "../localstore/localstore";
import { I18n } from 'i18n-js';
import { useSelector } from 'react-redux';
import { getLang } from '../localstore/localstore';
import { GE, EN } from '../locale/locale'

const axiosFunctions = new AxiosFunctions()

const Detailed = () => {
  const i18n = new I18n()
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  const route = useRoute()
  const cartProduct = useSelector(getProductforCart)
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState(null)
  const lang = useSelector(getLang)

  i18n.enableFallback = true
  i18n.locale = lang
  i18n.translations = { GE, EN }
  const dispatch=useDispatch()
 
  useEffect(() => {
    setCount(0)
    setProduct(null)
    axiosFunctions.getFilteredProduct(route.params.id).then(response => {
      setProduct(response.data)

    })

  }, [isFocused])
   function addToCart(cartProduct) {
    let temporary=product
     let tempArr = [...cartProduct];
    for(let i =0; i<=count; i++){

      temporary.quantity = i

    }
    tempArr.push(temporary)
       
    dispatch(setProductForCart(tempArr))
 
  }

  const customButtonAlert = () =>
  Alert.alert('ჭარბი რაოდენობა', 'შერჩეული რაოდენობა აჭარბებს მარაგს', [
    {
      text: 'მაქს.რაოდ.',
      onPress: () => setCount(product.stock),
      style: 'cancel',
    },
    {text: 'კარგი'},
  ]);


  return (

    <View style={{display:'flex'}}>
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

      <ScrollView>
        <View>
          {
              product && (
                  <SafeAreaView style={{marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>

                    <Animation>
                      <View style={styles.cards}>
                        <View>
                          <Swiper resizeMode='contain' style={styles.image} />
                        </View>
                        <View style={styles.infoBox}>
                          <Text style={styles.title}>{product.title}</Text>
                          <Text style={styles.title} padding={12}>{i18n.t('detailed.about')}</Text>
                          <Text style={styles.info}>{product.description}</Text>

                        </View>
                      </View>
                      <View style={styles.infoRes}>
                        <View style={styles.grayInfo}>
                          <Text style={styles.infoFonts}>{i18n.t('detailed.price')}: </Text>
                          <Text style={styles.infoFonts}>{product.price} ₾</Text>
                        </View>
                        <View style={styles.whiteInfo}>
                          <Text style={styles.infoFonts}>{i18n.t('detailed.discount')}: </Text>
                          <Text style={styles.infoFonts}>{product.discountPercentage} %</Text>
                        </View>
                        <View style={styles.grayInfo}>
                          <Text style={styles.infoFonts}>{i18n.t('detailed.brand')}: </Text>
                          <Text style={styles.infoFonts}>{product.brand}</Text>
                        </View>
                        <View style={styles.whiteInfo}>
                          <Text style={styles.infoFonts}>{i18n.t('detailed.category')}: </Text>
                          <Text style={styles.infoFonts}>{product.category} </Text>
                        </View>
                        <View style={styles.grayInfo}>
                          <Text style={styles.infoFonts}>{i18n.t('detailed.rating')}: </Text>
                          <Text style={styles.infoFonts}>{product.rating}/5</Text>
                        </View>
                        <View style={styles.whiteInfo}>
                          <Text style={styles.infoFonts}>{i18n.t('detailed.stock')}: </Text>
                          <Text style={styles.infoFonts}>{product.stock}</Text>
                        </View>
                      </View>
                    </Animation>
                  </SafeAreaView>


              )
          }
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBTN} onPress={() => {
            if(count>0){
              setCount(count - 1)
            }
          }
          }><Icon name='circle-with-minus' size={Dimensions.get('window').width/12} color={'red'} /></TouchableOpacity>
          <Text style={styles.amtInput} value={count} onChangeText={setCount}>{count}</Text>
          <TouchableOpacity style={styles.footerBTN} onPress={() => setCount(count + 1)}><Icon name='circle-with-plus' size={Dimensions.get('window').width/12} color={'green'} /></TouchableOpacity>
          <TouchableOpacity style={styles.CardBTN} onPress={() => {
            if(count>0 && count<=product.stock){
              addToCart(cartProduct)
              Alert.alert('წარმატებით დაემატა');
            }else if(count>product.stock){
              customButtonAlert()
            }
          }}>
            <Text style={styles.cartText}>{i18n.t('detailed.toCart')} <Icon name='shopping-cart' size={Dimensions.get('window').width/14} color={'green'} /></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    fontSize: 20,
    fontWeight: 'bold'

  },
  infoBox: {
    padding: 10,
  },
  info: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500
  },
  infoRes:{

  },
  infoFonts: {
    fontSize: Dimensions.get('window').width/20,
    fontWeight: 'bold',
    width: Dimensions.get('window').width / 2,
    height:Dimensions.get('window').height/30
  },
  grayInfo: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    padding: 5,
  },
  whiteInfo: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
  },
  footer: {
    backgroundColor:'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 30,
    paddingTop:Dimensions.get('window').height/25,
    paddingBottom:Dimensions.get('window').height/10,
    marginTop:Dimensions.get('window').height/11,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
    marginBottom: 40,
  },
  footerBTN: {
    width: Dimensions.get('window').width/12,
    height: Dimensions.get('window').width/12,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  amtInput: {
    width: Dimensions.get('window').width/5,
    height: Dimensions.get('window').height/25,
    fontSize:Dimensions.get('window').width/15,
    color: 'black',
    textAlign:'center'
  },
  CardBTN: {
    borderRadius:6,
    backgroundColor:'#1592EE',
    textAlign:'center',
    width: Dimensions.get('window').width/2,
    height:Dimensions.get('window').height/15,
    justifyContent:'center'
  },
  cartText:{
    fontSize:Dimensions.get('window').width/15,
    color:'white',
    textAlign:'center'
  }

});


export default Detailed