import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { LoginCredentialsDto, RegisterCredentialsDto } from './dto/auth-credentials.dto';
import { IJwtPayLoad } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: RegisterCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Username or password invalid!');
        }
        const jwtPayload: IJwtPayLoad = { username };
        const accessToken = this.jwtService.sign(jwtPayload);
        return { accessToken };
    }
}
