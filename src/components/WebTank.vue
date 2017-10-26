<template>
    <div>
        <md-layout md-align="center">
            <md-card md-align="center">
                <md-card-media>
                    <img :src="videoHost" class="video">
                </md-card-media>
                <md-layout md-align="center">
                    <md-card-content>
                        <md-layout>
                            <md-button class="md-raised md-warn"
                                       :class="{ active: aIsActive }"
                                       v-on:mousedown.native="funcA('on')"
                                       v-on:mouseup.native="funcA('off')">&uarr; (a)
                            </md-button>
                        </md-layout>
                        <md-layout>
                            <md-button class="md-raised md-warn"
                                       :class="{ active: zIsActive }"
                                       v-on:mousedown.native="funcZ('on')"
                                       v-on:mouseup.native="funcZ('off')">&darr; (z)
                            </md-button>
                        </md-layout>
                    </md-card-content>
                    <md-card-content>
                        <md-layout>
                            <md-button class="md-raised md-warn"
                                       :class="{ active: sIsActive }"
                                       v-on:mousedown.native="funcS('on')"
                                       v-on:mouseup.native="funcS('off')">&uarr; (s)
                            </md-button>
                        </md-layout>
                        <md-layout>
                            <md-button class="md-raised md-warn"
                                       :class="{ active: xIsActive }"
                                       v-on:mousedown.native="funcX('on')"
                                       v-on:mouseup.native="funcX('off')">&darr; (x)
                            </md-button>
                        </md-layout>
                    </md-card-content>
                </md-layout>
            </md-card>
            <md-card >
                <md-card-content>
                    <h5>Camera position:</h5>
                    <div>
                        <md-button class="md-raised md-primary" v-on:mousedown.native="moveCamToPos1()">Pos1</md-button>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary" v-on:mousedown.native="moveCamToPos2()">Pos2</md-button>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary" v-on:mousedown.native="moveCamToPos3()">Pos3</md-button>
                    </div>
                </md-card-content>
            </md-card>
        </md-layout>
    </div>
</template>

<script>

  export default {
    name: 'webtank',
    data () {
      return {
        videoHost: process.env.VIDEO_HOST,
        ws: null,
        aIsActive: false,
        sIsActive: false,
        zIsActive: false,
        xIsActive: false,
        keyCode: {
          A: 65,
          S: 83,
          Z: 90,
          X: 88
        }
      }
    },
    methods: {
      wasKeyDown: function (e) {
        this.keyAction(e, 'on')
      },
      wasKeyUp: function (e) {
        this.keyAction(e, 'off')
      },
      keyAction: function (e, type) {
        if (e.keyCode === this.keyCode.A) this.funcA(type)
        if (e.keyCode === this.keyCode.S) this.funcS(type)
        if (e.keyCode === this.keyCode.Z) this.funcZ(type)
        if (e.keyCode === this.keyCode.X) this.funcX(type)
      },
      funcA: function (a) {
        this.ws.send('leftCat-forward-' + a)
        this.aIsActive = Boolean(a)
      },
      funcS: function (s) {
        this.ws.send('rightCat-forward-' + s)
        this.sIsActive = Boolean(s)
      },
      funcZ: function (z) {
        this.ws.send('leftCat-backward-' + z)
        this.zIsActive = Boolean(z)
      },
      funcX: function (x) {
        this.ws.send('rightCat-backward-' + x)
        this.xIsActive = Boolean(x)
      },
      moveCamToPos1: function () {
        console.log('moveCamToPos1')
        this.ws.send('servoCam-pos1')
      },
      moveCamToPos2: function () {
        this.ws.send('servoCam-pos2')
      },
      moveCamToPos3: function () {
        this.ws.send('servoCam-pos3')
      }
    },
    created: function () {
      this.ws = new WebSocket(process.env.WS_REMOTE_HOST, 'protocolOne')
      window.addEventListener('keydown', this.wasKeyDown)
      window.addEventListener('keyup', this.wasKeyUp)
    }
  }
</script>

<style scoped>
    img.video {
        max-width: 400px;
        max-height: 400px;
    }
</style>
