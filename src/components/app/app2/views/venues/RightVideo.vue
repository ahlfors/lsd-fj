<template>
 <div class="right-video">
    <div class="video-1">
        <img src="../../assets/img/venues/video1.png" alt="视频">
    </div>
    <div class="video-2">
        <img src="../../assets/img/venues/video2.png" alt="视频">
    </div>
    <div class="video-3">
        <img src="../../assets/img/venues/video3.png" alt="视频">
    </div>
    <div class="weather">
        <div class="city1">
            <div class="list-item">
                <span class="weather-icon">多云</span>
                <span>厦门</span>
            </div>
            <div class="list-item">
                <span>多云</span>
                 <span class="temperature">16~36℃</span>
            </div>
        </div>
        <div class="city2">
            <div class="list-item">
                <span class="weather-icon">多云</span>
                <span>福州</span>
            </div>
            <div class="list-item">
                <span>多云</span>
                <span class="temperature">16~36℃</span>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
export default {
  methods: {
  }
}
</script>
<style rel = "stylesheet/scss" lang="scss">
    .right-video{
        width: 312px;
        height: 912px;
        position: absolute;
        right: 0px;
        top: 28px;
        >div{
            width: 302px;
            height: 200px;
            border-radius: 18px;
            margin-bottom: 32px;
            overflow: hidden;
        }
        .video-1{
            margin-left: 3px;
        }
        .weather{
           padding: 28px 68px 25px 52px;
               >div{
                width: 200px;
                height: 70px;
              }
              .list-item{
                    height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    color: #fff;
                    font-size: 24px;
                }
             .temperature{
                 color: #fbf972;
                 margin-left: 15px;
             }
             .weather-icon{
                 display: inline-block;
                 width: 48px;
                 height: 31px;
                 margin-right: 15px;
             }
        }
        
    }
</style>