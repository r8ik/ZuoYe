// js文件
// var sy;//记录手指的y坐标
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carouselList:[],
    navList:[],
    floordata:[],
    // desc: '',//刷新提示语
    // hei: 0,//刷新view高度阈值
    // scrolltop: 0,//scorll-view滑动离顶部的距离
    // isindrag: false,//是否在下拉状态（必须要滑动到顶部才能触发）
    // scrollTop:0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarouseData();
    this.getNavData();
    this.getFloorData();
  },
  // 获取轮播图数据
  getCarouseData() {
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
      success(res) {
        const {message} = res.data;
        // 因为返回参数和实际文件路径不一致，所以截取?号后的id重新赋值
        for (let i = 0; i < message.length; i++) {
          message[i].navigator_url =  message[i].navigator_url.split('?')[1]
        }
        _this.setData({
          carouselList:message
        })
      }
    });
  },
  // 获取导航栏数据
  getNavData() {
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/catitems',
      success(res) {
        const {message} = res.data;
        _this.setData({
          navList:message
        })
      }
    });
  },
  // 获取商品楼层数据
  getFloorData(){
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/floordata',
       success(res) {
        const {message} = res.data;
        _this.setData({
          floordata:message
        })
      }
    })
  },

  // start(e) {
  //   //记录手指触摸是的y坐标
  //   sy = e.touches[0].clientY   
  // },
  // move(e) {
  //   //计算手指滑动的距离
  //   var delta = e.touches[0].clientY - sy
  //   //scorll-view滑动到顶部且继续向上滑动时，走scorll-view滑动流程
  //   if(this.data.hei <= 0 && delta <= 0){
  //     return
  //   }
  //   //scorll-view已经滑动到顶部，继续下拉进入下拉状态
  //   if (this.data.scrolltop <= 0){
  //     if (this.data.isindrag == false){
  //       this.setData({
  //         isindrag: true
  //       })
  //     }
  //     var tempdelta = 0
  //     if(delta > 0){//手指向下滑动
  //       if (this.data.hei > 50) {//触发阈值，更改状态
  //         this.setData({
  //           desc: '松开刷新'
  //         })
  //         tempdelta = this.data.hei + delta / (this.data.hei - 50)//增大下拉阻尼感
  //       } else {
  //         this.setData({
  //           desc: ''
  //         })
  //         //手指移动未到阈值，按正常滑动增加高度
  //         tempdelta = this.data.hei + delta
  //       }
  //     } else {//手指向上滑动
  //       tempdelta = this.data.hei + delta
  //       //刷新状态view最小为0
  //       if(tempdelta <= 0){
  //         tempdelta = 0
  //       }
  //       if(tempdelta < 50){
  //         this.setData({
  //           desc: ''
  //         })
  //       }else {
  //         this.setData({
  //           desc: '松开刷新'
  //         })
  //       }
  //     }
  //     //滑动完成设置刷新view高度
  //     this.setData({
  //       hei: tempdelta
  //     })
  //   }
  //   //每次滑动事件后记录y坐标
  //   sy = e.touches[0].clientY
  // },
  // end(e) {
  //   const _this = this;
  //   let query = wx.createSelectorQuery()
  //     query.select('#scroll').boundingClientRect((rect) => {
  //     _this.setData({
  //       scrollTop:rect.top
  //     })
  //   }).exec()
  //   //手指离开时，如果阈值大于等于50，则触发刷新
  //   console.log(this.data.scrollTop)
  //   if(this.data.hei >= 50 && this.data.scrollTop==50 || this.data.scrollTop == 0){
  //     wx.showNavigationBarLoading();
  //     this.setData({
  //       desc: '正在刷新...'
  //     })
  //     this.setData({
  //       hei: 50
  //     })
  //     //模拟耗时操作，2秒后恢复正常状态
  //     setTimeout(function () {
  //       sy = 0
  //       _this.setData({
  //         desc: '刷新成功',
  //         hei: 50,
  //       })
  //       wx.hideNavigationBarLoading()
  //       _this.onLoad();
  //       setTimeout(function() {
  //         _this.setData({
  //           desc: '',
  //           hei: 0,
  //           isindrag: false,
  //           scrolltop: 0
  //         })
  //       },1000)
  //     }, 2000)
  //   }else{//未下拉到阈值，松开时则收起刷新view
  //     sy = 0
  //     _this.setData({
  //       desc: '',
  //       hei: 0,
  //       isindrag: false,
  //       scrolltop: 0
  //     })
  //   }
  // },
  // scorll(e) {
  //   //未进入下拉状态时，记录scorll-view滑动距离顶部的距离
  //   var st = e.detail.scrollTop
  //   if (this.data.isindrag == false){
  //     this.setData({
  //       scrolltop: st
  //     })
  //   }
  // }
})