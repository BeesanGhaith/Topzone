/*
A- Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input should have exactly one solution, and you may not use the same element twice.
*/

const fun = (nums, target) => {
  for (let i = 0; i <= nums.length; i++) {
    for (let x = 1; x < nums.length; x++) {
      if (nums[i] + nums[x] === target) {
        return [i, x];
      }
    }
  }
};

console.log(fun([3, 2, 4], 6));
console.log(fun([5, 3, 4, 1], 9));

/*
B- Reverse Integer (without converting to string)
*/

const reverseNum = (x) => {
  let newNum = 0;
  while (x > 0) {
    newNum = newNum * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return newNum;
};

console.log(reverseNum(123));
console.log(reverseNum(695));

