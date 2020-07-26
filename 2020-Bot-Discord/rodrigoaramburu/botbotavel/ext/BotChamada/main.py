import typing
from discord import TextChannel, DMChannel, Member
from botbotavel.BotBase import BotBase

class BotChamada(BotBase):

    botname: str = 'BotChamada' 

    async def receive_message(self, message_content: str, channel: typing.Union[TextChannel,DMChannel], member: Member) -> None:
        if message_content.startswith( "!botchamada" ):
            await channel.send("Presente! :man_raising_hand: Sou um Bot")

        if message_content.startswith( "!botapresentar" ):
            out = f"Oi eu sou o {self.botname}!\n"
            out += f"Eu Sou um Bot!\n"
            out += f"Gosto de ficar aqui, escutando o que as pessoas ficam falando.\n"
            out += f"De vez em quando interajo com algumas ...\n"
            out += f"e como os amigos cylons, eu tenho um plano ..."
            await channel.send( out )
