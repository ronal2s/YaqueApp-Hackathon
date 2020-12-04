import React from "react";
import { Card } from "react-native-elements";
//Utils
import { ScrollView, Text, View } from "../../../styles/emotions";
import { IFNews } from "../../../utils/globalInterfaces";

interface IViewNews {
    new: IFNews,
    route?: any
}
function ViewNews(props: IViewNews) {
    const post: IFNews = props.route.params.post;

    return (
        <View flex={1} >
            <View flex={1}>
                <ScrollView>
                    <Card containerStyle={{ margin: 0 }}>
                        <Card.FeaturedTitle style={{ color: "black" }} >{post.title}</Card.FeaturedTitle>
                        <Card.Image source={{ uri: post.uri }} />
                        <Text>{post.body}</Text>
                    </Card>
                </ScrollView>
            </View>
        </View>
    )
}

export default ViewNews;