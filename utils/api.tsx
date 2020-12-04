import axios from "axios";
import {
    ILogin, IBalance, IRecargas, IPostRecarga, IProviders, IGetInvoice, IPostPagoFacil, IGetTransactions, IGetPaqueticos,
    IGetPlanes, IPostPaquetico, IAnularPagoFacil, ITipoVehiculo, ITipoPlanes
} from "./apiInterfaces";
import { getRandomNumbers, getStore } from "./functions";
import { SECURE_KEYS } from "./enums";


export async function onLogin(user: string, password: string, callback: (error: boolean, json: ILogin) => void) {
    let error: boolean = false;
    const storedHost = await getStore(SECURE_KEYS.HOST);
    axios.post(`${storedHost}/api/login`, { user, password })
        .then(result => {
            console.log(result.data)
            callback(error, result.data);
        })
        .catch(error => {
            console.error(error);
            error = true;
            callback(error, { msg: "Ha ocurrido un error de red" } as any)
        })
}

export async function getBalance(token: string): Promise<IBalance> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.get(`${storedHost}/api/users/finance/balance`, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener balance: " + error);
    }
}

export async function getRecargas(token: string): Promise<IRecargas> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.get(`${storedHost}/api/providers/category/topup`, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener recargas: " + error);
    }
}


export async function postRecarga(token: string): Promise<IPostRecarga> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.get(`${storedHost}/api/topup`, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error al enviar recarga: " + error);
    }
}

//Paga Facil

export async function getProviders(token: string): Promise<{ cod: string, msg: string, providers: IProviders[] }> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.get(`${storedHost}/api/providers/category/services`, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener proveedores: " + error);
    }
}

export async function getInvoices(token: string, data: { provider: string, nic: string }): Promise<IGetInvoice> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    console.log("Token: ", token, data, storedHost)
    try {
        const requestedData = await axios.post(`${storedHost}/api/service/get_invoices`, { ...data }, {
            headers: {
                token
            },

        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener invoices: " + error);
        return;
    }
}

export async function postPagoFacil(token: string, data: { provider: string, nic: string, amount: string }): Promise<IPostPagoFacil> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.post(`${storedHost}/api/service`, { ...data, xid: + new Date() }, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error al enviar pago: " + error);
    }
}

export async function anularPagoFacil(token: string, data: { provider: string, nic: string, xid: string }): Promise<IAnularPagoFacil> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.post(`${storedHost}/api/service/reverse`, data, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error al anular pago: " + error);
    }
}
//Transacciones
export async function getTransactions(token: string, data: { date1: string, date2: string, page: number, limit: number }): Promise<IGetTransactions> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    console.log("Token: ", token, data, storedHost)
    try {
        const requestedData = await axios.get(`${storedHost}/api/transactions`, {
            headers: {
                token
            },
            params: { ...data }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener transacciones: " + error);
        return;
    }
}

//Paqueticos
export async function getPaqueticosProveedores(token: string): Promise<{ cod: string, msg: string, providers: IGetPaqueticos[] }> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.get(`${storedHost}/api/providers/category/data`, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener proveedores: " + error);
        return;
    }
}

export async function getPaqueticosPlanes(token: string, provider: string, suscription_number: string): Promise<IGetPlanes> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.post(`${storedHost}/api/data/get_plans`, { provider, suscription_number, suscription_type: "phonenumber" }, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener planes: " + error);
        return;
    }
}

export async function postPaqueticosPlanes(token: string, provider: string, suscription_number: string, plan_id: string): Promise<IPostPaquetico> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.post(`${storedHost}/api/data`, { provider, suscription_number, plan_id }, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error enviar plan: " + error);
        return;
    }
}

//Seguros
export async function getSegurosTipoVehiculo(token: string): Promise<{ cod: string, msg: string, types: ITipoVehiculo[] }> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.get(`${storedHost}/api/insurance/vehicle/types`, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener tipo vehiculos: " + error);
        return;
    }
}

export async function getSeguroTipoPlanes(token: string, tipo_veh: string): Promise<{ cod: string, msg: string, planes: ITipoPlanes[] }> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.get(`${storedHost}/api/insurance/planes/${tipo_veh}`, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error obtener tipo planes: " + error);
        return;
    }
}

export async function postVentaSeguro(token: string, data: { phone: string, document: string, vehicle_type: string, vigency: string, chassis: string }): Promise<IPostPaquetico> {
    const storedHost = await getStore(SECURE_KEYS.HOST);
    try {
        const requestedData = await axios.post(`${storedHost}/api/insurance`, { ...data, xid: + new Date() }, {
            headers: {
                token
            }
        })
        return requestedData.data;
    } catch (error) {
        alert("Error enviar seguro: " + error);
        return;
    }
}