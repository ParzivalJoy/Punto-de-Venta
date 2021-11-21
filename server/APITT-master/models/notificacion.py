from pymodm import connect, fields, MongoModel, EmbeddedMongoModel
from models.participante import ParticipanteModel
from models.encuesta import ParticipantesEncuestaModel
from models.premio import PremioParticipanteModel 
from pymodm.errors import ValidationError

from bson.objectid import ObjectId
#from encuesta import Encuesta
#from premio import Premio
#from promocion import Promocion
# Establish a connection to the database.
connect('mongodb://localhost:27017/ej1')


class NotificacionTemplateModel(MongoModel):
    titulo = fields.CharField()
    mensaje = fields.CharField()
    fecha = fields.DateTimeField()
    imagenIcon = fields.CharField()
    imagenDisplay = fields.CharField()
    bar_text = fields.CharField(blank=True)
    tipo_notificacion = fields.CharField()
    link = fields.CharField(default="null")
    filtros = fields.ListField(fields.CharField(), blank=True, default=[])
    # tags = fields.ListField(default=[])

    @classmethod
    def find_by_id(cls, _Objectid: str) -> "NotificacionTemplateModel":
        try:
            oid = ObjectId(_Objectid)
            notif = cls.objects.get({'_id': oid})
            print(notif)
            return notif
        except cls.DoesNotExist:
            return None

    # Filtros es una lista de ids de participantes a los cuales se les enviara la notificacion
    @classmethod
    def send_to_participantes(cls, n):
        try:
            filtersObids=[]
            if not "filtros" in n:
                return {"message": "Error: Sin destinatarios, debe haber al menos un participante a quien enviarle esta acción"}
            for fil in n.filtros:
                filtersObids.append(ObjectId(fil))
            # Enviar a todos los participantes
            for p in ParticipanteModel.objects.raw({"_id": { "$in": filtersObids}}):
                # part_id = ObjectId(id)
                notif = NotificacionModel(
                id_participante=p._id,
                id_notificacion=n._id,
                estado=0,
                # Estado puede servir para actualizar tambien OJO! ahora esta fijo, pero podrías ser variable
                ).save()            
            return {"status": 200, 
                    "total": len(filtersObids)}
                # PYMODM no tiene soporte transaccional, en un futuro migrar a PYMONGO, que sí tiene soporte
        # return {"message": "Notificacion guardada con éxito."}
        except ValidationError as exc:
            print(exc.message)
            return {"status": 404}

class NotificacionModel(MongoModel):
    id_participante = fields.ReferenceField(ParticipanteModel)
    id_notificacion = fields.ReferenceField(NotificacionTemplateModel)
    estado = fields.IntegerField()
    #link_encuesta = fields.EmbeddedDocumentListField(
    #    Encuesta, default=[])
    #link_premio = fields.EmbeddedDocumentListField(
    #    Premio, default=[])
    #link_promocion = fields.EmbeddedDocumentListField(
    #    Promocion, default=[])

    @classmethod
    def find_by_id(cls, _Objectid: str) -> "NotificacionTemplateModel":
        try:
            oid = ObjectId(_Objectid)
            notif = cls.objects.get({'_id': oid})
            print(notif)
            return notif
        except cls.DoesNotExist:
            return None

    @classmethod
    def add_notificacion(cls, id_not, id_par) -> "NotificacionModel":
        try:
            notif = cls(
                id_participante=id_par,
                id_notificacion=id_not,
                estado=0
            ).save()            
        except ValidationError as exc:   
            return None
        return notif 

    @classmethod
    def delete_notificacion_and_link(cls, id_not) -> "NotificacionModel":
        notif = cls.find_by_id(id_not)
        print("Notificacion encontrada")
        if not notif:
            return None
        try:
            # Obtener el template de la notificacion 
            template = notif.id_notificacion
            if template:
                # Elimnar premio o encuesta o nada, según sea el caso
                if template.tipo_notificacion == 'encuesta':
                    if template.link and template.link != 'null':
                        # Buscar encuesta
                        enc = ParticipantesEncuestaModel.find_by_id(template.link)
                        if enc:
                            print("Notificacion -> Encuesta encontrada")
                            enc.estado = 'respondida'
                            enc.save()
                            enc.delete()
                if template.tipo_notificacion == 'premio':
                    if template.link and template.link != 'null':
                        # Buscar encuesta
                        prem = PremioParticipanteModel.find_by_id(template.link)
                        print("Notificacion -> Premio encontrado")
                        if prem:
                            prem.estado = 1
                            prem.save()
                            prem.delete()
            notif.estado = 1
            notif.save()
            print("Notificacion eliminada")
            # notif.delete()
            # TODO: Generar movimientos correspondientes
        except ValidationError as exc:
            print("Excepcion al eliminar notificación: {}".format(exec))
            return None        
        return notif.estado

    @classmethod
    def find_by_field(cls, field: str, value: str) -> "PremioParticipanteModel":
        try:
            premios = cls.objects.raw({field: value})
        except cls.DoesNotExist:
            return None 
        return premios


class NotificacionesModel(MongoModel):
    nottts = fields.EmbeddedDocumentListField(
        NotificacionModel, default=[])

