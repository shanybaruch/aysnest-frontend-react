import { orderService } from '../../services/order/order.service.remote'
import { store } from '../store'
import { SET_ORDERS } from '../reducers/order.reducer'

export async function loadOrders() {
    try {
        const orders = await orderService.query()
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.error('Cannot load orders', err)
        throw err
    }
}