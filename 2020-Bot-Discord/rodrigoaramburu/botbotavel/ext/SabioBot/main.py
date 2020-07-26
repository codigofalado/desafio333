import typing
import pathlib
import random
from bson.objectid import ObjectId
import sys
import traceback
from tabulate import tabulate
import textwrap
import re

from discord import TextChannel, DMChannel, Member
import discord
from botbotavel.BotBase import BotBase
from botbotavel.DatabaseMongo import DatabaseMongo
from botbotavel.utils import is_integer


class SabioBot(BotBase):

    botname: str = "SabioBot"
    frases = typing.List

    loop_time: int = 60

    async def init(self):
        print("Inicializando SabioBot...")

        with DatabaseMongo(self) as mongodb:
            numero_frases = mongodb.get_db_collection("frases").count({})
            if numero_frases == 0:
                file = str(pathlib.Path(__file__).parent.absolute()) + "/frases.txt"

                with open(file, encoding="utf-8") as frases:
                    fs = []
                    for frase in frases:
                         fs.append( { "frase": frase.strip() } )

                    mongodb.get_db_collection("frases").insert_many( fs )

        self.load_frases()
        print("SabioBot iniciado.")

    async def receive_message( self, message_content: str, channel: typing.Union[TextChannel, DMChannel], member: Member ) -> None:
        if not message_content.startswith("!sabiobot") and not message_content.startswith("!botsabao"):
            return

        image_path = f"{pathlib.Path(__file__).parent.absolute()}/imgs/wiserobot.png"
        file = discord.File(image_path, filename="image.png")
        
        embed = discord.Embed(title=f"{member.display_name} pediu uma palavra de sabedoria!")
        embed.set_image(url="attachment://image.png")

        frase = random.choice(self.frases)
        
        embed.add_field(name="Vamos a uma pérola de sabedoria...", value=frase['frase'])

        await channel.send(f" <@{member.id}>",file=file, embed=embed)


    async def loop(self, channel: typing.Union[TextChannel, DMChannel]):

        image_path = f"{pathlib.Path(__file__).parent.absolute()}/imgs/wiserobot.png"
        file = discord.File(image_path, filename="image.png")
        
        embed = discord.Embed(title="Vamos a uma pérola de sabedoria...")
        embed.set_image(url="attachment://image.png")

        frase = random.choice(self.frases)
        
        embed.add_field(name="Frase de efeito", value=frase['frase'])

        await channel.send(file=file, embed=embed)       

        return

    def load_frases(self):
        with DatabaseMongo(self) as mongodb:
            x = mongodb.get_db_collection("frases").find({})
            self.frases = []
            for frase in x:
                self.frases.append(frase)