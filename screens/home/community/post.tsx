import React, { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-native-elements";
//Custom Components
import CustomButton from "../../../components/button";
//Utils
import { ScrollView, Text, View } from "../../../styles/emotions";
import { COLORS } from "../../../utils/enums";
import { IFPost } from "../../../utils/globalInterfaces";
//Modals
import ModalComment from "./modalComment";
//Service
import * as FirestoreService from "../../../services/firestore";
import { GlobalContext } from "../../../contexts/globalContexts";
import { Linking } from "react-native";

interface IViewPost {
    // post: IFPost
    route: any,
    // allPosts: IFPost[]
}
function ViewPost(props: IViewPost) {
    const post: IFPost = props.route.params.post;
    const allPosts: IFPost[] = props.route.params.allPosts;
    const [modalComment, setModalComment] = useState(false);
    const [currentPost, setCurrentPost] = useState<IFPost>(post);
    const [loading, setLoading] = useState(false);
    const globalContext = useContext(GlobalContext);

    const openComment = () => {
        setModalComment(true);
    }

    const closeComment = () => {
        setModalComment(false);
    }

    const onNewComment = async (content: any) => {
        setLoading(true);
        const _comments = [...currentPost.comments];
        _comments.push(content);
        // setCurrentPost({ ...currentPost, comments: _comments })
        // setModalComment(false);
        //Save data on firebase/
        const id = currentPost.id;
        console.log("_allPosts: ", allPosts)
        const _allPosts = [...allPosts];
        for (let i = 0; i < _allPosts.length; i++) {
            const el = _allPosts[i];
            if (el.id === id) {
                _allPosts[i].comments = [..._comments];
                break;
            }
        }
        try {
            await FirestoreService.updateReports(_allPosts);
            setModalComment(false);
        } catch (error) {
            globalContext.setAlert("Error", error.message, true);
        }
        setLoading(false);
    }

    const goToLocation = () => {
        // Linking.openURL(`https://www.google.com/maps/@${currentPost.region.latitude},${currentPost.region.longitude},16z`)
        // Linking.openURL(`https://www.google.com/maps/place/@19.4538074,-70.6898944,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d19.4538024!4d-70.6877057`)
        Linking.openURL(`https://www.google.com/maps/search/${currentPost.region.latitude},+${currentPost.region.longitude}/@${currentPost.region.latitude},${currentPost.region.longitude},17z`)
    }

    return (
        <View flex={1} >
            <View flex={1}>
                <ScrollView>
                    <Card containerStyle={{ margin: 0 }}>
                        <Card.FeaturedTitle style={{ color: "black" }} >{currentPost.title}</Card.FeaturedTitle>
                        {currentPost.picture !== "" && <Card.Image source={{ uri: currentPost.picture }} />}
                        {currentPost.region.latitude && <Button title="Ver ubicación" type="outline" onPress={goToLocation} />}
                        <Text>{currentPost.description}</Text>
                    </Card>
                    {currentPost.comments.map((comment, key) => {
                        return (
                            <Card containerStyle={{ margin: 0 }} key={key} >
                                <Text>
                                    <Text fontWeight="bold" color={COLORS.SECONDARY} >{comment.name} </Text>
                                    comenta:
                                </Text>
                                <Text>{comment.text}</Text>
                            </Card>
                        )
                    })}
                </ScrollView>
            </View>
            <CustomButton loading={false} noBorder title="Comentar" onPress={openComment} />
            <ModalComment loading={loading} open={modalComment} onClose={closeComment} onNewComment={onNewComment} />
        </View>
    )
}

export default ViewPost;