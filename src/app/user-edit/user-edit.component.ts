import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit(): void {
  // Initialise le formulaire avec des valeurs vides ou par défaut
  this.userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    password: [''] 
  });

  this.userId = +this.route.snapshot.paramMap.get('id')!;

  this.userService.getUsers().subscribe(users => {
    const user = users.find(u => u.id === this.userId);
    if (user) {
      // Patch les valeurs récupérées dans le formulaire existant
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
  });
}


  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          alert('Utilisateur mis à jour avec succès !');
          this.router.navigate(['/users']);
        },
        error: err => {
          console.error('Erreur lors de la mise à jour', err);
        }
      });
    }
  }
}
