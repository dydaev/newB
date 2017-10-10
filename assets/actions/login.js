import REDUCERS from '../consts'

export function login(data) {
    return {
        type: REDUCERS.AUTH.LOGIN,
        payload: data
    }
}

// export function increase(n) {
//     return {
//         type: INCREASE,
//         amount: n
//     }
// }
//
// export function decrease(n) {
//     return {
//         type: DECREASE,
//         amount: n
//     }
// }
