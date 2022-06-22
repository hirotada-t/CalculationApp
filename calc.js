var app = new Vue({
  el: "#app",
  
  data: {
    formula: "",
    lastInput: "",
    result: "",
    nums:[9,8,7,6,5,4,3,2,1],
    signs:["÷","×","－","＋"],
    clicked: true
  },

  methods: {
    addNum(e) {
      let input = e.currentTarget.innerText;
      this.lastInput = this.formula[this.formula.length - 1];
      this.clicked = false;

      if (!Number(this.lastInput) && !Number(input)) {
        this.formula = this.formula.slice(0, this.formula.length - 1);
      }
      if (!Number(input)) input = " " + input + " ";
      this.formula += input;
    },

    checkFormula() {
      this.calc();
    },

    calc() {
      this.result = calcNum(this.formula);
      this.formula = "";
      this.clicked = true;
    },
    bsFormula() {

    },
    clearResult() {
      this.result = "";
      this.formula = "";
      this.clicked = true;
    }
  }
})

function calcNum(str) {
  const formulaArr = str.split(" ");
  const temp = [];
  for (let i = 1; i < formulaArr.length; i += 2) {
    if (formulaArr[i] == "×" || formulaArr[i] == "÷") temp.push(i);
  }
  //[5,7]
  if (temp.length > 0) {
    for (let j = 0; j < temp.length; j++) {
      if (formulaArr[temp[j]] == "×") {
        formulaArr[temp[j] + 1] = Number(formulaArr[temp[j] - 1]) * Number(formulaArr[temp[j] + 1]);
        formulaArr[temp[j] - 1] = 0;
      } else if (formulaArr[temp[j]] == "÷") {
        formulaArr[temp[j] + 1] = Number(formulaArr[temp[j] - 1]) / Number(formulaArr[temp[j] + 1]);
        formulaArr[temp[j] - 1] = 0;
      }
    }
  }
  const rmZero = formulaArr.filter(f =>f !== 0);
  const rmX = rmZero.filter(f =>f !== "×");
  const rmSrash = rmX.filter(f =>f !== "÷");
  console.log(rmSrash)
  for (let j = 1; j < rmSrash.length; j+= 2) {
    if(rmSrash[j + 1] == 0) continue;
    if(rmSrash[j] == "＋") {
      rmSrash[j + 1] = Number(rmSrash[j - 1]) + Number(rmSrash[j + 1]);
      rmSrash[j - 1] = 0;
    } else if(rmSrash[j] == "－") {
      rmSrash[j + 1] = Number(rmSrash[j - 1]) - Number(rmSrash[j + 1]);
      rmSrash[j - 1] = 0;
    } 
  }

  return rmSrash[rmSrash.length - 1]
}