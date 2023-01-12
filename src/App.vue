<template>
  <div id="app" :style="bgImg">
<!--    <vue-particles-->
<!--            color="#409EFF"-->
<!--            :particleOpacity="0.7"-->
<!--            :particlesNumber="60"-->
<!--            shapeType="circle"-->
<!--            :particleSize="6"-->
<!--            linesColor="#409EFF"-->
<!--            :linesWidth="1"-->
<!--            :lineLinked="true"-->
<!--            :lineOpacity="0.4"-->
<!--            :linesDistance="150"-->
<!--            :moveSpeed="3"-->
<!--            :hoverEffect="true"-->
<!--            hoverMode="grab"-->
<!--            :clickEffect="true"-->
<!--            clickMode="push">-->
<!--    </vue-particles>-->
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: "Front",


        data() {
            return {
                bgImg: {
                    backgroundImage: "url('http://localhost:9099/file/72d54efca95b43468029416b1929be3f.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                },
            }
        }
    }


</script>

<style>

/*  #particles-js {
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;
  }*/
</style>
