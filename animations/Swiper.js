import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import AxiosFunctions from '../axiosFunctions/axiosFunctions';
import { useIsFocused, useRoute } from '@react-navigation/native';


const axiosFunctions = new AxiosFunctions();

const { width, height } = Dimensions.get('window');



export default () => {

    const isFocused = useIsFocused()
    const route = useRoute()
    const [product, setProduct] = useState(null)
    const [img, setImg] = useState([])

    async function fetcher() {
        let fetch = await axiosFunctions.getFilteredProduct(route.params.id)
        setProduct(fetch.data)
        const newImage = fetch.data.images;
        const image = index => ({ image: newImage[index % newImage.length] });
        const itemss = Array.from(Array(fetch.data.images.length)).map((_, index) => image(index));
        setImg(itemss)
    }


    useEffect(() => {
        fetcher()


    }, [isFocused])

    return (
        <SwiperFlatList
            autoplay
            autoplayDelay={2}
            index={0}
            autoplayLoop
            // autoplayInvertDirection
            data={img}
            renderItem={({ item }) => <Image resizeMode='contain' style={styles.image} src={item.image} />}
            showPagination
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});