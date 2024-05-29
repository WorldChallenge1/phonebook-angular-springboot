package com.example.contactsapi.contact;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.contactsapi.exceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ContactService {
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    public Contact find(Integer id) {
        return contactRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Contact not found with id: " + id));
    }

    public Contact create(ContactDTO contactDTO) {
        Contact contact = new Contact();
        contact.setName(contactDTO.getName());
        contact.setPhone(contactDTO.getPhone());
        contact.setCreatedAt(LocalDateTime.now());

        return contactRepository.save(contact);
    }

    public Contact update(Integer id, ContactDTO contactDTO) {

        Contact existingContact = this.find(id);
        if (existingContact != null) {
            existingContact.setName(contactDTO.getName());
            existingContact.setPhone(contactDTO.getPhone());
            Contact updatedContact = contactRepository.save(existingContact);
            return updatedContact;
        }

        return null;
    }

    public void delete(Integer id) {
        Contact existingContact = this.find(id);

        contactRepository.delete(existingContact);
    }
}
