from ma import ma
from marshmallow import Schema, fields, ValidationError
from schemas.notificacion import NotificacionSchema
from schemas.participante import ParticipanteSchema
import datetime as dt


class PremioSchema(ma.Schema):
    _id = fields.Str()
    nombre = fields.Str()
    puntos = fields.Integer()
    codigo_barras = fields.Integer()
    codigo_qr = fields.Str()
    imagen_icon = fields.Str()
    imagen_display = fields.Str()
    fecha_creacion = fields.DateTime()
    fecha_vigencia = fields.DateTime()
    fecha_vencimiento = fields.DateTime(default=dt.datetime(2050,1,1,1,1,1,100180))
    #  = fields.ReferenceField(default=None)
    id_participante = fields.Str()
    vidas = fields.Integer(required=False)

    class Meta:
        fields = (
            "_id",
            "nombre", 
            "puntos", 
            "codigo_barras", 
            "codigo_qr",
            "imagen_icon",
            "imagen_display",
            "fecha_creacion", 
            "fecha_vencimiento",
            "fecha_vigencia", 
            "id_producto",
            "id_participante",
            "vidas",
        )

class PremioParticipanteSchema(ma.Schema):
    _id = fields.Str()
    id_participante = fields.Nested(ParticipanteSchema)
    id_premio = fields.Nested(PremioSchema)
    id_promocion = fields.Str()
    estado = fields.Integer()
    fecha_creacion = fields.DateTime()
    fechas_redencion = fields.List(fields.DateTime)
    fecha_vencimiento = fields.DateTime(default=dt.datetime(2030,1,1,1,1,1,100180))

    class Meta:
        fields = (
            "_id",
            "id_participante",
            "id_premio",
            "id_promocion",
            "estado",
            "fecha_creacion",
            "fechas_redencion",
            "fecha_vencimiento",
        )