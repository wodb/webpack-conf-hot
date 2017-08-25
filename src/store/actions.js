import * as mutationTypes from './mutation-types'

export const addToCart = ({commit},product) => {
	// 如果商品库存大于0
	if (product.inventory > 0) {
		commit(mutationTypes.ADD_TO_CART,{id:product.id})
	}
}