import catNames from "cat-names";
import cats from "./cats";

const nums = [1920, 1080];
const types = ["movie", "photo"];
const tags = ["fluffy", "cute", "tabby", "chonky", "soft"];

const randomWidth = () => nums[Math.floor(Math.random() * nums.length)];
const randomHeight = () => nums[Math.floor(Math.random() * nums.length)];
const randomType = () => types[Math.floor(Math.random() * types.length)];
const randomTags = () => {
  let m = tags.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [tags[m], tags[i]] = [tags[i], tags[m]];
  }
  return tags.slice(0, Math.floor(Math.random() * (5 - 1 + 1) + 1));
};
const randomChoice = (items: string[]) =>
  items[Math.floor(Math.random() * items.length)];
const getFakeItems = (cur = 0) => {
  const fakeItems = [];
  for (let i = 50 * cur; i < cur * 50 + 50; i++) {
    const type = randomType();
    let photos = [];
    if (type === "photo") {
      for (let j = 10 * cur; j < cur * 10 + 10; j++) {
        const cat = randomChoice(cats);
        photos.push({
          src: cat,
          width: randomWidth(),
          height: randomHeight(),
          thumb: cat,
        });
      }
    }
    const cat = randomChoice(cats);
    fakeItems.push({
      id: i,
      name: catNames.random(),
      src: cat,
      thumb: cat,
      photos: photos,
      width: randomWidth(),
      height: randomHeight(),
      tags: randomTags(),
    });
  }
  return fakeItems;
};

console.log(getFakeItems());
