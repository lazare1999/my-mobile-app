import {useDispatch, useSelector} from "react-redux"
import {getProductforCart, setProductForCart} from "../localstore/localstore"
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Platform, Alert
} from "react-native"
import Icon from 'react-native-vector-icons/Entypo'
import React, { useState, useEffect } from "react"
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler"
import { I18n } from 'i18n-js';
import { getLang } from '../localstore/localstore';
import { GE, EN } from '../locale/locale'

const Cart = () => {
    const i18n = new I18n()
    const isFocused = useIsFocused();
    const cartProduct = useSelector(getProductforCart)
    const navigation = useNavigation()
    const lang = useSelector(getLang)

    i18n.enableFallback = true
    i18n.locale = lang
    i18n.translations = { GE, EN }
    const dispatch=useDispatch()
    
    useEffect(()=>{
        // console.log(cartProduct)
    },[isFocused])

    return (
        <View style={styles.container}>
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
            <View style={styles.content}>
                <SafeAreaView style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                    <ScrollView>
                        {
                            cartProduct.length > 0 && (
                                cartProduct.map((obj, i) => (

                                    <View key={i} style={styles.cards}>
                                        <View style={{flexDirection:'column'}}>
                                            <Image source={{ uri: obj.thumbnail }} resizeMode='contain' style={styles.image}/>


                                            <Text style={{marginLeft:15}}>{i18n.t('cart.quantity')}: {obj.quantity}</Text>

                                        </View>
                                        <View style={{flexDirection:'column'}}>
                                            <Text>{i18n.t('cart.brand')}:{obj.brand} </Text>
                                            <Text>{i18n.t('cart.title')}:{obj.title}</Text>
                                            <Text style={{marginTop:Dimensions.get('window').height/16}}>{i18n.t('cart.price')}: {obj.price} ₾</Text>

                                        </View>

                                    </View>


                                ))


                            )
                        }

                    </ScrollView>


                </SafeAreaView>
            </View>
            <View style={styles.footer}>

                <TouchableOpacity style={styles.container33} onPress={() => {
                    dispatch(setProductForCart([]))
                }}>
                    <Icon name='shopping-cart' size={Dimensions.get('window').width/10} color={'red'} />
            </TouchableOpacity>

            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').height/10,
      },
      cards: {
        flexDirection:'row',
        justifyContent:'flex-start',
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height/6,
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        }},
    container33: {
        width: Dimensions.get('window').width,
        height: 50,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    content: {
        flex: 1
    },
    footer: {
        // backgroundColor: "blue",
        padding: 40
    }
})

export default Cart