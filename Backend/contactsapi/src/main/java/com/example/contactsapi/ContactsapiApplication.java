package com.example.contactsapi;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.contactsapi.contact.Contact;
import com.example.contactsapi.contact.ContactRepository;

@SpringBootApplication
public class ContactsapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactsapiApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(ContactRepository contactRepository) {
		return args -> {
			List<Contact> contacts = Arrays.asList(
					new Contact("Rodrigo", "123456789", LocalDateTime.now()),
					new Contact("Ricardo", "456789123", LocalDateTime.now()),
					new Contact("Roberto", "987654321", LocalDateTime.now()),
					new Contact("Rafael", "234567891", LocalDateTime.now()),
					new Contact("Rafaela", "678912345", LocalDateTime.now()));
			contactRepository.saveAll(contacts);
		};

	}

}
