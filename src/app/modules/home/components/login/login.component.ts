import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/';
import { User } from 'src/app/shared/models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {} as User;
  message$ = this.userService.message$;
  returnUrl: string = "";

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParamMap.pipe(
      map((param: ParamMap) => {
        let ret = param.get("returnUrl");
        if (ret == null) {
          this.returnUrl = "";
        } else {
          this.returnUrl = ret;
        }
      })).subscribe();

  }

  login(): void {
    this.userService.login(this.user);
    
    this.message$.subscribe(
      m => {
        this.snackBar.open(m, undefined, { duration: 3000 })
        if (m.includes("ingelogd")) {
          this.router.navigate([this.returnUrl]);
        }
      }
    )
  }

  ngOnInit(): void {
    this.user = {} as User;
  }

}
