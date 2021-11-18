export const segmentacion = [
   {
    id: 0,
    value: "todos",
    label: "Ninguna",
    fields: [
      {
        value: "nombre",
        label: "Nombre",
        tipo: "-"
      }
    ]
  },
  {
    id: 1,
    value: "participante_model",
    label: "Por datos del Participante",
    fields: [
      {
        value: "nombre",
        label: "Nombre",
        tipo: "string"
      },
      {
        value: "paterno",
        label: "Apellido paterno",
        tipo: "string"
      },
      {
        value: "sexo",
        label: "Sexo",
        tipo: "string"
      },
      {
        value: "fecha_nacimiento",
        label: "Fecha de nacimiento",
        tipo: "date"
      },
      {
        value: "fecha_antiguedad",
        label: "Fecha de antiguedad como cliente",
        tipo: "date"
      }
    ]
  },
  {
    id: 2,
    value: "venta_model",
    label: "Por datos del ticket de venta",
    fields: [
      {
        value: "fecha_compra",
        label: "Fecha",
        tipo: "date"
      },
      {
        value: "total",
        label: "Monto total ($)",
        tipo: "float"
      }
    ]
  },
  {
    id: 3,
    value: "encuesta_model",
    label: "Por datos de las encuestas creadas",
    fields: [
      {
        value: "fecha_respuesta",
        label: "Fecha de respuesta",
        tipo: "date"
      },
      {
        value: "metrica",
        label: "Métrica",
        tipo: "string"
      },
      {
        value: "rubrica",
        label: "Ponderación (rubrica)",
        tipo: "float"
      }
    ]
  },
  {
    id: 4,
    value: "participantes_encuesta_model",
    label: "Por datos de la interacción de los participantes en las encuestas",
    fields: [
      {
        value: "estado",
        label: "Estado",
        tipo: "string"
      },
      {
        value: "fecha_respuesta",
        label: "Fecha en que fue respondida",
        tipo: "date"
      },
      {
        value: "respuestas",
        label: "Respuesta del participante",
        tipo: "string"
      }
    ]
  },
  {
    id: 5,
    value: "participante_premio_model",
    label: "Por datos de la interacción de los participantes con premios",
    fields: [
      {
        value: "estado",
        label: "Estado",
        tipo: "string"
      },
      {
        value: "fecha_creacion",
        label: "Fecha en que fue creado",
        tipo: "date"
      },
      {
        value: "fechas_redencion",
        label: "Fecha en la que fue redimido",
        tipo: "date"
      }
    ]
  },
  {
    id: 6,
    value: "participante_model_tarjeta_sellos",
    label: "Por datos del sistema de las tarjetas de sellos",
    fields: [
      {
        value: "num_sellos",
        label: "Número de sellos",
        tipo: "float"
      }
    ]
  },
  {
    id: 7,
    value: "participante_model_tarjeta_puntos",
    label: "Por datos del sistema de las tarjetas de puntos",
    fields: [
      {
        value: "balance",
        label: "Número de puntos",
        tipo: "float"
      }
    ]
  },
  {
    id: 8,
    value: "nadie",
    label: "No enviar a nadie",
    fields: [
      {
        value: "nombre",
        label: "Nombre",
        tipo: "-"
      }
    ]
  },
];

export const segmentacion_metrica = [
  {
    value: 0,
    label: "Número de participantes nuevos",
    tipo: "date"
  },
  {
    value: 1,
    label: "Número de premios entregados",
    collection: "participante_premio_model",
    tipo: "float",
    float1: "",
    field: "fecha_antiguedad"
  },
  {
    value: 2,
    label: "Satisfacción general",
    collection: "participantes_encuesta_model",
    tipo: "string",
    str1: "",
    field: "estado"
  }
];

export const rangoTiempo = [
  {
    id: 0,
    value: "anterior",
    label: "Anterior",
    inputType: "number_blockSelect",
    method: "filter_by_date"
  },
  {
    id: 1,
    value: "siguiente",
    label: "Siguiente",
    inputType: "number_blockSelect",
    method: "filter_by_date"
  },
  {
    id: 2,
    value: "actual",
    label: "Actual",
    inputType: "blockSelect",
    method: "filter_by_date"
  },
  {
    id: 3,
    value: "antes",
    label: "Antes",
    inputType: "singleCallendar",
    method: "filter_by_date"
  },
  {
    id: 4,
    value: "despues",
    label: "Después",
    inputType: "singleCalendar",
    method: "filter_by_date"
  },
  {
    id: 5,
    value: "rango",
    label: "Entre",
    inputType: "doubleCallendar",
    method: "filter_by_date_range"
  }
];

export const rangoNumeros = [
  {
    id: 0,
    value: "=",
    label: "Igual a",
    inputType: "1",
    method: "filter_by_float"
  },
  {
    id: 1,
    value: ">",
    label: "Mayor a",
    inputType: "1",
    method: "filter_by_float"
  },
  {
    id: 2,
    value: ">=",
    label: "Mayor o igual a",
    inputType: "1",
    method: "filter_by_float"
  },
  {
    id: 3,
    value: "<",
    label: "Menor que",
    inputType: "1",
    method: "filter_by_float"
  },
  {
    id: 4,
    value: "<=",
    label: "Menor o igual que",
    singularLabel: "Minuto",
    inputType: "1",
    method: "filter_by_float"
  },
  {
    id: 5,
    value: "<>",
    label: "Entre",
    inputType: "2",
    method: "filter_by_float_range"
  }
];

export const rangoStrings = [
  {
    id: 0,
    value: "es",
    label: "Es",
    method: "filter_by_string"
  },
  {
    id: 1,
    value: "no es",
    label: "No es",
    method: "filter_by_string"
  },
  {
    id: 2,
    value: "contiene",
    label: "Contiene",
    method: "filter_by_string"
  },
  {
    id: 3,
    value: "no contiene",
    label: "No contiene",
    method: "filter_by_string"
  }
];

export const escalaTiempo = [
  {
    id: 0,
    value: "dias",
    label: "Días",
    singularLabel: "Día"
  },
  {
    id: 1,
    value: "semanas",
    label: "Semanas",
    singularLabel: "Semana"
  },
  {
    id: 2,
    value: "meses",
    label: "Meses",
    singularLabel: "Mes"
  },
  {
    id: 3,
    value: "años",
    label: "Años",
    singularLabel: "Año"
  },
  {
    id: 4,
    value: "minutos",
    label: "Minutos",
    singularLabel: "Minuto"
  },
  {
    id: 5,
    value: "horas",
    label: "Horas",
    singularLabel: "Hora"
  }
];