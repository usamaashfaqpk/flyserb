"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amqp = __importStar(require("amqplib"));
const nodemailer = __importStar(require("nodemailer"));
let EmailService = class EmailService {
    cfg;
    conn;
    channel;
    queue = 'email-queue';
    exchange = 'messages';
    transporter;
    constructor(cfg) {
        this.cfg = cfg;
    }
    async onModuleInit() {
        const rabbitUrl = this.cfg.get('RABBITMQ_URL', 'amqp://localhost:5672');
        this.conn = await amqp.connect(rabbitUrl);
        this.channel = await this.conn.createChannel();
        await this.channel.assertExchange(this.exchange, 'direct', {
            durable: true,
        });
        await this.channel.assertQueue(this.queue, { durable: true });
        await this.channel.bindQueue(this.queue, this.exchange, 'email');
        this.transporter = nodemailer.createTransport({
            host: this.cfg.get('SMTP_HOST', 'mailhog'),
            port: +this.cfg.get('SMTP_PORT', 1025),
            secure: false,
            auth: this.cfg.get('SMTP_USER')
                ? {
                    user: this.cfg.get('SMTP_USER'),
                    pass: this.cfg.get('SMTP_PASS'),
                }
                : undefined,
        });
        await this.channel.consume(this.queue, this.handleMessage.bind(this), {
            noAck: false,
        });
        console.log('Email consumer listening on RabbitMQ queue:', this.queue);
    }
    async handleMessage(msg) {
        if (!msg)
            return;
        try {
            const payload = JSON.parse(msg.content.toString());
            console.log('Received message for email:', payload);
            const mailOptions = {
                from: this.cfg.get('SMTP_FROM', 'no-reply@example.com'),
                to: payload.email,
                subject: 'Thanks for contacting us',
                text: `${payload.name},\n\nThanks for your message:\n\n${payload.message}\n\n— Team`,
                html: `<p>Hi <strong>${payload.name}</strong>,</p><p>Thanks for your message:</p><blockquote>${payload.message}</blockquote><p>— Team</p>`,
            };
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ', info);
            this.channel.ack(msg);
        }
        catch (err) {
            console.error('Failed to send email:', err);
            this.channel.nack(msg, false, false);
        }
    }
    async onModuleDestroy() {
        await this.channel?.close();
        await this.conn?.close();
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map