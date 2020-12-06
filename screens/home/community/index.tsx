import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button, Card } from "react-native-elements";
import Separator from "../../../components/separator";
import { getDb } from "../../../services/firestore";
//Utils
import { ScrollView, Text, Title, View } from "../../../styles/emotions";
import { Collections, COLORS, Documents, Screens, SIZE } from "../../../utils/enums";
import { IFPost } from "../../../utils/globalInterfaces";

function CommunityTab(props) {
    const [data, setData] = useState([]);
    const [ loading, setLoading ] = useState(true); 
    
    const { parentNavigation } = props.route.params;
    useEffect(() => {
        // fetchNews();
        observerPosts();
    }, [])

    const observerPosts = async () => {
        getDb().collection(Collections.REPORTS).doc(Documents.DATA).onSnapshot(observer => {
            if (observer.data()) {
                console.log("Dentro")
                //@ts-ignore
                const keysObject = Object.keys(observer.data());
                const auxObjects = { ...observer.data() };
                let _data: any = [];
                for (let i = keysObject.length - 1; i >= 0; i--) {
                    _data.push(auxObjects[keysObject[i]])

                }
                // console.log("Datos: ", (_data as IFPost[]).sort((a, b) => a.date - b.date))
                setData((_data as IFPost[]).sort((a, b) => b.date - a.date));
                setLoading(false);
            }
        })
    }

    const onExpandPost = (post: any) => {
        parentNavigation.navigate(Screens.Post, { post, allPosts: data })
    }

    return (
        <ScrollView>
            {/* <Title>Hoy</Title> */}
            <Separator />
            <Title>Reportes de la comunidad</Title>
            {loading && <ActivityIndicator color={COLORS.PRIMARY} size={SIZE.SpinnerInfo} />}
            {data.map((post, key) => {
                return (
                    <Card key={key} >
                        <Card.FeaturedTitle style={{ color: "black" }} >{post.title}</Card.FeaturedTitle>
                        {post.picture !== "" && <Card.Image style={{height: 300}} resizeMode="contain" source={{ uri: post.picture }} />}
                        <Text>{post.user.name} - {post.description}</Text>
                        <Separator />
                        <Text fontWeight="bold" color={COLORS.SECONDARY}>{post.comments.length} Comentarios</Text>
                        <Button title="Ver más" type="outline" onPress={() => onExpandPost(post)} />
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
        user: { name: "Juan Veloz", email: null },
        comments: [
            { id: "183", userId: "402", text: "Es cierto", name: "Jennifer Veloz" },
        ]
    }
]

export default CommunityTab;