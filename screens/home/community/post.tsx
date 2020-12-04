import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements";
//Custom Components
import CustomButton from "../../../components/button";
//Utils
import { ScrollView, Text, View } from "../../../styles/emotions";
import { COLORS } from "../../../utils/enums";
import { IFPost } from "../../../utils/globalInterfaces";
//Modals
import ModalComment from "./modalComment";

interface IViewPost {
    post: IFPost
}
function ViewPost(props) {
    const post: IFPost = props.route.params.post;
    const [modalComment, setModalComment] = useState(false);
    const [currentPost, setCurrentPost] = useState<IFPost>(post);

    const openComment = () => {
        setModalComment(true);
    }

    const closeComment = () => {
        setModalComment(false);
    }

    const onNewComment = (content: any) => {
        const _comments = [...currentPost.comments];
        _comments.push(content);
        setCurrentPost({...currentPost, comments: _comments})
        setModalComment(false);
        //Save data on firebase
    }

    return (
        <View flex={1} >
            <View flex={1}>
                <ScrollView>
                    <Card containerStyle={{ margin: 0 }}>
                        <Card.FeaturedTitle style={{ color: "black" }} >{currentPost.title}</Card.FeaturedTitle>
                        <Card.Image source={{ uri: currentPost.picture }} />
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
            <CustomButton noBorder title="Comentar" onPress={openComment} />
            <ModalComment open={modalComment} onClose={closeComment} onNewComment={onNewComment} />
        </View>
    )
}

export default ViewPost;