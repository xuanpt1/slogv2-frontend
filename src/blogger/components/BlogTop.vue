<template>
  <div class="round-avatars">
    <div class="top-menu"></div>

    <div class="blog-background"></div>
    <div id="masthead" ref="masthead" :class="['overlay','blog-ani','from-bottom',{'animation-on':animationOn}]" itemprop="brand">
        <div class="site-branding text-center">
          <img src="@/assets/img/Head.png" class="custom-logo avatar">
          <h3 class="blog-description"><p>{{description}}</p></h3>
        </div>
      </div>
    <div class="animation-header">
      <div class="decor-wrapper">

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name:'blogTop',
  data(){
    return{
      animationOn:false,
      description:'You so reader, is your life~',

    }
  },
  create(){
    this.$nextTick(()=>{
      setTimeout(()=>{
        this.animationOn = true
      },500)
    })
  },
  mounted() {

  }

}
</script>

<style lang="scss" scoped>
.round-avatars .avatar,
.round-avatars .avatar img {
  border-radius: 50%;
  box-shadow:  0 5px 15px -5px #333;;
}
.avatar,
.avatar img {
  border-radius: 3px;
}
.custom-logo {
  display: inline-block;
  width: 100px;
  transition: all .6s;
  &:hover {
    transition:all .5s;
    transform:rotate(360deg);
    -ms-transform:rotate(360deg); 	/* IE 9 */
    -moz-transform:rotate(360deg); 	/* Firefox */
    -webkit-transform:rotate(360deg); /* Safari �� Chrome */
    -o-transform:rotate(350deg); 	/* Opera */
  }
}
#masthead {
  top:50px;
  position: relative;
  z-index: 2;
  display: block;
  color: #fff;
  text-align: center;
  width: 100%;
  height: 250px;
  box-sizing: border-box;
}

.top-menu{

}

.blog-background{
  position: fixed;
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/img/background/bg05.jpg");
  background-position: top center;
  background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
  z-index: -999;
}
.blog-description{
  text-transform: none;
  font-weight: 400;
}
.decor-wrapper{
  height: 0px;
}

</style>
