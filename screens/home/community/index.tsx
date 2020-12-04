import React, { useState } from "react";
import { Button, Card } from "react-native-elements";
import Separator from "../../../components/separator";
//Utils
import { ScrollView, Text, Title, View } from "../../../styles/emotions";
import { COLORS, Screens } from "../../../utils/enums";

function CommunityTab(props) {
    const { parentNavigation } = props.route.params;


    const onExpandPost = (post: any) => {
        parentNavigation.navigate(Screens.Post, { post })
    }

    return (
        <ScrollView>
            {/* <Title>Hoy</Title> */}
            <Title>Otros reportes</Title>
            {posts.map((post, key) => {
                return (
                    <Card key={key} >
                        <Card.FeaturedTitle style={{color: "black"}} >{post.title}</Card.FeaturedTitle>
                        <Card.Image source={{ uri: post.picture }} />
                        <Text>{post.user.name} - {post.description}</Text>
                        <Separator />
                        <Text fontWeight="bold" color={COLORS.SECONDARY}>{post.comments.length} Comentarios</Text>
                        <Button title="Ver más" type="outline" onPress={() => onExpandPost(post)} />
                        {/* <Separator/> */}
                    </Card>
                )
            })}
            {/* <Title>Antiguos</Title> */}
        </ScrollView>
    )
}

const posts = [
    {
        id: "123",
        title: "Basura en la calle 4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reprehenderit laudantium omnis tempore cupiditate deleniti voluptatum a eveniet ipsum qui? Sit repudiandae voluptate harum ea corrupti aliquid omnis blanditiis quisquam?",
        picture: "https://www.diariodigital.com.do/wp-content/uploads/2016/09/Rio-Yaque-del-Norte.jpg",
        priority: "Alta",
        latitude: "",
        longitude: "",
        solved: false,
        date: new Date().toLocaleDateString("en-US"),
        verified: false,
        user: {name: "Juan Veloz", email: null},
        comments: [
            { id: "183", userId: "402", text: "Es cierto", name: "Jennifer Veloz" },
        ]
    }
]

export default CommunityTab;