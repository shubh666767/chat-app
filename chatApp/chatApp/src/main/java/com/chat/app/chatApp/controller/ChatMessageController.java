package com.chat.app.chatApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.chatApp.dto.ChatMessage;
import com.chat.app.chatApp.kafka.KafkaPublisher;

@RestController
@RequestMapping("/")
public class ChatMessageController {
	
	@Autowired
	private KafkaPublisher publisher;
	
	@PostMapping("/chat/message")
	public void getMessage(@RequestBody ChatMessage chatMessage) {
		this.publisher.publishEvent(chatMessage);
	}

	@MessageMapping("/chat")
	@SendTo("/topic/group")
	public ChatMessage broadcastGroupMessage(@Payload ChatMessage message) {
		// Sending this message to all the subscribers
		return message;
	}
}
