import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import CustomButton from "../../../components/button";
import Separator from "../../../components/separator";
import { getNews, getDb } from "../../../services/firestore";
import { ScrollView, Text, View } from "../../../styles/emotions";
import { Collections, COLORS, Documents, Screens } from "../../../utils/enums";

const dummyURL = "https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2017/05/14202139/Yaque-del-Norte-Valverde.jpg";
const obj = {
    title: "Título de la noticia",
    uri: dummyURL,
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, iste architecto corporis necessitatibus officia ea voluptate itaque eum explicabo nesciunt eos minus maiores, rerum, dolorem tenetur. Recusandae unde ratione id!"
}

const items = [obj, obj]

interface INewsItem {
    title: string,
    uri: string,
    body: string,
    onReadMore: () => void,
}

const NewsItem = (props: INewsItem) => {
    return (
        <Card>
            <Card.Title style={{fontSize: 18}} >{props.title}</Card.Title>
            {props.uri !== "" && <Card.Image source={{ uri: props.uri }} />}
            <Separator />
            <Text numberOfLines={3} >{props.body}</Text>
            <CustomButton title="Leer más" onPress={props.onReadMore} />
        </Card>
    )

}


function NewsTab(props: any) {
    const [news, setNews] = useState([]);
    const { parentNavigation } = props.route.params;
    // console.log(props.route.params)

    useEffect(() => {
        // fetchNews();
        observerNews();
    },[])

    const observerNews = async () => {
        getDb().collection(Collections.NEWS).doc(Documents.DATA).onSnapshot(observer => {
            if (observer.data()) {
                //@ts-ignore
                const keysObject = Object.keys(observer.data());
                const auxObjects = { ...observer.data() };
                let _data: any = [];
                for(let i = keysObject.length-1; i >=0; i--) {
                    _data.push(auxObjects[keysObject[i]])
        
                }
                // keysObject.forEach(key => {
                //     //@ts-ignore
                //     _data.push(auxObjects[key])
                // })
                setNews(_data)
            }
        })
    }
    
    const fetchNews = async () => {
        const _news = await getNews();
        setNews(_news);
    }

    const onReadMore = (post) => {
        parentNavigation.navigate(Screens.News, {post});
    }

    return (
        <ScrollView >
            {news.map((post, key) => {
                return <NewsItem {...post} onReadMore={() => onReadMore(post)} key={key} />
            })}
            
        </ScrollView>
    )
}


export default NewsTab;