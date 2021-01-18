// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoriesList:[],
    categoriesIndex:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategories();
  },
  // 获取分类数据
  getCategories(){
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/categories',
      success(res) {
        const {message} = res.data;
        _this.setData({
          categoriesList:message,
          scrollTop:0
        })
      }
    });
  },
  handleChoice(event) {
    this.setData({
      categoriesIndex:event.currentTarget.dataset.index,
      scrollTop:0
    })
  },
  handleJumpShopList(event) {
    wx.navigateTo({
      url: '/pages/goods_list/goods_list?id='+event.currentTarget.dataset.id
    })
  }
})