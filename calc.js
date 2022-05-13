var app = new Vue({
  el: "#app",
  data: {
    input:"",
    result:""
  },
  methods:{
    addNum:function(e){
      const num = e.currentTarget.innerText;
      this.input += num;
    },
    calc:function(){
      this.result = this.input;
      this.input = "";
    },
    clearResult:function(){
      this.result = "";
      this.input = "";
    }
  }
})