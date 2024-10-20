const funciones = {
  "AL": "AUDITOR LOSA",
  "AR": "AUDITORIA EN VUELO REFORZADO",
  "AU": "AUDITOR DE CALIDAD SIN FORMAR PARTE",
  "CB": "COPILOTO SIN FORMAR PARTE COMO OBSERVADOR",
  "CE": "COPILOTO ENTRENAMIENTO EN BASE SIN FORMAR PARTE",
  "CI": "COPILOTO INSPECCIONADO",
  "CN": "COPILOTO BAJO SUPERVISION SIN FORMAR PARTE DE LA TRIPULACION",
  "CO": "COPILOTO",
  "CP": "COPILOTO EN PRACTICAS",
  "CR": "COPILOTO DE REFUERZO",
  "CS": "COPILOTO BAJO SUPERVISION FORMANDO PARTE DE LA TRIPULACION",
  "FI": "SUELTA EN FLOTA COMANDANTE",
  "IB": "INSTRUCTOR DE ENTRENAMIENTO EN BASE",
  "IC": "INSPECTOR A COPILOTO FORMANDO PARTE",
  "IP": "INSPECTOR A PILOTO FORMANDO PARTE",
  "IR": "INSPECTOR EN VUELO REFORZADO",
  "IV": "INSPECTOR SIN FORMAR PARTE DE LA TRIPULACION",
  "OB": "PILOTO OBSERVADOR VUELO",
  "PA": "PILOTO AL MANDO CON AUDITOR CALIDAD",
  "PB": "PILOTO SIN FORMAR PARTE COMO OBSERVADOR",
  "PC": "PILOTO COPILOTO",
  "PD": "PILOTO AL MANDO SENTADO A LA DERECHA",
  "PE": "PILOTO ENTRENAMIENTO EN BASE SIN FORMAR PARTE",
  "PF": "PILOTO EN ENTRENAMIENTO EN BASE",
  "PI": "PILOTO AL MANDO INSPECCIONADO",
  "PM": "PILOTO AL MANDO",
  "PN": "PILOTO BAJO SUPERVISION SIN FORMAR PARTE DE LA TRIPULACION",
  "PR": "PILOTO DE REFUERZO",
  "PS": "PILOTO BAJO SUPERVISION FORMANDO PARTE DE LA TRIPULACION",
  "QI": "QUALITY INSPECTION",
  "SC": "INSTRUCTOR (SUPERVISOR) A UN COPILOTO",
  "SI": "SUELTA EN FLOTA SEGUNDO PILOTO",
  "SP": "INSTRUCTOR (SUPERVISOR) A UN PILOTO",
  "SR": "SUPERVISOR DE REFUERZO",
  "SS": "SUPERVISOR SUPERVISADO"
};


function parse_line(line) {
  const format = "     ---ID--- -------- ---------------- ---------------- ---- ---- -------- ------- ---------- ";
  const format_begin_inclusive = format.search("ID");
  const begin_inclusive = line.search(/[A-Z]/);

  const missing_spaces = format_begin_inclusive - begin_inclusive;
  const space = " ";
  let formatted_line = space.repeat(missing_spaces).concat(line);

  const missing_tail_spaces = format.length - formatted_line.length;
  formatted_line = formatted_line.concat(space.repeat(missing_tail_spaces));

  let categories = [];
  let i = format_begin_inclusive;
  while (i < format.length) {
    const format_tail = format.slice(i, format.length);
    const category_end_exclusive = format_tail.search(/\s/);

    const category = formatted_line.slice(i, i + category_end_exclusive);
    categories.push(category);

    i += category_end_exclusive + 1;
  }

  return categories;
}

function parse_calendar(calendar) {
  return calendar.split("\n").map((line) => parse_line(line));
}

