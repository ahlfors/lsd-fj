/**
 * @author lsz
 * @desc app1操控关系表
 * @rules
 *   viewId: {  --------------------------- 视图唯一ID  视图级别:一级视图:xx; 二级视图:xx yy; 三级视图 xx yy zz
 *      desc: '移动',  ---------------------- 业务信息
 *      viewName: 'MobileMain', ------------ 视图组件名
 *      [opts]: { -------------------------- 视图操作关系 [无关系不配置]
 *        [up: ''], --------------------------- 向上 [无关系不配置]
 *        [down: ''], -------------------------- 向下 [无关系不配置]
 *        [left: ''], -------------------------- 向左 [无关系不配置]
 *        [right: ''], ------------------------- 向右 [无关系不配置]
 *        [ok: ''] ----------------------------- 确认(下钻,弹窗视图ID) [无关系不配置]
 *      }
 *     }
 */
export default {
  'x01': {
    desc: '一级网络规模',
    viewName: 'TraditionalTopTwo',
    opts: {
      right: '02',
      down: '01',
      ok: 'x0101'
    }
  },
  '01': {
    desc: '一级业务规模',
    viewName: 'businessScale',
    opts: {
      up: 'x01',
      right: '02',
      ok: '0102'
    }
  },
  '0102': {
    desc: '流量',
    viewName: 'scale',
    opts: {
      down: '0103',
      right: '0104',
      ok: '0102'
    }
  },
  '0103': {
    desc: '话务量',
    viewName: 'scale',
    opts: {
      up: '0102',
      right: '0104',
      down: 'X0104',
      ok: '0103'
    }
  },
  'X0104': {
    desc: 'CMNET',
    viewName: 'scale',
    opts: {
      up: '0103',
      right: 'X010401',
      ok: 'X010401'
    }
  },
  'X010401': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X0104',
      right: 'X010402'
    }
  },
  'X010402': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010401',
      right: 'X010403'
    }
  },
  'X010403': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010402',
      right: 'X010404'
    }
  },
  'X010404': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010403',
      right: 'X010405'
    }
  },
  'X010405': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010404',
      right: 'X010406'
    }
  },
  'X010406': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010405',
      right: 'X010407'
    }
  },
  'X010407': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010406',
      right: 'X010408'
    }
  },
  'X010408': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010407',
      right: 'X010409'
    }
  },
  'X010409': {
    desc: 'CMNET二级',
    viewName: 'Cmnet.vue',
    opts: {
      left: 'X010408'
    }
  },
  '0104': {
    desc: '地市话务量流量',
    viewName: 'scale',
    opts: {
      down: '0105',
      left: '0102',
      ok: '0104'
    }
  },
  '0105': {
    desc: '历史话务量流量',
    viewName: 'scale',
    opts: {
      up: '0104',
      left: '0102',
      down: '0106',
      ok: '0105'
    }
  },
  '0106': {
    desc: '历史话务量流量',
    viewName: 'scale',
    opts: {
      up: '0105',
      left: '0102',
      ok: '0106'
    }
  },
  '02': {
    desc: '一级漫游',
    viewName: 'roamMain',
    opts: {
      ok: '0201',
      left: '01',
      right: '0701',
      down: '03'
    }
  },
  '0201': {
    desc: '国际(福建)',
    viewName: 'roamIn',
    opts: {
      down: '0202',
      right: '0206'
    }
  },
  '0202': {
    desc: '国际(厦门)',
    viewName: 'roamIn',
    opts: {
      up: '0201',
      ok: '0202',
      down: '0203',
      right: '0206'
    }
  },
  '0203': {
    desc: '省际(福建)',
    viewName: 'roamIn',
    opts: {
      up: '0202',
      ok: '0203',
      down: '0204',
      right: '0206'
    }
  },
  '0204': {
    desc: '省际(厦门)',
    viewName: 'roamIn',
    opts: {
      up: '0203',
      ok: '0204',
      down: '0205',
      right: '0206'
    }
  },
  '0205': {
    desc: '省内(厦门)',
    viewName: 'roamIn',
    opts: {
      up: '0204',
      ok: '0205',
      right: '0206'
    }
  },
  '0206': {
    desc: '漫入',
    viewName: 'roamIn',
    opts: {
      left: '0201',
      right: '0207'
    }
  },
  '0207': {
    desc: '漫出',
    viewName: 'roamIn',
    opts: {
      left: '0206'
    }
  },
  '03': {
    desc: '一级即时通讯',
    viewName: 'realtimeMain',
    opts: {
      ok: '0301',
      left: '01',
      right: '0701',
      up: '02',
      down: '04'
    }
  },
  '0301': {
    desc: '国内即时通讯',
    viewName: 'realtimeMain',
    opts: {
      ok: '0301',
      right: '0302'
    }
  },
  '0302': {
    desc: '国外即时通讯',
    viewName: 'realtimeMain',
    opts: {
      ok: '0302',
      left: '0301'
    }
  },
  '04': {
    desc: '一级网络安全',
    viewName: 'networkSubMain',
    opts: {
      ok: '0401',
      up: '03',
      right: '0701',
      left: '01'
    }
  },
  '07': {
    desc: '一级页面Gis',
    viewName: 'GisMain',
    opts: {
      down: '0701',
      right: '10',
      left: '02'
    }
  },
  '07c08': {
    desc: '局楼二级页面',
    viewName: 'HotelTool',
    opts: {
      ok: '07c080',
      left: '07c080'
    }
  },
  '07c0800': {
    desc: '局楼二级页面',
    viewName: 'HotelTool',
    opts: {
      left: '07c080',
      down: '07c0801'
    }
  },
  '07c0801': {
    desc: '局楼二级页面',
    viewName: 'HotelTool',
    opts: {
      left: '07c080',
      up: '07c0800'
    }
  },
  '0701': {
    desc: '热图 - 人流量',
    viewName: 'GisMain',
    opts: {
      down: '0702',
      right: '10',
      left: '02'
    }
  },
  '0702': {
    desc: '热图 - 话务量',
    viewName: 'GisMain',
    opts: {
      up: '0701',
      down: '0703',
      right: '10',
      left: '02'
    }
  },
  '0703': {
    desc: '热图 - 流量',
    viewName: 'GisMain',
    opts: {
      up: '0702',
      down: 'x0704',
      right: '10',
      left: '02'
    }
  },
  'x0704': {
    desc: '热图 - 政务网流量',
    viewName: 'GisMain',
    opts: {
      up: '0703',
      down: 'x0705',
      right: '10',
      left: '02'
    }
  },
  'x0705': {
    desc: '热图 - 政务网流量',
    viewName: 'GisMain',
    opts: {
      up: 'x0704',
      down: 'x0706',
      right: '10',
      left: '02'
    }
  },
  'x0706': {
    desc: '热图 - 政务网流量',
    viewName: 'GisMain',
    opts: {
      up: 'x0705',
      down: '08',
      right: '10',
      left: '02'
    }
  },
  '08': {
    desc: 'Map / Gis 图层切换',
    viewName: 'GisMain',
    opts: {
      up: 'x0704',
      down: '09'
    }
  },
  '09': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '08',
      ok: '0901'
    }
  },
  '0901': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      down: '0902',
      right: '0905'
    }
  },
  '0902': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0901',
      down: '0903',
      right: '0906'
    }
  },
  '0903': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0902',
      down: '0904',
      right: '0907'
    }
  },
  '0904': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0903',
      down: '09',
      right: '0908'
    }
  },
  '0905': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      down: '0906',
      left: '0901',
      right: '0909'
    }
  },
  '0906': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0905',
      down: '0907',
      left: '0902',
      right: '0910'
    }
  },
  '0907': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0906',
      down: '0908',
      left: '0903',
      right: '0911'
    }
  },
  '0908': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0907',
      down: '09',
      left: '0904',
      right: '0912'
    }
  },
  '0909': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      down: '0910',
      left: '0905'
    }
  },
  '0910': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0909',
      down: '0911',
      left: '0906'
    }
  },
  '0911': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0910',
      down: '0912',
      left: '0907'
    }
  },
  '0912': {
    desc: '打点图层切换开关',
    viewName: 'GisMain',
    opts: {
      up: '0911',
      left: '0908',
      down: '09'
    }
  },
  '10': {
    desc: '一级3D场馆',
    viewName: 'scale',
    opts: {
      left: '0701',
      ok: '1001'
    }
  },
  '1001': {
    desc: '国际会议展览中心',
    viewName: 'Map',
    opts: {
      left: '10',
      down: '1002'
    }
  },
  '1002': {
    desc: '国际会议中心',
    viewName: 'Map',
    opts: {
      left: '10',
      down: '1003',
      up: '1001'
    }
  },
  '1003': {
    desc: '国际会展酒店',
    viewName: 'Map',
    opts: {
      left: '10',
      down: '1004',
      up: '1002'
    }
  },
  '1004': {
    desc: '海悦山庄酒店',
    viewName: 'Map',
    opts: {
      left: '10',
      down: '1005',
      up: '1003'
    }
  },
  '1005': {
    desc: '闽南大戏院',
    viewName: 'Map',
    opts: {
      left: '10',
      down: '1006',
      up: '1004'
    }
  },
  '1006': {
    desc: '厦门高崎国际机场',
    viewName: 'Map',
    opts: {
      left: '10',
      down: '1007',
      up: '1005'
    }
  },
  '1007': {
    desc: '市政府',
    viewName: 'Map',
    opts: {
      left: '10',
      down: '1008',
      up: '1006'
    }
  },
  '1008': {
    desc: '阶段场馆',
    viewName: 'Map',
    opts: {
      left: '10',
      up: '1007',
      ok: '100303'
    }
  },
  '100301': {
    desc: '接机',
    viewName: 'Meetingcenter',
    opts: {
      right: '100306',
      down: '100302'
    }
  },
  '100302': {
    desc: '文艺汇演',
    viewName: 'Meetingcenter',
    opts: {
      right: '100306',
      up: '100301',
      down: '100303'
    }
  },
  '100303': {
    desc: '会议',
    viewName: 'Meetingcenter',
    opts: {
      right: '100306',
      up: '100302',
      down: '100304'
    }
  },
  '100304': {
    desc: '夫人活动',
    viewName: 'Meetingcenter',
    opts: {
      right: '100306',
      up: '100303',
      down: '100305'
    }
  },
  '100305': {
    desc: '送机',
    viewName: 'Meetingcenter',
    opts: {
      right: '100306',
      up: '100304'
    }
  },
  '100306': {
    desc: '场馆1',
    viewName: 'Meetingcenter',
    opts: {
      left: '100301',
      down: '100307',
      right: '100310'
    }
  },
  '100307': {
    desc: '场馆2',
    viewName: 'Meetingcenter',
    opts: {
      left: '100301',
      up: '100306',
      down: '100308',
      right: '100310'
    }
  },
  '100308': {
    desc: '场馆3',
    viewName: 'Meetingcenter',
    opts: {
      left: '100301',
      up: '100307',
      right: '100310'
    }
  },
  '100309': {
    desc: '场馆3',
    viewName: 'Meetingcenter',
    opts: {
      left: '100306',
      up: '100310'
    }
  },
  '100310': {
    desc: '标题',
    viewName: 'Meetingcenter',
    opts: {
      left: '100306',
      up: '100306',
      down: '100309'
    }
  }
}
