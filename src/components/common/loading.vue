<template>
  <section class="mask">
    <section id="loading_container">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 111111;
  }

  #loading_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 40px;
    height: 40px;
  }

  #loading_container span {
    display: block;
    bottom: 0px;
    width: 20px;
    height: 20px;
    background: #9b59b6;
    position: absolute;
  }

  #loading_container span:nth-child(1) {
    animation: preloader_2_1 1.2s infinite ease-in-out;
  }

  #loading_container span:nth-child(2) {
    left: 20px;
    animation: preloader_2_2 1.2s infinite ease-in-out;
  }

  #loading_container span:nth-child(3) {
    top: 0px;
    animation: preloader_2_3 1.2s infinite ease-in-out;
  }

  #loading_container span:nth-child(4) {
    top: 0px;
    left: 20px;
    animation: preloader_2_4 1.2s infinite ease-in-out;
  }

  @keyframes preloader_2_1 {
    0% {
      -transform: translateX(0px) translateY(0px) rotate(0deg);
      border-radius: 0px;
    }
    50% {
      -transform: translateX(-20px) translateY(-10px) rotate(-180deg);
      border-radius: 20px;
      background: #3498db;
    }
    80% {
      -transform: translateX(0px) translateY(0px) rotate(-360deg);
      border-radius: 0px;
    }
    100% {
      -transform: translateX(0px) translateY(0px) rotate(-360deg);
      border-radius: 0px;
    }
  }

  @keyframes preloader_2_2 {
    0% {
      -transform: translateX(0px) translateY(0px) rotate(0deg);
      border-radius: 0px;
    }
    50% {
      -transform: translateX(20px) translateY(-10px) rotate(180deg);
      border-radius: 20px;
      background: #f1c40f;
    }
    80% {
      -transform: translateX(0px) translateY(0px) rotate(360deg);
      border-radius: 0px;
    }
    100% {
      -transform: translateX(0px) translateY(0px) rotate(360deg);
      border-radius: 0px;
    }
  }

  @keyframes preloader_2_3 {
    0% {
      -transform: translateX(0px) translateY(0px) rotate(0deg);
      border-radius: 0px;
    }
    50% {
      -transform: translateX(-20px) translateY(10px) rotate(-180deg);
      border-radius: 20px;
      background: #2ecc71;
    }
    80% {
      -transform: translateX(0px) translateY(0px) rotate(-360deg);
      border-radius: 0px;
    }
    100% {
      -transform: translateX(0px) translateY(0px) rotate(-360deg);
      border-radius: 0px;
    }
  }

  @keyframes preloader_2_4 {
    0% {
      -transform: translateX(0px) translateY(0px) rotate(0deg);
      border-radius: 0px;
    }
    50% {
      -transform: translateX(20px) translateY(10px) rotate(180deg);
      border-radius: 20px;
      background: #e74c3c;
    }
    80% {
      -transform: translateX(0px) translateY(0px) rotate(360deg);
      border-radius: 0px;
    }
    100% {
      -transform: translateX(0px) translateY(0px) rotate(360deg);
      border-radius: 0px;
    }
  }
</style>
