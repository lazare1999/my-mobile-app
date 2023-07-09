import { I18n } from 'i18n-js';
import { getLang } from './localstore/localstore';
import { GE, EN } from './locale/locale'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Detailed from './screens/Detailed';
import { useSelector } from 'react-redux';
import CustomDrawer from './screens/CustomDrawer';
import Icon from 'react-native-vector-icons/Entypo'

const Nav = () => {




  const Drawer = createDrawerNavigator()

  const lang = useSelector(getLang)

  const i18n = new I18n()



  i18n.enableFallback = true
  i18n.locale = lang
  i18n.translations = { GE, EN }

  return (


    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawer{...props} />}   
      screenOptions={{headerShown:false,drawerLabelStyle:{marginLeft:-20},drawerActiveBackgroundColor:'crimson',drawerActiveTintColor:'white'}}>

        <Drawer.Screen
          options={
            {
              headerShown: false,
              drawerIcon: () => (
                <Icon name='home' size={22} />
              )
            }

          }
          name={i18n.t('menu.home')}
          component={Home}

        />

        <Drawer.Screen
          options={
            {
              headerShown: false,
              drawerItemStyle: {
                display: "none",
              }
            }
          }
          name='Detailed'
          component={Detailed}

        />

        <Drawer.Screen

          options={
            {
              headerShown: false,
              drawerIcon: () => (
                <Icon name='shopping-cart' size={22} />
              )
            }

          }

          name={i18n.t('menu.cart')}
          component={Cart}

        />

      </Drawer.Navigator>

    </NavigationContainer>

  )


}

export default Nav
