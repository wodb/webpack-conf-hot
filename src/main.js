import Vue from 'vue'

import App from './components/App.vue'
import store from './store/store'

import { currency } from './currency'

Vue.filter('currency', currency)

var vm = new Vue({
    el: '#app',
    store,
    render: (h) => h(App),
    created: function() {
        //在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。
        //但是还没有开始 DOM 编译，$el 还不存在,但是实例存在,即this.a存在,可打印出来 。
        console.log("created221");
    },
    beforeMount() {
    	console.log('beforeMount')
    },
    mounted() {
    	console.log('mounted')
    },
    beforeUpdate() {
    	console.log('beforeUpdate')
    },
    updated() {
    	console.log(`updated`)
    },
    beforeDestroy() {
    	console.log(`beforeDestroy`)
    },
    destroyed() {
    	console.log(`destroyed`)
    }
})