<template>
	<div>
	    <h1>Shopping Cart Example</h1>
	    <hr>
	    <h2>Products</h2>
	    <hr>
	    <p>{{this.$store.getters.dontTodosCount}}</p>
		<ul>
			<li v-for="todo in doneTodos" key={{todo.id}}>{{todo.text}}</li>
		</ul>
		<hr>
	    <p>{{dontTodosCount}}</p>
	    <hr>
	    <input type="text" :value="message" @input="input">
	    <div class="box">{{message}}</div>
	    <!-- 第二种实现双向数据绑定 -->
	    <input type="text" v-model="message2">
	    <p v-text="message2"></p>
	    <hr>
	    <Counter></Counter>
  </div>
</template>
<style>
	.box{
		width: 300px;
		height: 20px;
		overflow: hidden;
		line-height: 20px;
		border: 1px dotted #ccc;
	}
</style>
<script>
	import {mapGetters,mapState,mapActions} from 'vuex'
	import Counter from './Counter.vue'
	export default {
		components:{
			Counter
		},
		computed:{
			...mapState({
				message:(state) => state.input
			}),
			...mapGetters(['dontTodosCount','doneTodos']),
			message2: {
				get() {
					return this.$store.state.input2
				},
				set(value) {
					this.$store.commit('updateInput2',value)
				}
			}

		},
		methods:{
			input(e) {
				console.log(this.message)
				this.$store.commit('updateInput',e.target.value)
			}
		}
	}
</script>