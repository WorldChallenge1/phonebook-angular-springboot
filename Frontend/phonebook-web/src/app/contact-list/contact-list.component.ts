import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../interfaces/contact.interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  private contactService: ContactService = inject(ContactService)
  contacts: Contact[] = []

  ngOnInit(): void {
    this.loadContacts()
  }

  loadContacts() {
    this.contactService.list()
      .subscribe(contacts => {
        this.contacts = contacts
        console.log(this.contacts)
      })
  }

  delete(id: number) {
    this.contactService.delete(id)
      .subscribe(() => {
        this.loadContacts()
      })
  }
}
