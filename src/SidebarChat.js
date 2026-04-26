import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import db from "./firebase"; // Database theke last message anar jonno

function SidebarChat({ id, name, addNewChat }) {
    const [messages, setMessages] = useState("");

    // Last message-ta sidebar-e dekhanor jonno
    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [id]);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            // Firestore-e notun room save koro
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="sidebarChat">
                <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    {/* Ekhane last message-ta show korbe */}
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat;