import typing
import feedparser
from datetime import datetime , timedelta
import random
from discord import TextChannel, DMChannel, Member
import pymongo
import traceback
import sys
from tabulate import tabulate

from botbotavel.BotBase import BotBase
from botbotavel.DatabaseMongo import DatabaseMongo




class FeedNewsBot(BotBase):

    botname: str = "FeedNewsBot"
    loop_time: int = 60

    async def init(self):
        print("Inicializando FeedNewsBot...")

        print("FeedNewsBot iniciado.")

    async def receive_message( self, message_content: str, channel: typing.Union[TextChannel, DMChannel], member: Member, ) -> None:
        if not message_content.startswith("!newsbot"):
            return

        options = message_content.split()[1:]

        if len(options) < 1:
            return

        if options[0] == "adicionar":
            url_feed = options[1].strip().strip("'") if len(options) > 1 else None
            await self.adicionar_feed(channel, member, url_feed)

        if options[0] == "deletar":
            feed_url = options[1].strip().strip("'") if len(options) > 1  else None
            await self.deletar_feed(channel,member, feed_url)

        if options[0] == "listar":
            await self.listar_feed(channel,member)

        if options[0] == "ultima":
            await self.ultima_feed(channel,member)



    async def loop(self, channel: typing.Union[TextChannel, DMChannel]):

        self.atualizar_feeds()
        
        with DatabaseMongo(self) as mongodb:
            
            news = list(mongodb.get_db_collection("feeds_posts").find({
                    "$and" : [ 
                        {"news_showed": False} , 
                        {"channel": channel.id } 
                    ]
            }))

            if news:
                new = random.choice(news)
                await channel.send(f"{new['news_published_date'].strftime('%d/%m/%Y %H:%M')} - {new['news_titulo']} \n {new['news_link']}")
                mongodb.get_db_collection("feeds_posts").update(
                    {"_id": new["_id"]}, {"$set": {"news_showed": True}}
                )



    async def adicionar_feed(self, channel: typing.Union[TextChannel, DMChannel], member: Member, url_feed: str) -> None:
        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not url_feed:
            await channel.send(f"<@{member.id}>, forneça um feed para ser adicionado")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                feed_db = mongodb.get_db_collection("feeds").find_one({"link_feed": url_feed})
                if feed_db:
                    await channel.send(f"<@{member.id}>, este feed já foi adicionado")
                    return

                news_feed = feedparser.parse( url_feed )
                
                if news_feed.feed:
                    mongodb.get_db_collection("feeds").insert(
                        {
                            "_id": mongodb.get_db_collection_counter_id('feeds'),
                            "title": news_feed.feed.title,
                            "subtitle": news_feed.feed.subtitle,
                            "link_feed": url_feed,
                            "channel": channel.id
                        }
                    )

                await channel.send(f"<@{member.id}>, feed {url_feed} adicionado")
                self.atualizar_feeds()
                
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao adicionar tente novamente." )

        



    def atualizar_feeds(self) -> None:

        with DatabaseMongo(self) as mongodb:
            feeds = mongodb.get_db_collection("feeds").find()

            for feed in feeds:
                news_feed = feedparser.parse(feed["link_feed"])
                news = list(mongodb.get_db_collection("feeds_posts").find() )
                links_bancos = list(map(lambda post: post['news_link'], news))

                for entry in news_feed.entries:
                    
                    if entry.link not in links_bancos :
                        data = datetime.strptime( entry.published, "%a, %d %b %Y %H:%M:%S %z")
                        mongodb.get_db_collection("feeds_posts").insert(
                            {
                                "feed": feed["link_feed"],
                                "news_titulo": entry.title,
                                "news_link": entry.link,
                                "news_published_date": data,
                                "news_showed": False,
                                "channel":feed['channel']
                            }
                        )

                d = datetime.today() - timedelta(days=10)
                mongodb.get_db_collection('feeds_posts').delete_many( {"news_published_date": { "$lte" : d } } )


    async def deletar_feed(self, channel: typing.Union[TextChannel,DMChannel], member: Member, feed_url: str):
        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not feed_url:
            await channel.send(f"<@{member.id}>, forneça um feed para ser removido")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                feed_db = mongodb.get_db_collection("feeds").find_one({"link_feed": feed_url})
                if not feed_db:
                    await channel.send(f"<@{member.id}>, este feed não está cadastrado")
                    return


                mongodb.get_db_collection("feeds").delete_one({"link_feed": feed_url})
                mongodb.get_db_collection("feeds_posts").delete_many({"feed": feed_url})
                await channel.send(f"<@{member.id}>, o feed foi deletado")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao deletar tente novamente." )




    
    async def listar_feed(self, channel: typing.Union[TextChannel,DMChannel], member: Member):
        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return
        
        try:
            with DatabaseMongo(self) as mongodb:
                feeds = mongodb.get_db_collection("feeds").find({'channel':channel.id})
            
            table_data = []          
            for feed in feeds:
                table_data.append([
                    feed['_id'],
                    feed['title'],
                    feed['link_feed']
                ])

            if not table_data:
                await channel.send(F"<@{member.id}>, nenhum feed de notícia cadastrado.")
            
            blocos = [ table_data[x:x+10] for x in range(0,len(table_data) ,10) ]

            i = 0
            for b in blocos:
                table = "```"+tabulate(b , ['ID','Titulo',"Link Feed"] ,tablefmt="simple")+"```"
                if i == 0:
                    header = f"<@{member.id}>, Lista de feed de notícias no Canal #{channel.name}\n"
                    await channel.send( header + table )
                else:
                    await channel.send( f"Parte {i+1}" + table )
                i += 1

        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao listar tente novamente." )




    async def ultima_feed(self, channel: typing.Union[TextChannel,DMChannel], member: Member) -> None:

        try:
            with DatabaseMongo(self) as mongodb:
                new = mongodb.get_db_collection("feeds_posts").find({'channel':channel.id}).sort('news_published_date', pymongo.DESCENDING ).limit(1).next()
                await channel.send(f"{new['news_published_date'].strftime('%d/%m/%Y %H:%M')} - {new['news_titulo']} \n {new['news_link']}")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro recuperar ultima noticia." )