const type_subtypes_csv = `
QI;        QUALITY INSPECTION            ;CAL      ;QUALITY INSPECTION
BA;        BAJA LABORAL POR IT           ;EMBA     ;BAJA POR EMBARAZO
BA;        BAJA LABORAL POR IT           ;SPMB     ;SIN PARTE MÉDICO DE BAJA
CC;        CURSO DE HABILITACION (ALUMNO);ATR      ;CURSO HABILITACION DE TIPO ATR 
CC;        CURSO DE HABILITACION (ALUMNO);A330     ;CURSO HABILITACION DE TIPO A330 
CC;        CURSO DE HABILITACION (ALUMNO);B787     ;CURSO DE HABILITACION DE TIPO 787 
CC;        CURSO DE HABILITACION (ALUMNO);CATR     ;CURSO CONVERSION ATR
CC;        CURSO DE HABILITACION (ALUMNO);C19E     ;CURSO DE CONVERSION EMBRAER 190 
CC;        CURSO DE HABILITACION (ALUMNO);C73      ;CURSO DE CONVERSION 737
CC;        CURSO DE HABILITACION (ALUMNO);EMBR     ;CURSO DE HABILITACION EMBRAER 
CC;        CURSO DE HABILITACION (ALUMNO);E19E     ;CURSO HABILITACION DE TIPO E19E 
CC;        CURSO DE HABILITACION (ALUMNO);PRA      ;PRECTICAS EN CURSO DE HABILITACION 
CC;        CURSO DE HABILITACION (ALUMNO);VC       ;VIDEOCONFERENCIA
CC;        CURSO DE HABILITACION (ALUMNO);WEB      ;CURSO DE HABILITACION WEB
CC;        CURSO DE HABILITACION (ALUMNO);737      ;CURSO DE HABILITACION DE TIPO 737 
CC;        CURSO DE HABILITACION (ALUMNO);787      ;CURSO CONVERSION 787
CO;        VUELO COMERCIAL;;
CR;        CURSO DE REFRESCO (ALUMNO)    ;ATR      ;CURSO DE REFRESCO ATR
CR;        CURSO DE REFRESCO (ALUMNO)    ;A330     ;ENTRENAMIENTO PERIÓDICO A-330
CR;        CURSO DE REFRESCO (ALUMNO)    ;B787     ;ENTRENAMIENTO PERIÓDICO B787
CR;        CURSO DE REFRESCO (ALUMNO)    ;E19E     ;CURSO DE REFRESCO E19E
CR;        CURSO DE REFRESCO (ALUMNO)    ;E190     ;CURSO DE REFRESCO EMBRAER
CR;        CURSO DE REFRESCO (ALUMNO)    ;FRMS     ;CURSO DE FRMS 
CR;        CURSO DE REFRESCO (ALUMNO)    ;F&SM     ;CURSO DE FRMS Y SMS
CR;        CURSO DE REFRESCO (ALUMNO)    ;PRA      ;PRACTICAS EN ENTRENAMIENTO PERIÓDICO
CR;        CURSO DE REFRESCO (ALUMNO)    ;SMS      ;CURSO DE SMS
CR;        CURSO DE REFRESCO (ALUMNO)    ;VC       ;VIDEOCONFERENCIA - HORA MADRID
CR;        CURSO DE REFRESCO (ALUMNO)    ;WEB      ;ENTRENAMIENTO PERIÓDICO ONLINE
CR;        CURSO DE REFRESCO (ALUMNO)    ;73CO     ;737 CONJUNTO
CR;        CURSO DE REFRESCO (ALUMNO)    ;737      ;ENTRENAMIENTO PERIÓDICO 737
CR;        CURSO DE REFRESCO (ALUMNO)    ;78CO     ;787 CONJUNTO 
CR;        CURSO DE REFRESCO (ALUMNO)    ;787      ;ENTRENAMIENTO PERIÓDICO 787
EB;        ENTRENAMIENTO EN BASE;;
EX;        EXCEDENCIA                    ;GL       ;EXCEDENCIA POR GUARDA LEGAL 
EX;        EXCEDENCIA                    ;VOL      ;EXCENDENCIA VOLUNTARIA 
FR;        FRANCO DE SERVICIO            ;L16B     ;FRANCO/LIBRE C. O. 16B
FR;        FRANCO DE SERVICIO            ;NP       ;NO PRESENTACIÓN AL SERVICIO PROGRAMADO
GS;        GARANTIA SINDICAL SEPLA       ;CEMP     ;HORAS SIN CREDITO SINDICAL 
GS;        GARANTIA SINDICAL SEPLA       ;CSIN     ;HORAS CON CREDITO SINDICAL 
IC;        INSTRUCTOR CURSO TEORICO      ;ADAP     ;ADAPTACIÓN PROCEDIMIENTOS AEA
IC;        INSTRUCTOR CURSO TEORICO      ;AEE      ;CURSO AEE
IC;        INSTRUCTOR CURSO TEORICO      ;ATR      ;CURSO DE REFRESCO ATR 
IC;        INSTRUCTOR CURSO TEORICO      ;A330     ;CURSO A330
IC;        INSTRUCTOR CURSO TEORICO      ;B787     ;CURSO 8787
IC;        INSTRUCTOR CURSO TEORICO      ;CRM      ;FACILITADOR CRM
IC;        INSTRUCTOR CURSO TEORICO      ;D737     ;DIFERENCIAS MAX
IC;        INSTRUCTOR CURSO TEORICO      ;EBT      ;EVIDENCE BASED TRAINING
IC;        INSTRUCTOR CURSO TEORICO      ;ECON     ;ENTRENAMIENTO CONJUNTO, QUE SERÁ PARA LOS INSTRUCTORES
IC;        INSTRUCTOR CURSO TEORICO      ;EPER     ;CURSOS TCP'S
IC;        INSTRUCTOR CURSO TEORICO      ;E19E     ;CURSO E19E
IC;        INSTRUCTOR CURSO TEORICO      ;HATR     ;HABILITACION ATR
IC;        INSTRUCTOR CURSO TEORICO      ;HA33     ;HABILITACIÓN DE TIPO A330 
IC;        INSTRUCTOR CURSO TEORICO      ;H190     ;HABILITACIÓN EMB
IC;        INSTRUCTOR CURSO TEORICO      ;H737     ;HABILITACÓN DE TIPO 737 
IC;        INSTRUCTOR CURSO TEORICO      ;H787     ;HABILITACIÓN DE TIPO 787 
IC;        INSTRUCTOR CURSO TEORICO      ;PP       ;PRIMER PILOTO
IC;        INSTRUCTOR CURSO TEORICO      ;RA33     ;CURSO DE REFRESCO A330 
IC;        INSTRUCTOR CURSO TEORICO      ;REIN     ;REUNIÓN INSTRUCTORES 
IC;        INSTRUCTOR CURSO TEORICO      ;ROCC     ;CURSO DE REFRESCO OCC 
IC;        INSTRUCTOR CURSO TEORICO      ;R190     ;CURSO REFRESCO E190
IC;        INSTRUCTOR CURSO TEORICO      ;R737     ;CURSO DE REFRESCO 737 
IC;        INSTRUCTOR CURSO TEORICO      ;R787     ;CURSO DE REFRESCO 787 
IC;        INSTRUCTOR CURSO TEORICO      ;SEG      ;CURSO DE REFRESCO SEG 
IC;        INSTRUCTOR CURSO TEORICO      ;SUPI     ;SUPERVISOR E INSPECTOR 
IC;        INSTRUCTOR CURSO TEORICO      ;TRI      ;CURSO DE INSTRUCTORES 
IC;        INSTRUCTOR CURSO TEORICO      ;VC       ;VIDEOCONFERENCIA
IC;        INSTRUCTOR CURSO TEORICO      ;1CRM     ;CURSO COMBINADO AÁ‘O 3 
IC;        INSTRUCTOR CURSO TEORICO      ;2CRM     ;CURSO COMBINADO AÁ‘O 2 
IC;        INSTRUCTOR CURSO TEORICO      ;3CRM     ;TRIANUAL CRM AÁ‘O 1
IC;        INSTRUCTOR CURSO TEORICO      ;787      ;CURSO CONVERSION
IM;        IMAGINARIA                    ;INC      ;INC
IS;        INSTRUCTOR SIMULADOR          ;CAL      ;INSPECTOR CALIDAD
IS;        INSTRUCTOR SIMULADOR          ;EBT      ;EVIDENCE BASED TRAINING
IS;        INSTRUCTOR SIMULADOR          ;EBTR     ;EVIDENCE BASER TRAINING RECURRENT
IS;        INSTRUCTOR SIMULADOR          ;ROCC     ;CURSOS DE REFRESCO OCC 
IS;        INSTRUCTOR SIMULADOR          ;SFE      ;EXAMINADOR SIMULADOR(SFE) 
IS;        INSTRUCTOR SIMULADOR          ;SFI      ;INSTRUCTOR SIMULADOR(SFI) 
IS;        INSTRUCTOR SIMULADOR          ;TRE      ;INSTRUCTOR SIMULADOR TRE 
IS;        INSTRUCTOR SIMULADOR          ;TRI      ;INSTRUCTOR SIMULADOR TRI 
IS;        INSTRUCTOR SIMULADOR          ;UPRT     ;UPRT
LI;        DIA LIBRE FIJO;;
OC;        OTROS CURSOS (ALUMNO)         ;ADAP     ;ADAPTACIÓN PROCEDIMIENTOS AEA
OC;        OTROS CURSOS (ALUMNO)         ;AEA      ;ADAPTACIÓN PROCEDIMIENTOS AEA(CONT. HAB.TIPO)
OC;        OTROS CURSOS (ALUMNO)         ;ATO      ;CURSO DE ESTANDARIZACION DE LA ATO
OC;        OTROS CURSOS (ALUMNO)         ;ATP      ;ATP
OC;        OTROS CURSOS (ALUMNO)         ;ATR      ;ATR
OC;        OTROS CURSOS (ALUMNO)         ;A330     ;A330 
OC;        OTROS CURSOS (ALUMNO)         ;B737     ;B737 
OC;        OTROS CURSOS (ALUMNO)         ;B787     ;B787 
OC;        OTROS CURSOS (ALUMNO)         ;CCO      ;CCO 787
OC;        OTROS CURSOS (ALUMNO)         ;CCQ      ;CONVERSION DE A340 A A330
OC;        OTROS CURSOS (ALUMNO)         ;COMP     ;COMPLIANCE PRESENCIAL
OC;        OTROS CURSOS (ALUMNO)         ;CONF     ;BRIEFING CONTROL DE CONFORMIDAD
OC;        OTROS CURSOS (ALUMNO)         ;CPLC     ;COMPLIANCE (WEB)
OC;        OTROS CURSOS (ALUMNO)         ;CRM      ;CURSO CRM
OC;        OTROS CURSOS (ALUMNO)         ;EBT      ;EVIDENCE BASED TRAINING
OC;        OTROS CURSOS (ALUMNO)         ;ECRM     ;ECRM (ON LINE)
OC;        OTROS CURSOS (ALUMNO)         ;EFBO     ;ELECTRONIC FLIGHT BAG (ON LINE)
OC;        OTROS CURSOS (ALUMNO)         ;EFBP     ;ELECTRONIC FLIGHT BAG (PRESENCIAL)
OC;        OTROS CURSOS (ALUMNO)         ;ETOP     ;CURSO ETOPS
OC;        OTROS CURSOS (ALUMNO)         ;E19E     ;E19E 
OC;        OTROS CURSOS (ALUMNO)         ;E190     ;E195 
OC;        OTROS CURSOS (ALUMNO)         ;FMT      ;FORMACIÓN GESTIÓN FATIGA
OC;        OTROS CURSOS (ALUMNO)         ;GRF      ;GLOBAL REPORTING FORMAT (WEB)
OC;        OTROS CURSOS (ALUMNO)         ;JAR      ;VERIFICACIÓN COMPETENCIA JAR-FCL
OC;        OTROS CURSOS (ALUMNO)         ;JD       ;CURSO JD
OC;        OTROS CURSOS (ALUMNO)         ;LOPD     ;LOPD
OC;        OTROS CURSOS (ALUMNO)         ;PAP      ;CURSO CONCIENCIACION
OC;        OTROS CURSOS (ALUMNO)         ;PBN      ;PERFORMANCE BASED NAVIGATION
OC;        OTROS CURSOS (ALUMNO)         ;PIC      ;CURSO PICUS
OC;        OTROS CURSOS (ALUMNO)         ;PP       ;PRIMER PILOTO
OC;        OTROS CURSOS (ALUMNO)         ;PSIC     ;CURSO SUSTANCIAS PSICOACTIVAS (WEB)
OC;        OTROS CURSOS (ALUMNO)         ;REUN     ;REUNIÓN INSTRUCTORES
OC;        OTROS CURSOS (ALUMNO)         ;RN3N     ;RENOVACIÓN DE TIPO 737NG
OC;        OTROS CURSOS (ALUMNO)         ;RN73     ;RENOVACIÓN DE TIPO 737
OC;        OTROS CURSOS (ALUMNO)         ;RN76     ;RENOVACIÓN DE TIPO 767
OC;        OTROS CURSOS (ALUMNO)         ;RPP      ;REFRESCO PRIMER PILOTO
OC;        OTROS CURSOS (ALUMNO)         ;SEG      ;SEGURIDAD DE VUELO
OC;        OTROS CURSOS (ALUMNO)         ;SEN      ;CURSO SENASA
OC;        OTROS CURSOS (ALUMNO)         ;SETO     ;SETO 
OC;        OTROS CURSOS (ALUMNO)         ;SFI      ;SFI
OC;        OTROS CURSOS (ALUMNO)         ;SMS      ;SMS (WEB)
OC;        OTROS CURSOS (ALUMNO)         ;SPAR     ;SPARRING CRM CURSO DE REFRESCO
OC;        OTROS CURSOS (ALUMNO)         ;SUPI     ;SUPERVISOR E INSPECTOR
OC;        OTROS CURSOS (ALUMNO)         ;TRAX     ;FORMACION TEST USERS TRAX
OC;        OTROS CURSOS (ALUMNO)         ;TRI      ;TRI
OC;        OTROS CURSOS (ALUMNO)         ;UPRT     ;UPRT TRI
OC;        OTROS CURSOS (ALUMNO)         ;VC       ;VIDEOCONFERENCIA
OC;        OTROS CURSOS (ALUMNO)         ;VER      ;VERIFICACION EN LINEA
OC;        OTROS CURSOS (ALUMNO)         ;VPOS     ;VUELOS NO COMERCIALES (WEB)
OC;        OTROS CURSOS (ALUMNO)         ;WEB      ;CURSO ONLINE
OC;        OTROS CURSOS (ALUMNO)         ;1CRM     ;TRIENAL CRM COMBINADO AÑO 3
OC;        OTROS CURSOS (ALUMNO)         ;2CRM     ;TRIENAL COMBINADO AÑO 2
OC;        OTROS CURSOS (ALUMNO)         ;3CRM     ;CRM COMBINADO
OC;        OTROS CURSOS (ALUMNO)         ;330R     ;DIFERENCIAS IWD
OC;        OTROS CURSOS (ALUMNO)         ;7MAX     ;737MAX ONLINE
OC;        OTROS CURSOS (ALUMNO)         ;787      ;787
RE;        REUNION                       ;CAL      ;CALIDAD
RE;        REUNION                       ;CRM      ;FACILITADOR
RE;        REUNION                       ;ELE      ;MESA ELECTORAL
RE;        REUNION                       ;FLO      ;FLOTA
RE;        REUNION                       ;INST     ;INSTRUCCIÓN
RE;        REUNION                       ;OPS      ;DIRECCIÓN DE OPERACIONES
RE;        REUNION                       ;SEG      ;SEGURIDAD EN VUELO
RE;        REUNION                       ;VARI     ;VARIAS
EV;        EVALUACIÓN COMPETENCIA        ;INGL     ;COMPETENCIA LINGUISTICA INGLÉS
EV;        EVALUACIÓN COMPETENCIA        ;PED      ;PORTABLE ELECTRONIC DEVICE
AA;        ACTIVIDAD ADICIONAL NO PREVIST;;
RV;        RESERVA                       ;INC      ;INC
VA;        VACACIONES                    ;2025     ;VACACIONES 2025 
VA;        VACACIONES                    ;2024     ;VACACIONES 2024 
VA;        VACACIONES                    ;2023     ;VACACIONES DE 2023 
VA;        VACACIONES                    ;2022     ;VACACIONES 2022 
VA;        VACACIONES                    ;2021     ;VACACIONES 2021 
VA;        VACACIONES                    ;2020     ;VACACIONES 2020 
VA;        VACACIONES                    ;2019     ;VACACIONES 2019 
VA;        VACACIONES                    ;2018     ;VACACIONES DE 2018 
VA;        VACACIONES                    ;2017     ;VACACIONES DE 2017 
VA;        VACACIONES                    ;2016     ;VACACIONES DE 2016 
VA;        VACACIONES                    ;2015     ;VACACIONES 2015 
VA;        VACACIONES                    ;2014     ;VACACIONES 2014 
VA;        VACACIONES                    ;2013     ;VACACIONES 2013 
VA;        VACACIONES                    ;2012     ;VACACIONES 2012 
VA;        VACACIONES                    ;2011     ;VACACIONES 2011 
VA;        VACACIONES                    ;RT23     ;VAC RT 2023
VA;        VACACIONES                    ;RT22     ;VAC RT 2022
VA;        VACACIONES                    ;RT21     ;VAC RT 2021
VA;        VACACIONES                    ;RT20     ;VAC RT 2020
VF;        VUELO FERRY;;
VP;        VUELO DE PRUEBA;;
VS;        VUELO DE SITUACION;;
LA;        LICENCIA RETRIBUIDA ART.34A   ;AC17     ;ACUERDO 2017
LA;        LICENCIA RETRIBUIDA ART.34A   ;BODA     ;BODA DE UN FAMILIAR
LA;        LICENCIA RETRIBUIDA ART.34A   ;DESP     ;INCORPORACIÓN O REINCORPORACIÓN DESPLA
LA;        LICENCIA RETRIBUIDA ART.34A   ;ENF      ;ENFERMEDAD DE UN FAMILIAR
LA;        LICENCIA RETRIBUIDA ART.34A   ;EXAM     ;EXAMEN
LA;        LICENCIA RETRIBUIDA ART.34A   ;FF       ;FALLECIMIENTO DE UN FAMILIAR
LA;        LICENCIA RETRIBUIDA ART.34A   ;INEX     ;DEBER CÁVICO INEXCUSABLE
LA;        LICENCIA RETRIBUIDA ART.34A   ;MUDZ     ;MUDANZA
LA;        LICENCIA RETRIBUIDA ART.34A   ;PAT      ;PERMISO DE PATERNIDAD
LA;        LICENCIA RETRIBUIDA ART.34A   ;RDL5     ;LICENCIA POR FUERZA MAYOR FAMILIAR
LD;        LIBRE DEVUELTO                ;DOB      ;LIBRE DEVUELTO ACUERDO
LD;        LIBRE DEVUELTO                ;PET      ;LI/LN PERDIDO REPROGRAMADO A PETICION TRIPULANTE 
LD;        LIBRE DEVUELTO                ;REP      ;LN REPROGRAMADO (DENTRO 40 DÁAS)
LD;        LIBRE DEVUELTO                ;SEM      ;LIBRE NO PROGRAMADO SEMESTRE ANTERIOR
LD;        LIBRE DEVUELTO                ;VAC      ;POR LIBRE PERDIDO O NO PROGRAMADO COMPENSADO CON ...
PB;        PERMISO DE BODA;;
SP;        SIMULADOR PRIMER PILOTO       ;ATR      ;SIMULADOR PRIMER PILOTO ATR 
SP;        SIMULADOR PRIMER PILOTO       ;A330     ;SIMULADOR PRIMER PILOTO A330 
SP;        SIMULADOR PRIMER PILOTO       ;B787     ;SIMULADOR PRIMER PILOTO 8787 
SP;        SIMULADOR PRIMER PILOTO       ;E19E     ;SIMULADOR PRIMER PILOTO E19E 
SP;        SIMULADOR PRIMER PILOTO       ;190      ;SIMULADOR PRIMER PILOTO E190 
SP;        SIMULADOR PRIMER PILOTO       ;737      ;SIMULADOR PRIMER PILOTO 737 
SP;        SIMULADOR PRIMER PILOTO       ;787      ;SIMULADOR PRIMER PILOTO 787
IB;        INSTRUCTOR ENTRENAMIENTO EN BA;;
EP;        ENTRENAMIENTO EN BASE PREVISTO;ATR      ;ENTRENAMIENTO EN BASE PREVISTO ATR 
EP;        ENTRENAMIENTO EN BASE PREVISTO;A330     ;ENTRENAMIENTO EN BASE PREVISTO A330 
EP;        ENTRENAMIENTO EN BASE PREVISTO;B787     ;ENTRENAMIENTO EN BASE PREVISTO B787 
EP;        ENTRENAMIENTO EN BASE PREVISTO;EMBR     ;ENTRENAMIENTO EN BASE PREVISTO EMBRAER 
EP;        ENTRENAMIENTO EN BASE PREVISTO;E19E     ;ENTRENAMIENTO EN BASE PREVISTO E19E 
EP;        ENTRENAMIENTO EN BASE PREVISTO;737      ;ENTRENAMIENTO EN BASE PREVISTO 737 
EP;        ENTRENAMIENTO EN BASE PREVISTO;787      ;ENTRENAMIENTO EN BASE PREVISTO 787
GC;        GARANTIA SINDICAL COMITE;;
LN;        DIA LIBRE MOVIBLE;;
NR;        LICENCIA NO RETRIBUIDA        ;LICV     ;LICENCIA VOLUNTARIA
NR;        LICENCIA NO RETRIBUIDA        ;RDL5     ;LICENCIA NO RETRIBUIDA PARENTAL 
NR;        LICENCIA NO RETRIBUIDA        ;SANC     ;SANCIÓN
JR;        JEFE DE DIA RELEVO;;
MA;        MATERNIDAD;;
LC;        LACTANCIA NATURAL;;
HP;        HUELGA PERSONAL;;
RM;        RECONOCIMIENTO MEDICO         ;CIMA     ;CENTRO DE INSTRUCCIÓN DE MEDICINA AEROESPACIAL
RM;        RECONOCIMIENTO MEDICO         ;CMA      ;CENTRO DE MEDICINA AERONAUTICA 
RM;        RECONOCIMIENTO MEDICO         ;CTV      ;CUATRO VIENTOS (CMA)
RM;        RECONOCIMIENTO MEDICO         ;GMV      ;GABINETE MEDICO VELÁZQUEZ (MAD) 
RM;        RECONOCIMIENTO MEDICO         ;PCR      ;ANALISIS PCR
RM;        RECONOCIMIENTO MEDICO         ;PSIC     ;PSICOACTIVAS
RM;        RECONOCIMIENTO MEDICO         ;PXII     ;PIO XII
RM;        RECONOCIMIENTO MEDICO         ;QUIR     ;CLINICA QUIRON
RM;        RECONOCIMIENTO MEDICO         ;RINC     ;CLINICA RINCON (AGP)
RM;        RECONOCIMIENTO MEDICO         ;SERM     ;CLINICA SERMESA (VLC)
RM;        RECONOCIMIENTO MEDICO         ;TECS     ;TECSALUD- C/MANUEL AZAÑA, 42 BIS 
RM;        RECONOCIMIENTO MEDICO         ;TSAN     ;TEST ANTIGENOS COVID
ID;        JEFE DE DIA;;
SR;        SIMULADOR DE REFRESCO         ;ADAP     ;SIMULADOR ADAPTACIÓN PROCEDIMIENTOS AEA
SR;        SIMULADOR DE REFRESCO         ;AP1O     ;SIMULADOR VERIFICACION COMPETENCIA APIO
SR;        SIMULADOR DE REFRESCO         ;ATPL     ;PRUEBA PERICIA OBTENCIÓN LIC. ATPL
SR;        SIMULADOR DE REFRESCO         ;CAE      ;SIMULADOR CAPACITACIÓN AEROPUERTO
SR;        SIMULADOR DE REFRESCO         ;EADI     ;SIMULADOR ENTRENAMIENTO ADICIONAL (PUESTO DCHA//11.. 
SR;        SIMULADOR DE REFRESCO         ;EAD3     ;SIMULADOR ENTRENAMIENTO ADICIONAL (3 MESES) 
SR;        SIMULADOR DE REFRESCO         ;ETOP     ;SIMULADOR ETOPS
SR;        SIMULADOR DE REFRESCO         ;EVA1     ;SIMULADOR EVA1 
SR;        SIMULADOR DE REFRESCO         ;EVA2     ;SIMULADOR EVA2 
SR;        SIMULADOR DE REFRESCO         ;EVA3     ;SIMULADOR EVA3 
SR;        SIMULADOR DE REFRESCO         ;EVA4     ;SIMULADOR EVA4 
SR;        SIMULADOR DE REFRESCO         ;EVA5     ;SIMULADOR EVA5 
SR;        SIMULADOR DE REFRESCO         ;EVA6     ;SIMULADOR EVA6
SR;        SIMULADOR DE REFRESCO         ;EXPE     ;SIMULADOR EXPERIENCIA RECIENTE
SR;        SIMULADOR DE REFRESCO         ;E19E     ;SIMULADOR DE REFRESCO E19E
SR;        SIMULADOR DE REFRESCO         ;FCL      ;SIMULADOR VERIFICACION COMPETENCIA JAR-FCL
SR;        SIMULADOR DE REFRESCO         ;HAB      ;SIMULADOR HABILITACIÓN
SR;        SIMULADOR DE REFRESCO         ;LVO      ;LOW VISIBILITY OPERATIONS
SR;        SIMULADOR DE REFRESCO         ;MAX      ;SIMULADOR 737 MAX 
SR;        SIMULADOR DE REFRESCO         ;MFTD     ;SIMULADOR MFTD
SR;        SIMULADOR DE REFRESCO         ;OPC      ;SIMULADOR VERIFICACION OPERADOR
SR;        SIMULADOR DE REFRESCO         ;PP       ;SIMULADOR PRIMER PILOTO
SR;        SIMULADOR DE REFRESCO         ;QI       ;QUALITY INSP
SR;        SIMULADOR DE REFRESCO         ;REF      ;SIMULADOR DE REFRESCO
SR;        SIMULADOR DE REFRESCO         ;REM      ;SIMULADOR REMEDIAL
SR;        SIMULADOR DE REFRESCO         ;RENO     ;SIMULADOR RENOVACIÓN HABILITACIÓN
SR;        SIMULADOR DE REFRESCO         ;SBT      ;SIMULADOR VERIFICACION SBT
SR;        SIMULADOR DE REFRESCO         ;SK       ;SIMULADOR SKILL TEST
SR;        SIMULADOR DE REFRESCO         ;SPAR     ;SIMULADOR SPARRING 
SR;        SIMULADOR DE REFRESCO         ;TRE      ;SIMULADOR VERIFICACION TRE
SR;        SIMULADOR DE REFRESCO         ;TRI      ;SIMULADOR VERIFICACION TRI
SR;        SIMULADOR DE REFRESCO         ;UPRT     ;SIMULADOR UPRT 
SR;        SIMULADOR DE REFRESCO         ;ZF       ;SIMULADOR FLIGHT TRAINING
OF;        OFICINA                       ;CAL      ;CALIDAD
OF;        OFICINA                       ;CRM      ;FACILITADOR CRM 
OF;        OFICINA                       ;ELE      ;MESA ELECTORAL 
OF;        OFICINA                       ;FLO      ;FLOTA
OF;        OFICINA                       ;INST     ;INSTRUCCIÓN
OF;        OFICINA                       ;OPS      ;DIRECCIÓN DE OPERACIONES
OF;        OFICINA                       ;SEG      ;SEGURIDAD DE VUELO 
OF;        OFICINA                       ;VARI     ;VARIAS
RI;        REDUCCIÓN DE JORNADA          ;ENF      ;REDUCCIÓN DE JORNADA POR ENFERMEDAD GRAVE
RI;        REDUCCIÓN DE JORNADA          ;JPA      ;JUBILACIÓN PARCIAL ANTICIPADA
RI;        REDUCCIÓN DE JORNADA          ;1/2      ;REDUCCIÓN DE UN MEDIO
RI;        REDUCCIÓN DE JORNADA          ;1/3      ;REDUCCIÓN DE UN TERCIO
RI;        REDUCCIÓN DE JORNADA          ;1/4      ;REDUCCIÓN DE UN CUARTO
RI;        REDUCCIÓN DE JORNADA          ;1/5      ;REDUCCIÓN DE UN QUINTO
RI;        REDUCCIÓN DE JORNADA          ;1/6      ;REDUCCION DE UN SEXTO
RI;        REDUCCIÓN DE JORNADA          ;1/8      ;REDUCCIÓN DE UN OCTAVO
OS;        OTROS SIMULADORES             ;ADAP     ;ADAPTACIÓN PROCEDIMIENTOS AEA
OS;        OTROS SIMULADORES             ;ATP      ;ATP
OS;        OTROS SIMULADORES             ;ATR      ;ATR
OS;        OTROS SIMULADORES             ;A330     ;AIRBUS 330
OS;        OTROS SIMULADORES             ;B787     ;B787
OS;        OTROS SIMULADORES             ;EBT      ;EVIDENCE BASED TRAINING
OS;        OTROS SIMULADORES             ;E19E     ;E 1 9E
OS;        OTROS SIMULADORES             ;PP       ;PRIMER PILOTO
OS;        OTROS SIMULADORES             ;RN3N     ;RENOVACION DE TIPO 737NG
OS;        OTROS SIMULADORES             ;RN73     ;RENOVACIÓN DE TIPO 737
OS;        OTROS SIMULADORES             ;RN76     ;RENOVACIÓN DE TIPO 767
OS;        OTROS SIMULADORES             ;RPP      ;REFRESCO PRIMER PILOTO
OS;        OTROS SIMULADORES             ;R190     ;EMBRAER
OS;        OTROS SIMULADORES             ;TRE      ;TRE,SFE
OS;        OTROS SIMULADORES             ;TRI      ;TRI,SFI
OS;        OTROS SIMULADORES             ;787      ;787
AU;        AUDITORIA                     ;CAL      ;AUDITORIA CALIDAD
SA;        SIN ACTIVIDAD                 ;CAD      ;CURSO, SR, RECONOCIMIENTO MÉDICO CADUCADO
SA;        SIN ACTIVIDAD                 ;CVID     ;POSIBLE CONTACTO ESTRECHO COVID
SA;        SIN ACTIVIDAD                 ;FATG     ;POR FATIGA
SA;        SIN ACTIVIDAD                 ;FTL      ;DESCANSO POR NORMATIVA FLT
SA;        SIN ACTIVIDAD                 ;INC      ;INC
SA;        SIN ACTIVIDAD                 ;NP       ;NO PRESENTADO SERVICIO PROGRAMADO
SA;        SIN ACTIVIDAD                 ;VACC     ;NO VUELO POR DESCANSO POR VACUNA`;

function build_type_subtype_map() {
  let map = {};
  type_subtypes_csv.split("\n").forEach((line) => {
    const [type, type_description, subtype, subtype_description] = line.split(";");
    if (map[type] == undefined) {
      map[type] = {
        description: type_description,
        subtypes: { },
      };
    }
    map[type].subtypes[subtype] = subtype_description;
  });
  return map;
}

export { funciones, parse_calendar, build_type_subtype_map };
