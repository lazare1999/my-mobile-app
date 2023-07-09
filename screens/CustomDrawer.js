import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { ImageBackground } from "react-native";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import CountryFlag from "react-native-country-flag";
import { useDispatch, useSelector } from 'react-redux';
import { getLang, setLang } from '../localstore/localstore';
import { I18n } from 'i18n-js';
import { GE, EN } from '../locale/locale'
import { useEffect } from "react";


const CustomDrawer = (props) => {
    const dispatch = useDispatch()
    const i18n = new I18n()
    const lang = useSelector(getLang)
    i18n.enableFallback = true
    i18n.locale = lang
    i18n.translations = { GE, EN }
    geLangStyle = function geColor() {
        if (i18n.t('theLageIS')==='ქართული') {
            return {
                backgroundColor: 'crimson'
            }
        } else if(i18n.t('theLageIS')!=='ქართული') {
            return {
                backgroundColor: '#fff'
            }
        }
    }
    enLangStyle = function enColor() {
        if (i18n.t('theLageIS')==='English') {
            return {
                backgroundColor: 'crimson'
            }
        } else if(i18n.t('theLageIS')!=='English') {
            return {
                backgroundColor: '#fff'
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'crimson' }}>
                <ImageBackground source={require('../images/1.jpg')} style={{ padding: 20 , height: 200}}>

                </ImageBackground>
                <View style={{ backgroundColor: 'white', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 40, flexDirection: 'row', margin: 20 }}>


                <TouchableOpacity style={[styles.geStyle,this.geLangStyle()]} onPress={() => {

                    dispatch(setLang('GE'))

                }}>
                    <CountryFlag isoCode="ge" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.enStyle,this.enLangStyle()]} onPress={() => {

                    dispatch(setLang('EN'))

                }}>
                    <CountryFlag isoCode="us" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    geStyle: {
        marginLeft: 10,
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        borderRadius:15
    
    },
    enStyle: {
        marginLeft: 30,
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        borderRadius:15
          
    }
})

export default CustomDrawer