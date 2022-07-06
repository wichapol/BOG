const judgePoint24 = function (nums) {
  let arrNums = [],
    result = [],
    text;
  const operator = {
    add: function (a, b) {
      return a + b;
    },
    sub: function (a, b) {
      return a - b;
    },
    multi: function (a, b) {
      return a * b;
    },
    div: function (a, b) {
      return a / b;
    },
  };
  const { add, sub, multi, div } = operator;

  nums
    .trim()
    .split("")
    .map((val) => {
      const isNum = Number(+val);

      if (!isNum) {
        console.log("Input is only number");
        return;
      }
      return arrNums.push(isNum);
    });

  const length = arrNums.length;
  if (length > 4) {
    console.log("maximum length 4 number");
    arrNums = [];
    return;
  }
  const arrUnique = [...new Set(arrNums)];

  if (arrUnique.length < 4) {
    console.log("Numbers must be unique.");
    return;
  }

  if (arrNums.indexOf(0) !== -1) {
    console.log("character is 1-9");
    return;
  }

  const calculator1 = (array) => {
    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      const a = arr.shift();
      const b = arr.shift();
      result.push(add(a, b));
      result.push(sub(a, b));
      result.push(multi(a, b));
      result.push(div(a, b));
    }
  };
  calculator1(arrNums);

  const tokenType = ["+", "-", "*", "/"];
  const calculator2 = (arr) => {
    const middle = arr.length / 2;

    const arrPrev = arr.splice(0, middle);
    const arrlast = arr.splice(0, middle);

    for (let i = 0; i < middle; i++) {
      for (let j = 0; j < middle; j++) {
        const a = arrPrev[i];
        const b = arrlast[j];

        if (add(a, b) === 24) {
          text = `(${arrNums[0]} ${tokenType[i]} ${arrNums[1]}) ${tokenType[0]}  (${arrNums[2]} ${tokenType[j]}  ${arrNums[3]} )`;

          return;
        }
        if (sub(a, b) === 24) {
          text = `(${arrNums[0]} ${tokenType[i]} ${arrNums[1]}) ${tokenType[1]}  (${arrNums[2]} ${tokenType[j]}  ${arrNums[3]} )`;

          return;
        }
        if (div(a, b) === 24) {
          text = `(${arrNums[0]} ${tokenType[i]} ${arrNums[1]}) ${tokenType[2]}  (${arrNums[2]} ${tokenType[j]}  ${arrNums[3]} )`;

          return;
        }
        if (multi(a, b) === 24) {
          text = `(${arrNums[0]} ${tokenType[i]} ${arrNums[1]}) ${tokenType[3]}  (${arrNums[2]} ${tokenType[j]}  ${arrNums[3]} )`;
          return;
        }
      }
    }
  };
  calculator2(result);

  if (!text) {
    throw new Error("ชุดนี้ไม่สามารถทำให้ผลลัพธ์กลายเป็น 24 ได้");
  }
  console.log(text);
};

judgePoint24(" 6275 ");
