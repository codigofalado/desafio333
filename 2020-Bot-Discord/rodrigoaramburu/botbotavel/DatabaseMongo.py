from pymongo import MongoClient
from pymongo.collection import Collection
from decouple import config


class DatabaseMongo:

    def __init__(self, bot) -> None:
        self.bot = bot
        
    def __enter__(self) -> MongoClient:
        self.client = MongoClient( config('MONGO_URL') )
        self.mongodb = self.client['botbotavel']
        return self

    def __exit__(self, exc_type,exc_value, exc_trace) -> None:
        self.client.close()


    def get_db_collection(self , nome: str) -> Collection:
        return self.mongodb[self.bot.__class__.__name__+"_"+nome]

    def get_db_collection_counter_id(self, nome: str) -> int:
        collection_name = self.bot.__class__.__name__+"_"+nome

        counter = self.mongodb['seqs'].find({'collection':collection_name})
        if counter.count() == 0:
            self.mongodb['seqs'].insert({
                'collection': collection_name,
                'id': 0
            })

        _id= int( self.mongodb['seqs'].find_and_modify(
            query={ 'collection' : collection_name },
            update={'$inc': {'id': 1}},
            fields={'id': 1},
            new=True 
        ).get('id') )

        return _id