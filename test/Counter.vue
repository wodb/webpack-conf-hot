<template>
	<div>
		<p>{{ count }}</p>
		<p>{{ todo }}</p>
		<button @click="add">add</button>
		<button @click="dispatcher">dispatcher</button>
		<button @click="asyncAdd">asyncAdd</button>
		<button @click="promiseAction">promiseAction</button>
		<button @click="promiseDispatch">promiseDispatch</button>
		<button @click="actionB(11)">actionB</button>
		<button @click="dispatcher2">dispatcher2</button>
		<button @click="strictAdd">strictAdd{这是一个会报错的按钮}</button>
	</div>
</template>
<script>
	import {mapState,mapActions} from 'vuex'
	console.log(mapActions(['increment']))
	export default {
		data:function () {
			return {todo:1}
		},
		computed:{
			...mapState({
				count:state => state.count
			})
		},
		// methods:mapActions(['increment','incrementAsync'])
		methods:{
			...mapActions({
				add:'increment',
				asyncAdd:'incrementAsync',
				promiseAction:'promiseAction',
				actionB:'actionB',
			}),
			dispatcher() {
				this.$store.dispatch('increment')
			},
			dispatcher2() {
				this.$store.dispatch('async2')
			},
			promiseDispatch() {
				this.$store.dispatch('promiseAction',1111).then(() => {
					console.log('完成异步')
				})
			},
			strictAdd() {
				this.$store.state.count = 2
			}
		}
	}
</script>