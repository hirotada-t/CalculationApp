var app = new Vue({
  el: "#app",
  data: {
    formula:"",
    result:""
  },
  methods:{
    addNum:function(e){
      let input = e.currentTarget.innerText;
      const latestFormula = this.formula[this.formula.length - 1]
      if(this.formula == ""){
        if(input == "+" || input == "*" || input =="/") input = "";// 先頭：number or minus
      } else if(!Number(latestFormula)) {
        if(input == "+" || input == "-" || input == "*" || input =="/") input = "";
      }
      this.formula += input;
    },
    calc:function(){
      this.result = this.formula;
      this.formula = "";
    },
    clearResult:function(){
      this.result = "";
      this.formula = "";
    }
  }
})