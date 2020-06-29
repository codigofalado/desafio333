import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import { join } from 'path';
import 'dotenv/config';

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const OWNER_ID = process.env.OWNER_ID;

declare module 'discord-akairo' {
	interface AkairoClient {
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
	}
}

export default class Client extends AkairoClient {
	public constructor() {
		super({
			ownerID: OWNER_ID
		});
	}

	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, '..', 'commands'),
		prefix: 'b!',
		allowMention: true,
		automateCategories: true,
		blockBots: true,
		blockClient: true,
		defaultCooldown: 3e4,
		commandUtilLifetime: 6e4,
		ignorePermissions: OWNER_ID,
		argumentDefaults: {
			prompt: {
				modifyStart: (_: Message, string: string): string =>
					`${string}\n\nDigite \`cancel\` para cancelar o comando.`,
				modifyRetry: (_: Message, string: string): string =>
					`${string}\n\nDigite \`cancel\` para cancelar o comando.`,
				timeout: 'Você demorou muito, o comando foi cancelado.',
				ended:
					'Você excedeu a quantidade máxima de entradas. O comando foi cancelado.',
				cancel: 'Esse comando foi cancelado',
				retries: 3,
				time: 3e4
			},
			otherwise: ''
		}
	});

	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, '..', 'listeners'),
		automateCategories: true
	});

	private async _init() {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process
		});

		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	public async start() {
		await this._init();
		return this.login(AUTH_TOKEN);
	}
}
