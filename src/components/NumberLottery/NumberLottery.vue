<template>
  <div
    class="wrap"
    :class="{
      wrap0: number == 0,
      wrap1: number == 1,
      wrap2: number == 2,
      wrap3: number == 3,
      wrap4: number == 4,
      wrap5: number == 5,
      wrap6: number == 6,
      wrap7: number == 7,
      wrap8: number == 8,
      wrap9: number == 9,
    }"
  >
    <div class="ball">{{ number }}</div>
  </div>
</template>
<script>
export default {
  name: "NumberLottery",
  props: ["number"],
  data() {
    return {
      colors: [
        {
          degree: 15,
          firstColor: "#d4fc79",
          secondColor: "#96e6a1",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
$randomNumber: random(15);
.wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: none;
}
.wrap0 {
  background: radial-gradient(circle at 100px 100px, #96e6a1, #000);
}
.wrap1 {
  background: radial-gradient(circle at 100px 100px, #6de195, #000);
}
.wrap2 {
  background: radial-gradient(circle at 100px 100px, #54e38e, #000);
}
.wrap3 {
  background: radial-gradient(circle at 100px 100px, #d4fc78, #000);
}
.wrap4 {
  background: radial-gradient(circle at 100px 100px, #8debff, #000);
}
.wrap5 {
  background: radial-gradient(circle at 100px 100px, #41d8dd, #000);
}
.wrap6 {
  background: radial-gradient(circle at 100px 100px, #a16bfe, #000);
}
.wrap7 {
  background: radial-gradient(circle at 100px 100px, #d279ee, #000);
}
.wrap8 {
  background: radial-gradient(circle at 100px 100px, #f78fad, #000);
}
.wrap9 {
  background: radial-gradient(circle at 100px 100px, #bc3d2f, #000);
}
.ball {
  font-size: 48px;
  position: absolute;
  color: #fff;
  font-weight: 600;
  font-family: Kanit, sans-serif;
  text-shadow: 0px 15px 5px rgba(0, 0, 0, 0.1), 5px 10px 5px rgba(0, 0, 0, 0.05),
    -5px 10px 5px rgba(0, 0, 0, 0.05);
}
</style>
