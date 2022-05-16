var app = new Vue({
  el: "#app",
  data: {
    formula: "",
    result: "",
    clicked: true
  },
  methods: {
    addNum: function (e) {
      let input = e.currentTarget.innerText;
      this.checkFormula();
      this.formula += input;
      this.checkFormula();
    },
    checkFormula:function(){
      const latestFormula = this.formula[this.formula.length - 1];
      if (Number(latestFormula)) this.clicked = false;
      else this.clicked = true;
    },
    calc: function () {
      this.result = this.formula;
      this.formula = "";
    },
    clearResult: function () {
      this.result = "";
      this.formula = "";
    }
  }
})