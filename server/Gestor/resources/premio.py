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

import dateutil.parser

from models.premio import PremioModel, PremioParticipanteModel
from models.participante import ParticipanteModel
from models.producto import CatalogoModel
from models.tarjeta import TarjetaPuntosTemplateModel, TarjetaPuntosModel
from models.notificacion import NotificacionTemplateModel, NotificacionModel

from schemas.premio import PremioSchema, PremioParticipanteSchema
from schemas.participante import ParticipanteSchema 
from schemas.producto import CatalogoSchema
from marshmallow import pprint

participante_schema = ParticipanteSchema()

premio_schema = PremioSchema()
premio_schemas = PremioSchema(many=True)

# Establish a connection to the database.
connect("mongodb://localhost:27017/ej1")


# TODO: Separar en una nueva clase los id de los participantes
#       que reciben la notificacion y la fecha de quemado
# TODO: Aplicar metodos de segmentación
# TODO: Puntos variables, diversos tipos de bonificación
# # ANTIGUO 
    # class PremioList(Resource):
    #     @classmethod
    #     def get(self, id):
    #         part_id = ObjectId(id)
    #         try:
    #             participante_premios = PremioParticipanteModel.objects.raw({'id_participante': part_id})
    #             pprint(participante_premios)
    #             premios=[]
    #             for premio in participante_premios: 
    #                 premios.append(premio.id_premio)
    #                 pprint(premio.id_premio)
    #             # premios = participante_premios_id
    #             # for item in premios:
    #                 # pprint(item)
    #         except PremioParticipanteModel.DoesNotExist:
    #             return {'message': f"No premios in participante with id{ id }"}
    #         # TODO: Agregar el URL para la solicitud al API de la notificacion, el link a la notificacion
    #         return {"Premios":
    #                     PremioSchema(
    #                     only=(
    #                         "_id",
    #                         "nombre", 
    #                         "puntos", 
    #                         "codigo_barras", 
    #                         "codigo_qr",
    #                         "imagen_icon",
    #                         "imagen_display",
    #                         "fecha_creacion", 
    #                         "fecha_vigencia", 
    #                         "fechas_redencion",
    #                         # "id_producto",
    #                         "id_participante"
    #                     ), many=True).dump(premios),
    #                 },200
