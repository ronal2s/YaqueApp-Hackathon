import React, { useState } from "react";
import { Card } from "react-native-elements";
import CustomButton from "../../../components/button";
import CustomInput from "../../../components/input";
import CustomModal from "../../../components/modal";
import { Title } from "../../../styles/emotions";
import { getUIDCode } from "../../../utils/functions";

interface IModalComment {
    open: boolean,
    onClose: () => void,
    onNewComment: (content: any) => void,
}
function ModalComment(props: IModalComment) {
    const [comment, setComment] = useState("");

    const handleComment = (name: string, value: string) => {
        setComment(value);
    }

    const onSaveComment = () => {
        const obj = {
            id: getUIDCode(),
            userId: "test",
            text: comment,
            name: "Renys",
        }

        props.onNewComment(obj);
    }

    return (
        <CustomModal open={props.open} onClose={props.onClose} >
            <Title>Comentar</Title>
            <CustomInput square marginBottom={0.001} label="Comentar" name="comment" value={comment} textArea numberOfLines={3} onChangeText={handleComment} />
            <CustomButton title="Comentar" onPress={onSaveComment} />
        </CustomModal>
    )
}

export default ModalComment;