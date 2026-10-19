'use client'
import React, { useState } from 'react'
import './messages.css'

const conversations = [
    {
        id: 1,
        name: 'Noah Carter',
        initials: 'NC',
        color: 'primary',
        preview: 'Looks great, just one tweak...',
        online: true
    },
    {
        id: 2,
        name: 'Atlas Robotics',
        initials: 'AR',
        color: 'purple',
        preview: 'Requested a revision',
        online: false
    }
]

const messages = [
    {
        id: 1,
        type: 'sent',
        text: "Hi Noah — first draft is up! Let me know if slide 6's terminology works for your brand voice."
    },
    {
        id: 2,
        type: 'received',
        text: 'Looks great, just one tweak on slide 3 — can you soften "obligatorio" to "requerido"?'
    },
    {
        id: 3,
        type: 'sent',
        text: 'Done ✓ — re-uploaded as draft_ES_v2.pptx'
    }
]

const Page = () => {

    const [activeConversation, setActiveConversation] = useState(1)
    const [message, setMessage] = useState('')
    const [chatMessages, setChatMessages] = useState(messages)

    const activeUser = conversations.find(
        (item) => item.id === activeConversation
    )

    const handleSend = () => {

        const trimmedMessage = message.trim()

        if (!trimmedMessage) return

        setChatMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                type: 'sent',
                text: trimmedMessage
            }
        ])

        setMessage('')
    }

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {
            handleSend()
        }

    }

    return (
        <div className="messagesPage">

            <h4 className="fw-bold mb-4">
                Messages
            </h4>
            <div className="card border rounded-4 shadow-sm overflow-hidden messagesCard">
                <div className="row g-0 h-100"> 
                    <div className="messagesSidebar">
                        {conversations.map((conversation) => (
                            <button
                                key={conversation.id}
                                type="button"
                                onClick={() =>
                                    setActiveConversation(conversation.id)
                                }
                                className={`w-100 border-0 text-start messagesUser ${
                                    activeConversation === conversation.id
                                        ? 'active'
                                        : ''
                                }`}
                            >

                                <div className="d-flex align-items-center gap-2">
                                    <div
                                        className={`messagesAvatar bg-${conversation.color}`}
                                    >
                                        {conversation.initials}
                                    </div>
                                    <div className="messagesUserInfo">
                                        <div className="fw-semibold text-dark text-truncate">
                                            {conversation.name}
                                        </div>

                                        <div className="small text-secondary text-truncate">
                                            {conversation.preview}
                                        </div>
                                    </div>

                                </div>

                            </button>

                        ))}

                    </div> 

                    <div className="messagesChat"> 
                        <div className="messagesChatHeader border-bottom">
                            <div className="d-flex align-items-center gap-2">
                                <div className="messagesAvatar bg-primary">
                                    {activeUser.initials}
                                </div>
                                <div className="messagesHeaderInfo">
                                    <div className="fw-semibold text-dark">
                                        {activeUser.name}
                                    </div>
                                    {activeUser.online && (
                                        <div className="small text-success">
                                            <span className="messagesOnlineDot"></span>
                                            Online
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="messagesBody">
                            {chatMessages.map((item) => (
                                <div
                                    key={item.id}
                                    className={`d-flex mb-3 ${
                                        item.type === 'sent'
                                            ? 'justify-content-end'
                                            : 'justify-content-start'
                                    }`}
                                >

                                    <div
                                        className={
                                            item.type === 'sent'
                                                ? 'messagesBubble messagesSent'
                                                : 'messagesBubble messagesReceived'
                                        }
                                    >
                                        {item.text}
                                    </div>

                                </div>

                            ))}

                        </div>
                        <div className="messagesInputArea border-top">
                            <div className="d-flex gap-2 messagesInputWrapper">
                                <input
                                    type="text"
                                    className="form-control messagesInput"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                />

                                <button
                                    type="button"
                                    className="btn btn-primary fw-semibold messagesSendBtn"
                                    onClick={handleSend}
                                >
                                    Send
                                </button>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Page







 