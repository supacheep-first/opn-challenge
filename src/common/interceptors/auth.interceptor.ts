import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer faketoken_user1') {
      throw new UnauthorizedException('Invalid Authorization header');
    }
    return next.handle();
  }
}
