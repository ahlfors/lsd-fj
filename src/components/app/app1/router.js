export default [{
  path: 'traditional/scale',
  name: 'traditional/scale',
  component: r => require.ensure([], () => r(require('./views/traditional/scale/ScaleMain.vue')), `app/app1/views/traditional/scale/ScaleMain`)
},
{
  path: 'traditional/netScale',
  name: 'traditional/netScale',
  component: r => require.ensure([], () => r(require('./views/traditional/netScale/NetScaleMain.vue')), `app/app1/views/traditional/netScale/NetScaleMain`)
},
{
  path: 'roam/roamIn',
  name: 'roam/roamIn',
  component: r => require.ensure([], () => r(require('./views/roam/roamIn/RoamInMain.vue')), `app/app1/views/roam/roamIn/RoamInMain`)
},
{
  path: 'network/networkSub',
  name: 'network/networkSub',
  component: r => require.ensure([], () => r(require('./views/network/networkSub/NetworkSubMain.vue')), `app/app1/views/network/networkSub/NetworkSubMain`)
},
{
  path: 'network/networkIds',
  name: 'network/networkIds',
  component: r => require.ensure([], () => r(require('./views/network/networkIds/NetworkIds.vue')), `app/app1/views/network/networkIds/NetworkIds`)
},
{
  path: 'network/networkDdos',
  name: 'network/networkDdos',
  component: r => require.ensure([], () => r(require('./views/network/networkDdos/networkDdos.vue')), `app/app1/views/network/networkDdos/networkDdos`)
},
{
  path: 'RealTimeSub/RealTimeSubMain',
  name: 'RealTimeSub/RealTimeSubMain',
  component: r => require.ensure([], () => r(require('./views/realtime/RealTimeSub/RealTimeSubMain.vue')), `app/app1/views/realtime/RealTimeSub/RealTimeSubMain`)
},
{
  path: 'StageScene/StageSceneMain',
  name: 'StageScene/StageSceneMain',
  component: r => require.ensure([], () => r(require('./views/venues/StageScene/StageSceneMain.vue')), `app/app1/views/venues/StageScene/StageSceneMain`)
}
]
