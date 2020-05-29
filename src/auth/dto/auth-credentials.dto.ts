import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterCredentialsDto {
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak!' })
    password: string;
}

export class LoginCredentialsDto{
    @IsString()
    username:string;

    @IsString()
    password:string;
}