import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../interfaces/contact.interface';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  private formBuilder: FormBuilder = inject(FormBuilder)
  private contactService: ContactService = inject(ContactService)
  private router: Router = inject(Router)
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  public formText: string = "New Contact"
  private isEdit: boolean = false
  private id?: number


  public contactForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    phone: ["", [Validators.required, Validators.pattern('[- +()0-9]+')]]
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']

    if (id) {
      this.id = id
      this.contactService.get(id)
      .subscribe(contact => {
        this.contactForm.patchValue(contact)
      })

      this.formText = "Edit Contact"
      this.isEdit = true
    }
  }


  save() {

    if (this.contactForm.invalid) {
      return
    }

    if(this.isEdit) {
      const contact: Contact = {
        id: this.id!,
        name: this.contactForm.get('name')?.value || '',
        phone: this.contactForm.get('phone')?.value || ''
      }
      this.contactService.update(this.id!, contact)
      .subscribe(() => {
        this.router.navigate(['/'])
      })
    } else {
      const contact: Contact = {
        name: this.contactForm.get('name')?.value || '',
        phone: this.contactForm.get('phone')?.value || ''
      }
      this.contactService.create(contact)
      .subscribe(() => {
        this.router.navigate(['/'])
      })
    }
  }

}