"""
    Obtiene los premios que le corresponden a un participante 
    de acuerdo su posición en el sistema de niveles más los 
    premios que no forman parte del sistema de niveles.
"""
class PremioList(Resource):
        @classmethod
        def get(self, id):
            # Obtener los ids de los templates de los premios que poseé un participante
            participante_premios = PremioParticipanteModel.find_by_id_participante_vigentes(id)
            premios_no_quemados = []
            # INTEGRACION DE PREMIO DE NIVEL CERO(0) O NIVEL DE BIENVENIDA
            # participante = ParticipanteModel.find_by_id(id)
            # puntos = participante.saldo
            # if puntos == 0:
            #     level0 = TarjetaPuntosTemplateModel.get_level(0)
            #     if level0:
            #         # Lev is id notificacion
            #         for level_id in level0:
            #             notif0 = TarjetaPuntosTemplateModel.find_by_id(level_id)
            #             # if lev.link and lev.link != "null":
            #             notif0 = NotificacionTemplateModel.find_by_id(notif0.id_notificacion)
            #             if notif0:
            #                 premio0 = None
            #                 if notif0.tipo_notificacion == "premio":
            #                     if notif0:
            #                         notif = NotificacionModel(id_participante=id, id_notificacion=str(notif0._id), estado=0)
            #                     if notif0.link:
            #                         premio0 = PremioParticipanteModel(id_participante=id, id_premio=notif0.link, estado=0).save()
            #                 if notif0.tipo_notificacion == "encuesta":
            #                     pass
            #                 if notif0.tipo_notificacion == "ninguna":
            #                     pass
            #                 if premio0:
            #                     premios_no_quemados.append(notif0)
            # # INTEGRACION del sistema de premios: Se debe verificar si tiene premios por 
            # # nivel aunque no tenga premios que no son de nivel
            # #   1. Buscar al participante
            # participante = ParticipanteModel.find_by_id(id)
            # #   2. Obtener los puntos del participante
            # puntos = participante.saldo
            # #   3. Obtener los niveles del participante
            # niveles = None
            # if puntos:
            #     niveles = TarjetaPuntosTemplateModel.get_level_vigentes(puntos)
            #     if niveles:
            #         for nivl in niveles:
            # #   4. Obtener los Notificacion -> premios de los niveles 
            #             if nivl.id_notificacion:
            #                 notif = NotificacionTemplateModel.find_by_id(nivl.id_notificacion)
            #                 if notif and notif.link and notif.link != "null" and notif.tipo_notificacion == 'premio':
            #                     # 5. Obtener los premios de los niveles
            #                     premio_nivel = find_by_id(notif.link)
            #                     if premio_nivel:
            # if not participante_premios and not niveles_premios:
            if not participante_premios:
                return {'message': f"El participante con el id: { id }, no posee ningún premio"}, 404
            # Filtrar los premios que ya han sido quemados, es decir, agotaron sus vidas (fechas_redencion)
            for pp in participante_premios:
                # Old method: Por estado {0,1}
                # if not len(pp.fechas_redencion) > 0:
                #     premios_no_quemados.append(pp)
                #- Verificar los premios con vidas con los que dispone el participante
                ptemplate = PremioModel.find_by_id(pp.id_premio)
                if ptemplate and ptemplate.vidas:
                    if not len(pp.fechas_redencion) > ptemplate.vidas:
                        premios_no_quemados.append(pp) 
                #- 
                    # try:
                    #     pp.delete()    
                    # except (e):
                    #     print("No se pudo filtrar los premio quemados, Error: {}".format(e))
            if len(premios_no_quemados) == 0:
                return {'message': f"El participante con el id: { id }, no posee ningún premio"}, 404
            premios=[]
            for premio in premios_no_quemados: 
            # Obtener el template de cada premio 
                if premio.id_premio and premio.id_premio != 'null':
                    premio_template = PremioModel.find_by_id(premio.id_premio)
                    if premio_template:
                        premios.append(premio_template)
                        premio_template._id = premio._id
            # # Obtener los premios del participante por el sistema de puntos Niveles
            # #   Obtener el participante
            # p = ParticipanteModel.find_by_id(id)
            # if not p:
            #     return {"message": "No se encontro el participante buscado"}, 404
            # premios_nivel = TarjetaPuntosTemplateModel.get_level(p.saldo)
            # for nivel_id in premios_nivel:
            # #   Obtener el template de cada premio 
            #     nivel = TarjetaPuntosTemplateModel.find_by_id(nivel_id)
            #     if nivel:
            #         print(nivel_id)
            #         print(len(premios_nivel))
            #         notif = NotificacionTemplateModel.find_by_id(nivel.id_notificacion)
            #         if notif:
            #             if notif.link and notif.link != "null":
            #                 # print(type(notif.link))
            #                 premio_template = PremioModel.find_by_id(notif.link)
            #                 if premio_template:
            #                     premios.append(premio_template)
            return {"Premios":
                        PremioSchema(
                        only=(
                            "_id",
                            "nombre", 
                            "puntos", 
                            "codigo_barras", 
                            "codigo_qr",
                            "imagen_icon",
                            "imagen_display",
                            "fecha_creacion", 
                            # "fecha_vigencia",  
                            # "id_producto",
                            "id_participante",
                            "vidas"
                        ), many=True).dump(premios),
                    },200

        @classmethod
        def delete(self, id):
            # Eliminar los premios que poseé un participante
            participante_premios = PremioParticipanteModel.find_by_id_participante_vigentes(id)
            for premio in participante_premios:
                try:
                    premio.delete()
                except:
                    return {"message": "No se pudo eliminar los premios del participante con el _id enviado"}
            return {"message": "Premios del participante eliminados" },200

