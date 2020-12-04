const URL_API = "";
const Dev01 = "https://midas-api.ngrok.io";
const Prod01 = "https://laprimera.do";
const Intermedio = "Intermedio no asignado";
const RAZONES_PAGO = ["Ninguno", "Utilizó el dinero", "enc", "No está", "No se visitó", "Quebró", "Retiró servicio", "Se mudó", "Regresar", "Equipo desaparecido", "Acuerdo de pago", "Pago comisión", "Avance de pago"]


const RESPONSE_CODES = {
    "10": "Código vacio",
    "11": "Código inválido",
    "12": "No se recibieron jugadas, por favor envielas",
    "13": "Estructura de jugadas incorrecta",
    "00": "Generico para respuesta existosa",
    "01": "Nombre vacio",
    "02": "Numero vacio",
    "03": "Clave vacia",
    "04": "Este numero ya está registrado, pruebe con otro",
    "05": "Número incorrecto o no existe",
    "06": "Clave incorrecta",
    "07": "No se pudo registrar, intente mas tarde",
    "08": "El token está vacio",
    "09": "Token inválido, por favor vuelva a iniciar sesión"
}
export {
    URL_API,
    RAZONES_PAGO,
    Dev01,
    Prod01,
    Intermedio

}