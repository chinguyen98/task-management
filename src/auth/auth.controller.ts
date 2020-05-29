import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RegisterCredentialsDto, LoginCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: RegisterCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
