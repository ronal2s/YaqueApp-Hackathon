import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-native-elements";
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

    return (
        <View flex={1} >
            <View flex={1}>
                <ScrollView>
                    <Card containerStyle={{ margin: 0 }}>
                        <Card.FeaturedTitle style={{ color: "black" }} >{currentPost.title}</Card.FeaturedTitle>
                        {currentPost.picture !== "" && <Card.Image source={{ uri: currentPost.picture }} />}
                        <Text>{currentPost.description}</Text>
                    </Card>
                    {currentPost.comments.map((comment, key) => {
                        return (
                            <Card containerStyle={{ margin: 0 }} >
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