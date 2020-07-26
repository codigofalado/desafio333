import typing
from discord import TextChannel, DMChannel, Member
from decouple import config
import traceback
import random
import sys
from apiclient.discovery import build
from datetime import datetime , timedelta
from tabulate import tabulate

from botbotavel.BotBase import BotBase
from botbotavel.DatabaseMongo import DatabaseMongo

class BotTube(BotBase):

    botname: str = "BotTube"
    loop_time: int = 60

    async def init(self):
        print("Inicializando BotTube...")
        print("BotTube Iniciado.")


    async def receive_message( self, message_content: str, channel: typing.Union[TextChannel, DMChannel], member: Member, ) -> None:
        if not message_content.startswith("!bottube"):
            return

        options = message_content.split()[1:]

        if len(options) < 1:
            return

        if options[0] == "adicionar":
            youtube_channel = options[1].strip() if len(options) > 1 else None
            await self.adicionar_youtube_channel(channel, member, youtube_channel)

        if options[0] == "listar":
            await self.listar_youtube_channel(channel,member)

        if options[0] == "deletar":
            youtube_channel_id = options[1].strip().strip("'") if len(options) > 1  else None
            await self.deletar_youtube_channel(channel,member, youtube_channel_id)



    async def loop(self, channel: typing.Union[TextChannel, DMChannel]):

        self.atualizar_videos()
        
        with DatabaseMongo(self) as mongodb:
            
            videos = list(mongodb.get_db_collection("youtube_videos").find({
                    "$and":[
                        {"video_showed": False},
                        {"channel":channel.id}
                    ]
            }))

            if videos:
                video = random.choice(videos)
                video_link = f"https://www.youtube.com/watch?v={video['video_id_youtube']}"
                await channel.send(f"{video['video_published_date'].strftime('%d/%m/%Y %H:%M')} - {video['titulo']} - {video_link}")
                mongodb.get_db_collection("youtube_videos").update(
                    {"_id": video["_id"]}, {"$set": {"video_showed": True}}
                )
    



    async def adicionar_youtube_channel( self, channel: typing.Union[TextChannel, DMChannel], member: Member, youtube_channel: str ) -> None:
        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not youtube_channel:
            await channel.send(f"<@{member.id}>, forneça um id de canal para ser adicionado")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                youtube_channel_db = mongodb.get_db_collection("youtube_channels").find_one({"id_channel": youtube_channel})
                if youtube_channel_db:
                    await channel.send(f"<@{member.id}>, este canal já foi adicionado")
                    return

                youtube =build("youtube","v3",developerKey = config('YOUTUBE_API') )
                res = youtube.channels().list(id=youtube_channel,part='snippet').execute()
                titulo = res['items'][0]['snippet']['title']
                descricao = res['items'][0]['snippet']['description']

                mongodb.get_db_collection("youtube_channels").insert(
                    {
                        "_id": mongodb.get_db_collection_counter_id('youtube_channel'),
                        "title": titulo,
                        "id_channel": youtube_channel,
                        "description": descricao,
                        "channel":channel.id
                    }
                )
                self.atualizar_videos()

                await channel.send(f"<@{member.id}>, canal do youtube '{titulo}' adicionado")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao adicionar tente novamente." )


    def atualizar_videos(self) -> None:
        with DatabaseMongo(self) as mongodb:
            channels = mongodb.get_db_collection("youtube_channels").find()

            for channel in channels:
                
                youtube =build("youtube","v3",developerKey = config('YOUTUBE_API') )
                res = youtube.channels().list(id=channel['id_channel'],part='contentDetails').execute()
                uploads_id = res['items'][0]['contentDetails']['relatedPlaylists']['uploads']
                res = youtube.playlistItems().list(playlistId=uploads_id, part="snippet", maxResults=10).execute()
                
                videos = list(mongodb.get_db_collection("youtube_videos").find() )
                ids_video = list(map(lambda video: video['video_id_youtube'], videos))

                for video in res['items']:
                    if video['snippet']['resourceId']['videoId'] not in ids_video :
                        data = datetime.strptime( res['items'][0]['snippet']['publishedAt'] , '%Y-%m-%dT%H:%M:%SZ')
                        mongodb.get_db_collection("youtube_videos").insert(
                            {
                                "_id": mongodb.get_db_collection_counter_id('youtube_video'),
                                "titulo": video['snippet']['title'],
                                "video_id_youtube": video['snippet']['resourceId']['videoId'],
                                "video_published_date": data,
                                "video_showed": False,
                                "channel": channel['channel']
                            }
                        )

                d = datetime.today() - timedelta(days=60)
                mongodb.get_db_collection('youtube_videos').delete_many( { "$and":[
                     {"video_published_date": { "$lte" : d } },
                     {"video_showed": True }
                ]} )





    async def listar_youtube_channel(self, channel: typing.Union[TextChannel,DMChannel], member: Member):
        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return
        
        try:
            with DatabaseMongo(self) as mongodb:
                youtube_channels = mongodb.get_db_collection("youtube_channels").find()

            table_data = []
            for c in youtube_channels:
                table_data.append( [c['_id'] , c['title'], c['id_channel'] ] )

            if not table_data:
                await channel.send(F"<@{member.id}>, nenhum canal do youtube cadastrado.")
                return

            blocos = [ table_data[x:x+10] for x in range(0,len(table_data) ,10) ]

            i = 0
            for b in blocos:
                table = "```"+tabulate(b , ['ID','Nome do Canal',"ID do Canal"]  ,tablefmt="simple")+"```"
                
                if i == 0:
                    header = f"<@{member.id}>, Lista de canais do youtube no Channel #{channel.name}\n"
                    await channel.send( header + table )
                else:
                    await channel.send( f"Parte {i+1}" + table )
                i += 1
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao listar tente novamente." )

    
    
    async def deletar_youtube_channel(self, channel: typing.Union[TextChannel,DMChannel], member: Member, youtube_channel_id: str):
        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not youtube_channel_id:
            await channel.send(f"<@{member.id}>, forneça um id para ser removido")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                youtube_channel_db = mongodb.get_db_collection("youtube_channels").find_one({"id_channel": youtube_channel_id})
                if not youtube_channel_db:
                    await channel.send(f"<@{member.id}>, este canal não está cadastrado")
                    return


                mongodb.get_db_collection("youtube_channels").delete_one({"id_channel": youtube_channel_id})
                mongodb.get_db_collection("youtube_videos").delete_many({"video_id_youtube": youtube_channel_id})
                await channel.send(f"<@{member.id}>, o canal do youtube foi deletado")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao deletar tente novamente." )