<!--天气及电视-->
<template>
  <viewTemplate class="others">
    <div class="right-video">
      <div class="video-1">
        <!--<img src="../../assets/img/venues/video1.png" alt="视频">-->
        <div style="width: 100%; height: 100%;">
          <object width='302' height='210' id='SampleMediaPlayback1' name='SampleMediaPlayback' type='application/x-shockwave-flash' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'>
            <param name='movie' value='static/swf/SampleMediaPlayback.swf' />
            <param name='quality' value='high' />
            <param name='bgcolor' value='#000000' />
            <param name='allowfullscreen' value='true' />
            <param name='flashvars' value= '&src=rtmp://10.209.16.208/live/jt&autoHideControlBar=true&streamType=live&autoPlay=true&verbose=true'/>
            <embed src='static/swf/SampleMediaPlayback.swf'
                   width='302' height='210'
                   id='SampleMediaPlayback11'
                   quality='high'
                   bgcolor='#000000'
                   name='SampleMediaPlayback'
                   allowFullscreen='true'
                   pluginspage='http://www.adobe.com/go/getflashplayer'
                   flashvars='&src=rtmp://10.209.16.208/live/jt&autoHideControlBar=true&streamType=live&autoPlay=true&verbose=true'
                   type='application/x-shockwave-flash'>
            </embed>
          </object>
        </div>
      </div>
      <div class="video-2">
        <!--<img src="../../assets/img/venues/video2.png" alt="视频">-->
        <div style="width: 100%; height: 100%;">
          <object width='302' height='210' id='SampleMediaPlayback2' name='SampleMediaPlayback' type='application/x-shockwave-flash' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'>
            <param name='movie' value='static/swf/SampleMediaPlayback.swf' />
            <param name='quality' value='high' />
            <param name='bgcolor' value='#000000' />
            <param name='allowfullscreen' value='true' />
            <param name='flashvars' value= '&src=rtmp://10.209.16.208/live/fj&autoHideControlBar=true&streamType=live&autoPlay=true&verbose=true'/>
            <embed src='static/swf/SampleMediaPlayback.swf'
                   width='302' height='210'
                   id='SampleMediaPlayback21'
                   quality='high'
                   bgcolor='#000000'
                   name='SampleMediaPlayback'
                   allowFullscreen='true'
                   pluginspage='http://www.adobe.com/go/getflashplayer'
                   flashvars='&src=rtmp://10.209.16.208/live/fj&autoHideControlBar=true&streamType=live&autoPlay=true&verbose=true'
                   type='application/x-shockwave-flash'>
            </embed>
          </object>
        </div>
      </div>
      <div class="video-3">
        <!--<img src="../../assets/img/venues/video3.png" alt="视频">-->
        <!--<embed src="http://tv.people.com.cn/img/2010tv_flash/liveplayer.swf?liveInfo=5,cctv13"
               quality="high" width="302" height="200"
               allowScriptAccess="sameDomain"
               allowFullScreen="false"
               type="application/x-shockwave-flash">
        </embed>-->
        <div style="width: 100%; height: 100%;">
          <object width='302' height='210' id='SampleMediaPlayback3' name='SampleMediaPlayback' type='application/x-shockwave-flash' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'>
            <param name='movie' value='static/swf/SampleMediaPlayback.swf' />
            <param name='quality' value='high' />
            <param name='bgcolor' value='#000000' />
            <param name='allowfullscreen' value='true' />
            <param name='flashvars' value= '&src=rtmp://10.209.16.208/live/cctv13&autoHideControlBar=true&streamType=live&autoPlay=true&verbose=true'/>
            <embed src='static/swf/SampleMediaPlayback.swf'
                   width='302' height='210'
                   id='SampleMediaPlayback31'
                   quality='high'
                   bgcolor='#000000'
                   name='SampleMediaPlayback'
                   allowFullscreen='true'
                   pluginspage='http://www.adobe.com/go/getflashplayer'
                   flashvars='&src=rtmp://10.209.16.208/live/cctv13&autoHideControlBar=true&streamType=live&autoPlay=true&verbose=true'
                   type='application/x-shockwave-flash'>
            </embed>
          </object>
        </div>
      </div>
      <div class="weather">
        <div>
          <div class="list-item">
            <span class="weather-icon" :class="weatherData['xm']['className']"></span>
            <span>厦门</span>
          </div>
          <div class="list-item">
            <span>{{weatherData.xm.info}}</span>
            <span class="temperature">{{weatherData.xm.lTemperature}}~{{weatherData.xm.hTemperature}}°C</span>
          </div>
        </div>
      </div>
    </div>
  </viewTemplate>
</template>
<script>
  import './other.scss';
  export default {
    data() {
      return {
        weatherData: {
          xm: {
            info: '',
            hTemperature: '',
            lTemperature: '',
            className: ''
          }
        }
      }
    },
    mounted() {
      this.initWeather();
    },
    methods: {
      initWeather() {
        this.$http.indi.get('f0098', {}, (res1) => {
          if (res1.data && res1.data.data && res1.data.data.length !== 0) {
            let myData = res1.data.data[0];
            this.weatherData['xm'] = {
              info: myData['D_W_PHENOMENA'],
              hTemperature: myData['H_TEMPERATURE'].substring(myData['H_TEMPERATURE'].length - 3, myData['H_TEMPERATURE'].length - 1),
              lTemperature: myData['L_TEMPERATURE'].substring(myData['L_TEMPERATURE'].length - 3, myData['L_TEMPERATURE'].length - 1),
              className: myData['WEATHER_ALIAS']
            }
          }
        });
      }
    }
  }
</script>
