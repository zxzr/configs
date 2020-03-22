// // 被debounce的函数，http请求，事件处理函数等等
// //<input type="text" class="autocomplete">
// function make_ajax_request(){
//     // 这是一个调用后端api的方法
// }
// // 监听事件并且调用lodash的debounce方法
// $('.autocomplete').on('keydown',
//      _.debounce(make_ajax_request, 1300));
// });

<template>
  <input @input="debounceHandleInput"/>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'debounce',
  data() {
    return {
      starTime: 0,
      endTime: 0,
      delay: 1000,
    };
  },
  computed: {
    debounceHandleInput() {
      return _.debounce(this.handleInput, this.delay);
    },
  },
  methods: {
    handleInput(e) {
      console.log(`debounce wait时间为${this.delay}ms`);
      console.log('触发了input事件', e.target.value);
      this.startTime = new Date().getTime();
      this.remoteMethod();
    },
    remoteMethod() {
      setTimeout(() => {
        const result = `后端请求已完成！`;
        this.endTime = new Date().getTime();
        const costTime = this.endTime - this.startTime;
        console.log(result);
        console.log(`耗时${costTime}毫秒`);
      }, 2000);
    },
  },
};
</script>
