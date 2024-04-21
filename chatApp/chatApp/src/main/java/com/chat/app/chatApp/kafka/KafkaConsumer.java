package com.chat.app.chatApp.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import com.chat.app.chatApp.dto.ChatMessage;


@Component
public class KafkaConsumer {
	Logger logger = LoggerFactory.getLogger(KafkaConsumer.class);
	
	@Autowired
    private SimpMessagingTemplate template;
	
	@Value("topic-name")
	private String topicName;
	
	@KafkaListener(topics="chat-app-topic", groupId="chat-app")
	public void consume(ChatMessage message) {
		logger.info("message received");
		template.convertAndSend("/topic/group",message);
	}
}
