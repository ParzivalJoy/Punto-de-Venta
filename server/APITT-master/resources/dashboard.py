import json
import datetime as dt
import functools
import uuid
from bson.objectid import ObjectId

from flask import request
from flask_restful import Resource
from pymodm import connect, fields, MongoModel, EmbeddedMongoModel
from pymodm.errors import ValidationError
from pymongo.errors import DuplicateKeyError



# Establish a connection to the database.
connect("mongodb://localhost:27017/ej1")

class Dashboard(Resource):
    @classmethod
    def get(self):
        try:
            cuenta = 