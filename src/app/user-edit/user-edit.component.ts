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
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.id === this.userId);
      if (user) {
        this.userForm = this.fb.group({
          name: [user.name, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          role: [user.role, Validators.required]
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
