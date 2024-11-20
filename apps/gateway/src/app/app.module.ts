import { Module } from "@nestjs/common";
import { AuthenticationController } from "../controllers/authentication/authentication.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProfileController } from "../controllers/profile/profile.controller";
import { SocialController } from "../controllers/social/social.controller";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTHENTICATION_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'authentication_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },{
                name: 'PROFILE_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'profile_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },{
                name: 'SOCIAL_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'social_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
            {
                name: 'TASKS_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'tasks_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            }
        ])
    ],
    controllers: [
        AuthenticationController,
        ProfileController,
        SocialController,
    ],
    providers: [],
})
export class AppModule {}