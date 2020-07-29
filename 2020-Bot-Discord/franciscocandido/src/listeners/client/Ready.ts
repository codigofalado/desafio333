import { Listener } from 'discord-akairo';

export default class Ready extends Listener {
	public constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	}

	public exec() {
		let activities: any = [
			{
				text: 'b!comandos para ver meus comandos',
				type: 'WATCHING'
			},
			{
				text: '🎧 BMO (Adventure Time) - Friends Song',
				type: 'LISTENING'
			},
			{
				text: 'Fui criado pelo FurFles#6267',
				type: 'WATCHING'
			}
		];

		setInterval(() => {
			let randomStatus = Math.floor(Math.random() * activities.length);

			let activitie = activities[randomStatus];
			this.client.user.setActivity(activitie.text, { type: activitie.type });
		}, 2e4);
	}
}
