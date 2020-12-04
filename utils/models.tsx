const models = {
    invoice: {
        cod: "", msg: "",
        costumer: {
            first_name: "-",
            last_name: "-",
            address: "-",
            province: "-",
            location: "-"
        },
        invoices: [],
        pending: "-",
        total_to_pay: "-"
    },
    transactions: {
        cod: "", msg: "",
        transactions: [],
        total: 0,
        pages: 0,
        current_page: "0"
    }
}

export default models;