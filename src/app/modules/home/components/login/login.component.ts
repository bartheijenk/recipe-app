import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';

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
    private router: Router
  ) {
    this.route.queryParamMap.pipe(
      map((param: ParamMap) => {
        let ret = param.get("returnUrl");
        if(ret == null) {
          this.returnUrl = "";
        } else {
          this.returnUrl = ret;
        }
      })).subscribe();

  }

  login(): void {
    this.userService.login(this.user);
    this.user = {} as User;
    this.message$.subscribe(
      m => {
        if (m.includes("ingelogd")) {
          this.router.navigate([this.returnUrl])
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
