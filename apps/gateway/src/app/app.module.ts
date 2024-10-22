import { Module } from "@nestjs/common";
import { AuthenticationController } from "../controllers/authentication/authentication.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

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
            },
        ])
    ],
    controllers: [
        AuthenticationController,
    ],
    providers: [],
})
export class AppModule {}