# Recurso del administrador
class PremioId(Resource):
    # Obtener un premio por id 
    @classmethod 
    def get(self, id):
        p = PremioModel.find_by_id(id)
        if not p:
            return {"message": "No se encontro el premio"}, 404
        return PremioSchema(
                    only=(
                        "_id",
                        "nombre", 
                        "puntos", 
                        "codigo_barras", 
                        "codigo_qr",
                        "imagen_icon",
                        "imagen_display",
                        "fecha_creacion", 
                        "fecha_vigencia", 
                        "vidas",
                        # "fechas_redencion",
                        # "id_producto",
                        # "id_participante"
                    )).dump(p)
    # Test!
    # Actualizar el premio con el id dado
    @classmethod
    def patch(self, id):
        p = PremioModel.find_by_id(id)
        if not p:
            return {"message": "No se encontro el premio"}, 404
        p_req = request.get_json()
        premio = premio_schema.load(p_req["premio"])
        try:
            if "nombre" in premio:
                p.nombre = premio["nombre"] 
            if "puntos" in premio:
                p.puntos = premio["puntos"] 
            if "codigo_barras" in premio:
                p.codigo_barras = premio["codigo_barras"] 
            if "codigo_qr" in premio:
                p.codigo_qr = premio["codigo_qr"] 
            if "imagen_icon" in premio:
                p.imagen_icon = premio["imagen_icon"] 
            if "imagen_display" in premio:
                p.imagen_display = premio["imagen_display"] 
            if "fecha_creacion" in premio:
                p.fecha_creacion = premio["fecha_creacion"] 
            if "fecha_vencimiento" in premio:
                p.fecha_vencimiento = premio["fecha_vencimiento"] 
            if "vidas" in premio:
                p.vidas = premio["vidas"] 
            # if "fechas_redencion" in premio:
            #     p.fecha_redencion = premio["fecha_redencion"] 
            p.save()
        except ValidationError as exc:
            print(exc.message)
            return {"message": "No se pudo actualizar el premio."}, 400
        return {p}, 200


class Premio(Resource):
    @classmethod
    def post(self):
        premio_json = request.get_json()
        # print(premio_json)
        premio = premio_schema.load(premio_json )
        try:
            p = PremioModel()
            if "nombre" in premio:
                p.nombre=premio["nombre"]
            if "puntos" in premio:
                p.puntos=premio["puntos"]
            if "codigo_barras" in premio:
                p.codigo_barras=premio["codigo_barras"]
            if "codigo_qr" in premio:
                p.codigo_qr=premio["codigo_qr"]
            if "imagen_icon" in premio:
                p.imagen_icon=premio["imagen_icon"]
            if "imagen_display" in premio:
                p.imagen_display=premio["imagen_display"]
            if "vidas" in premio:
                p.vidas=premio["vidas"]
            if "fecha_creacion" in premio:
                p.fecha_creacion=premio["fecha_creacion"]
            else: 
                p.fecha_creacion = dt.datetime.now()
            if "fecha_vencimiento" in premio:
                p.fecha_vencimiento=premio["fecha_vencimiento"]
            # if "fecha_redencion" in premio:
            #     p.fecha_redencion=premio["fecha_redencion"]
            # if "id_participante" in premio:
            #     p.id_participante=premio["id_participante"]
            p.save()
            # Enviar a todos los participantes
            for participante in ParticipanteModel.objects.all():
                premio = PremioParticipanteModel(
                    id_premio = p._id,
                    id_participante = participante._id,
                    fecha_creacion = p.fecha_creacion,
                    # fechas_redencion = [],
                    estado = 0
                ).save()
            
        except ValidationError as exc:
            p.delete()
            print(exc.message)
            return {"message": "No se pudo crear el nuevo premio o enviar a los participantes solicitados."}   
        return {'message': "Premio creado",
                'ObjectId': PremioSchema(
                only=(
                "_id",
                )).dump(p)
        }, 200


    @classmethod
    def delete(self):
        pass

