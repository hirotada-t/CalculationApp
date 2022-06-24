var app = new Vue({
  el: "#app",

  data: {
    input: "",
    formulaArr: [],
    formulaStr: "",
    result: "",
    nums: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    signs: {"÷":1, "×":1, "－":1, "＋":1},
    clicked: true
  },

  created() {
    window.addEventListener('keydown', this.inputKey);
  },

  methods: {
    inputKey(e) {
      const inputKeyFunc = {
        "/": Object.keys(this.signs)[0],
        "*": Object.keys(this.signs)[1],
        "-": Object.keys(this.signs)[2],
        "+": Object.keys(this.signs)[3],
      }

      if (Number(e.key) || e.key == 0) {
        this.input = e.key;
        this.addNum();
      } else if (typeof inputKeyFunc[e.key] != "undefined" && this.formulaArr.length != 0) {
        this.input = inputKeyFunc[e.key];
        this.addNum();
      }
      else if (e.key == "Backspace") this.bsFormula();
      else if (e.key == "Escape") this.clearResult();
      else if (e.key == "Enter") this.checkFormula();
    },

    inputBtn(e) {
      this.input = e.currentTarget.innerText;
      this.addNum();
    },

    addNum() {
      if (this.formulaArr.length == 0) {
        this.formulaArr.push(this.input);
        this.formulaStr = this.formulaArr.join(" ");
        this.clicked = false;
      } else {
        this.checkAddNum();
      }
    },

    checkAddNum() {
      const prevInput = this.formulaArr[this.formulaArr.length - 1];

      // 一つ前が符号で入力も符号の場合は差し替える
      if (this.signs[prevInput] == 1 && this.signs[this.input] == 1) {
        this.formulaArr[this.formulaArr.length - 1] = this.input;
      }
      // 一つ前が数値で入力も数値の場合は一つ前に追加する
      else if (this.signs[prevInput] != 1 && this.signs[this.input] != 1) {
        this.formulaArr[this.formulaArr.length - 1] += this.input;
      }
      // それ以外（一方が符号で他方が数値）の場合は配列に追加する
      else {
        this.formulaArr.push(this.input);
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
      if (this.formulaArr.length == 0) this.clicked = true;
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