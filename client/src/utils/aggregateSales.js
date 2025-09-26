// Aqui contém a Lógica para agregar as vendas por dia, para serem apresentadas no gráfico ebookCharts
import moment from 'moment'

export const aggregateEbookSalesByDate  = (orders) => {
    const salesMap = {}

    orders.forEach(order => {
        const orderDate = moment(order.date).format('YYYY-MM-DD')

        order.items.forEach(item => {
            if (!salesMap[orderDate]) salesMap[orderDate] = 0
            salesMap[orderDate] += item.quantity
        })
    })

    return Object.entries(salesMap).map(([period, quantity]) => ({
        period,
        quantity
    }))

}