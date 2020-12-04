import React from "react";
import { Card } from "react-native-elements";
import CustomButton from "../../../components/button";
import Separator from "../../../components/separator";
import { ScrollView, Text, View } from "../../../styles/emotions";
import { COLORS, Screens } from "../../../utils/enums";

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
            <Card.Image source={{ uri: props.uri }} />
            <Separator />
            <Text numberOfLines={3} >{props.body}</Text>
            <CustomButton title="Leer más" onPress={props.onReadMore} />
        </Card>
    )

}


function NewsTab(props: any) {
    const { parentNavigation } = props.route.params;
    // console.log(props.route.params)

    const onReadMore = (post) => {
        parentNavigation.navigate(Screens.News, {post});
    }

    return (
        <ScrollView >
            {items.map((post, key) => {
                return <NewsItem {...post} onReadMore={() => onReadMore(post)} key={key} />
            })}
            
        </ScrollView>
    )
}


export default NewsTab;