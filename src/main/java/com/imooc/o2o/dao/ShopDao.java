package com.imooc.o2o.dao;

import com.imooc.o2o.entity.Shop;

/**
 * Created by Engine on 2020/7/22.
 **/
public interface ShopDao {
    /**
     * 通过shopid查询店铺
     * @param shopId
     * @return
     */
    Shop queryByShopId(long shopId);
    /**
     * 新增店铺
     * @param shop
     * @return
     */
    int insertShop(Shop shop);

    /**
     * 更新店铺
     * @param shop
     * @return
     */
    int updateShop(Shop shop);
}
