export interface ILogin {
    cod: string,
    msg: string,
    token: string,
}

export interface IBalance {
    cod: string,
    msg: string,
    balance: number
}

export interface IRecargas {
    cod: string, msg: string,
    providers: {
        name: string,
        api_key: string,
        logo: string
    }[]
}
export interface IPostRecarga {
    cod: string, msg: string,
    auth_code: string, xid: string
}

//Paga Facil

export interface IProviders {
    // cod: string, 
    // msg: string,
    // providers: {
    name: string,
    api_key: string,
    bg_color: string,
    logo: string
    // }[]
}

export interface IGetInvoice {
    cod: string, msg: string,
    costumer: {
        first_name: string,
        last_name: string,
        address: string,
        province: string,
        location: string
    },
    invoices: {
        fecha_fact: string,
        fecha_venc: string,
        ref: string,
        total: number,
        pago_min: number,
        pago_total: string,
        pago_reconex: string,
        pago_atraso: number
    }[],
    pending: number | string,
    total_to_pay: number | string,
}

export interface IPostPagoFacil {
    cod: string, msg: string, auth_cod: number
}
export interface IAnularPagoFacil {
    cod: string, msg: string
}

//Transacciones
export interface IGetTransactions {
    cod: string,
    msg: string,
    transactions: {
        auth_code: string,
        xid: string,
        provider: string,
        amount: string,
        reference: string,
        date: string,
        is_reversible: boolean
    }[],
    total: number,
    pages: number,
    current_page: string
}

//Paqueticos
export interface IGetPaqueticos {
    name: string,
    api_key: string,
    logo: string
}

export interface IGetPlanes {
    cod: string,
    msg: string,
    costumer: string,
    suscription: string,
    plans: {
        id: string,
        nombre: string,
        precio: string
    }[]
}

export interface IPostPaquetico {
    cod: string, msg: string, auth_code: string
}

//Seguros
export interface ITipoVehiculo {
    id: string,
    tipo_veh: string,
    nombre: string
}

export interface ITipoPlanes {
    id: string,
    tipo_veh: string,
    vigencia: string,
    precio: string,
    descrip: string
}
