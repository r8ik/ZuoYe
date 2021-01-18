// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId:"", // 商品id
    pagenum:1, // 页码
    pagesize:10, // 页数
    shopList:[], // 数据
    total:0, // 数据总量
    scrollFlag:true // 是否可以滚动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopId:options.id
    })
    this.getShopList();
  },
  // 获取商品数据
  getShopList() {
    // 显示 loading 提示框
    wx.showLoading({
      title: '加载中',
    })
    // 加载中页面不能滚动
    this.setData({
      scrollFlag:false
    })
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/goods/search',
      data:{
        cid:_this.data.shopId,
        pagenum:_this.data.pagenum,
        pagesize:_this.data.pagesize
      },
      success(res) {
        // 隐藏 loading 提示框
        wx.hideLoading();
        const {message} = res.data;
        _this.setData({
          shopList:message.goods,
          total:message.total,
          scrollFlag:true // 加载完毕 设置页面可以滚动
        })
      }
    })
  },
  // 滚动到底时触发的方法
  loading(){
    const _this = this
    // 当拿到的数据量小于总数据量时就加10条，并重新调用获取数据方法  懒加载
    if(this.data.pagesize<this.data.total) {
      this.setData({
        pagesize: _this.data.pagesize+10
      })
      this.getShopList();
    }else { // 否则提示数据加载完毕
      wx.showToast({
        title: '数据加载完毕',  // 标题
        duration: 1500   // 提示窗停留时间，默认1500ms
    })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})