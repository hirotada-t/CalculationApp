var app = new Vue({
  el: "#app",

  data: {
    formulaArr: [],
    formulaStr: "",
    result: "",
    nums: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    signs: ["÷", "×", "－", "＋"],
    clicked: true
  },

  methods: {
    addNum(e) {
      let input = e.currentTarget.innerText;
      if (this.formulaArr.length == 0) {
        this.formulaArr.push(input);
        this.formulaStr = this.formulaArr.join(" ");
        this.clicked = false;
      } else {
        this.checkAddNum(input);
      }
    },

    checkAddNum(input) {
      const prevInput = this.formulaArr[this.formulaArr.length - 1];
      if (!Number(prevInput) && !Number(input)) {
        this.formulaArr[this.formulaArr.length - 1] = input;
      } else if (Number(prevInput) && Number(input)) {
        this.formulaArr[this.formulaArr.length - 1] += input;
      } else {
        this.formulaArr.push(input);
      }
      this.formulaStr = this.formulaArr.join(" ");
    },

    checkFormula() {
      // const leftParenthesesIndex = this.checkBrackets("(");
      // const rightParenthesesIndex = this.checkBrackets(")");

      // console.log(leftParenthesesIndex)
      // console.log(rightParenthesesIndex)

      this.calc();
    },

    // checkBrackets(lr) {
    //   const parenthesesIndex = [];

    //   for (let i = 0; i < this.formulaArr.length; i++) {
    //     if (this.formulaArr[i] === lr) parenthesesIndex.push(i);
    //   }

    //   return parenthesesIndex;
    // },

    // error() {
    //   alert("数式が間違えています。");
    // },

    calc() {
      this.result = this.calcNum;
      this.formulaArr = [];
      this.formulaStr = "";
      this.clicked = true;
    },

    bsFormula() {
      this.formulaArr.splice(-1, 1);
      this.formulaStr = this.formulaArr.join(" ");
    },

    clearResult() {
      if (this.result == "") {
        this.formulaArr = [];
        this.formulaStr = "";
      } else {
        this.result = "";
      }
      this.clicked = true;
    }
  },

  computed: {

    calcNum() {
      const temp = [];
      // ×÷の位置を検索
      for (let i = 1; i < this.formulaArr.length; i += 2) {
        if (this.formulaArr[i] == "×" || this.formulaArr[i] == "÷") temp.push(i);
      }

      // 乗算・除算を実行
      if (temp.length > 0) {
        for (let j = 0; j < temp.length; j++) {
          if (this.formulaArr[temp[j]] == "×") {
            this.formulaArr[temp[j] + 1] = Number(this.formulaArr[temp[j] - 1]) * Number(this.formulaArr[temp[j] + 1]);
            this.formulaArr[temp[j] - 1] = 0;
          } else if (this.formulaArr[temp[j]] == "÷") {
            this.formulaArr[temp[j] + 1] = Number(this.formulaArr[temp[j] - 1]) / Number(this.formulaArr[temp[j] + 1]);
            this.formulaArr[temp[j] - 1] = 0;
          }
        }
      }

      // zero,✕,÷を除いた要素を抽出
      const rmZero = this.formulaArr.filter(f => f !== 0);
      const rmX = rmZero.filter(f => f !== "×");
      const rmSrash = rmX.filter(f => f !== "÷");

      // 加算・減算を実行
      for (let j = 1; j < rmSrash.length; j += 2) {
        if (rmSrash[j + 1] == 0) continue;
        if (rmSrash[j] == "＋") {
          rmSrash[j + 1] = Number(rmSrash[j - 1]) + Number(rmSrash[j + 1]);
          rmSrash[j - 1] = 0;
        } else if (rmSrash[j] == "－") {
          rmSrash[j + 1] = Number(rmSrash[j - 1]) - Number(rmSrash[j + 1]);
          rmSrash[j - 1] = 0;
        }
      }
      return rmSrash[rmSrash.length - 1]
    }
  }
})