package com.chat.app.chatApp.kafka;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import com.chat.app.chatApp.dto.ChatMessage;


@Component
public class KafkaPublisher {
	
	@Autowired
	private KafkaTemplate<String, Object> template;
	
	@Value("${topic.name}")
	private String topicName;
	
	public void publishEvent(ChatMessage message) {
		CompletableFuture<SendResult<String, Object>> producer=
				this.template.send(this.topicName, message);
		
		producer.whenComplete((result, ex)->{
			if(ex == null) {
				System.out.println(result.getRecordMetadata().offset());
			}else {
				System.out.println(ex.getMessage());
			}
		});
		
	}
}