# TODO:
# Uso del front Web
# Editar los datos de un premio asiganado a un participante
# _id = PremioParticipante._id
class PremioParticipante(Resource):
    # Regitrar "quemado" de un premio/promoción, añadiendo al el arreglo de fechas en que ha sido redimido
    # un premio, también sirve para quemar premios de cumpleaños, es decir, es de cumpleaños pertenece a este 
    # tipo de premios.
    @classmethod
    def patch(self, id):
        p = PremioParticipanteModel.find_by_id(id)
        if not p:
            return {"message": "No se encontro el premio_participante"}, 404
        p_req = request.get_json()
        try:
            # Checar si puede quemar el premio el participante 
            ptemplate = PremioModel.find_by_id(p.id_premio)
            if ptemplate and ptemplate.vidas:
                # Es vigente el premio ?
                if ptemplate.fecha_vigencia:
                    if dt.datetime.now() > ptemplate.fecha_vigencia:
                        return {"message": "No se pudo quemar el premio, este premio ya no esta vigente, fecha_vigencia: {}".format(ptemplate.fecha_vigencia)}, 400
                # Tiene se puede canjear?, es decir tiene vidas?
                if len(p.fechas_redencion) > ptemplate.vidas:
                    return {"message": "No se pudo quemar el premio, el participante ha quemado este premio el número máximo de veces disponibles"}, 400
            else:
                return {"No se encontró las vidas en el template del premio"}, 404
            vidas_restantes = ptemplate.vidas - len(p.fechas_redencion)
            # Quemar premios
            # ojo con Request_body: fecha_redencion y Model: fechaS_rendencion
            if not "fecha_redencion" in p_req:
                p.fechas_redencion.append(dt.datetime.now())
                # p.vidas -= 1
                p.save()
                return {
                    "message": "Quemado automático: Campo fecha_redencion faltante, por lo que se utizará la fecha y hora del servidor cuando se realizó esta transacción",
                    "vidas_restantes": vidas_restantes
                    }, 202
            date = dateutil.parser.parse(p_req["fecha_redencion"])
            p.fechas_redencion.append(date)
            # p.vidas -= 1
            p.save()
        except ValidationError as exc:
            print(exc.message)
            return {"message": "No se pudo actualizar el premio_participante."}, 400
        return {
                "message": "fecha_redencion:{} registrada".format(p_req["fecha_redencion"]),
                "vidas_restantes": vidas_restantes
                }, 200

    # Estado: Sin probar aún    
    @classmethod
    def put(self, id):
        p = PremioParticipanteModel.find_by_id(id)
        if not p:
            return {"message": "No se encontro el premio_participante"}, 404
        p_req = request.get_json()
        premio = PremioParticipanteSchema().load(p_req)
        try:
            if "id_promocion" in premio:
                p.id_promocion = premio["id_promocion"] 
            if "id_participante" in premio:
                p.id_participante = premio["id_participante"] 
            if "id_premio" in premio:
                p.id_premio = premio["id_premio"] 
            if "estado" in premio:
                p.estado = premio["estado"] 
            if "fecha_creacion" in premio:
                p.fecha_creacion = premio["fecha_creacion"] 
            if "fechas_redencion" in premio:
                p.fechas_redencion = premio["fechas_redencion"] 
            if "fecha_vencimiento" in premio:
                p.fecha_vencimiento = premio["fecha_vencimiento"] 
            # if "fecha_vigencia" in premio:
            #     p.fecha_vigencia = premio["fecha_vigencia"] 
            # if "fechas_redencion" in premio:
            #     p.fecha_redencion = premio["fecha_redencion"] 
            p.save()
        except ValidationError as exc:
            print(exc.message)
            return {"message": "No se pudo actualizar el premio_participante."}, 400
        return {p}, 200

    # Obtener el registro de control de un premio para el participante_premio con el _id = id
    @classmethod
    def get(self, id):
        pp_id = ObjectId(id)
        try:
            participante_premios = PremioParticipanteModel.objects.get({'_id': pp_id})
            participante_premios.id_participante =  str(participante_premios.id_participante._id)
            participante_premios.id_premio =  str(participante_premios.id_premio._id)
        except PremioParticipanteModel.DoesNotExist:
            return {'message': f"No premios_participante._id with id:{ id }"}
        # TODO: Agregar el URL para la solicitud al API de la notificacion, el link a la notificacion
        return {"Premios":
                    PremioParticipanteSchema(
                    only=(
                        "_id",
                        "id_promocion", 
                        "id_participante", 
                        "id_premio", 
                        "estado",
                        "fecha_creacion",
                        "fechas_redencion"
                    ), many=False).dump(participante_premios),
                },200

    # Cancelación de premio redimido, se elimina la última fecha de redención y el estado se regresa a 1
    @classmethod
    def delete(self, id):
        p = PremioParticipanteModel.find_by_id(id)
        if not p:
            return {"message": "No se encontro el premio_participante"}, 404
        p_req = request.get_json()
        try:
            if len(p.fechas_redencion) > 0:
                date_deleted = p.fechas_redencion.pop()
                p.save()
            else:
                return {"message": "El premio con el id: {}, no cuenta con ninguna fecha de redención".format(id)}, 404
        except ValidationError as exc:
            print(exc.message)
            return {"message": "No se pudo actualizar el premio_participante."}, 400
        return {"message": "Cancelación de transacción: redención del premio {} exitosa".format(date_deleted)}, 200