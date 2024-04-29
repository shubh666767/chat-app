package com.chat.app.chatApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.chatApp.dto.ChatMessage;
import com.chat.app.chatApp.kafka.KafkaPublisher;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/")
@CrossOrigin
public class ChatMessageController {
	
	@Autowired
	private KafkaPublisher publisher;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@PostMapping("/chat/message")
	public void getMessage(@RequestBody ChatMessage chatMessage) {
		this.publisher.publishEvent(chatMessage);
	}

	@MessageMapping("/chat")
	@SendTo("/topic/group")
	public ChatMessage broadcastGroupMessage(@Payload String message) throws JsonMappingException, JsonProcessingException {
		// Sending this message to all the subscribers
		ChatMessage chatMessage = objectMapper.readValue(message, ChatMessage.class);
        
        // Now you have a Java object of type MyObject
        System.out.println(chatMessage);
		return chatMessage;
	}
}
