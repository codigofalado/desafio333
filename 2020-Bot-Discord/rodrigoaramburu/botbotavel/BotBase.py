import typing
from discord import TextChannel, DMChannel, Member


class BotBase:

    botname: str = '' 
    botuser = None
    active_channels: typing.List[str] = []
    loop_active_channels: typing.List[str] = []
    loop_time: int = 60

    mongodb = None

    async def init(self) -> None:
        pass

    async def receive_message(self, message_content: str, channel: typing.Union[TextChannel,DMChannel], member: Member) -> None:
        pass

    async def loop(self, channel: typing.Union[TextChannel,DMChannel] ):
        pass


    def is_active(self, channel_id: str ) -> bool:
        return channel_id in self.active_channels

    def is_loop_active(self, channel_id: str ) -> bool:
        return channel_id in self.loop_active_channels

    