import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

let getData = () => new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(1)
    },1000)
})
let getOtherData = () => new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('getOtherData')
    },1000)
})


export default new Vuex.Store({
    strict:process.env.NODE_ENV !== 'production', //开启严格模式 只要状态不是有mutation引起将会抛出异常
    state: {
        count: 0,
        todos: [
            { id: 1, text: '吃饭', done: true },
            { id: 2, text: '睡觉', done: false },
            { id: 3, text: '打豆豆', done: true },
            { id: 4, text: '学习', done: false },
            { id: 5, text: '英语', done: false }
        ],
        input:'马闯',
        input2:'学习'
    },
    mutations: {
        increment: function(state) {
            state.count++
        },
        addTodo(state,obj) {
        	console.log(obj)
        	state.todos.push({id:6,text:'哈哈',done:true})
        },
        gotData(state,a) {
        	console.log(state.count,a)
        },
        gotOtherData(state,a) {
        	console.log(a)
        },
        updateInput(state,val) {
            state.input = val
        },
        updateInput2(state,val) {
            state.input2 = val
        }
    },
    getters:{
    	doneTodos:state => {
    		return state.todos.filter(todo => todo.done)
    	},
    	dontTodosCount:(state,getters) => {
    		return getters.doneTodos.length
    	}
    },
    actions:{
    	increment(context) {
    		console.log(context)
    		context.commit('increment')
    	},
    	incrementAsync(context) {
    		setTimeout(() => {
    			context.commit('increment')
    		},1000)
    	},
    	promiseAction(context,todo) {
    		return new Promise((resolve,reject) => {
    			setTimeout(() => {
    				context.commit('addTodo',todo)
    				resolve()
    			},1000)
    		})
    	},
    	actionB(context,todo) {
    		return context.dispatch('incrementAsync').then(() => {
    			context.commit('addTodo',todo)
    		})
    	},
    	async async1({commit}) {
    		commit('gotData',await getData())
    	},
    	async async2({ dispatch, commit }) {
		    await dispatch('async1') // 等待 async1 完成
		    commit('gotOtherData', await getOtherData())
		 }
    },
    plugins:[createLogger({
        collapsed:true,//自动展开记录的mutation
        filter(mutation,stateBefore,stateAfter) {
            // 若 mutation 需要被记录，就让它返回 true 即可
            return true
        }
    })]
})
