package com.imooc.o2o.exception;

/**
 * Created by Engine on 2020/7/23.
 **/
public class ShopOperationException extends RuntimeException {
    /**
     * 添加一个序列化的值
     */
    private static final long serialVersionUID = 2361446886822298905L;

    public ShopOperationException(String msg){
        super(msg);
    }
}
