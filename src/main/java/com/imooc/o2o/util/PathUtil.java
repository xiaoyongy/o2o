package com.imooc.o2o.util;

/**
 * Created by Engine on 2020/7/22.
 **/
public class PathUtil {
    private static String seperator = System.getProperty("file.separator");

    public static String getImgBasePath(){
        String os = System.getProperty("os.name");
        String basePath = "";
        if(os.toLowerCase().startsWith("win")){
            basePath = "D:/projectdecO2o/image/";
        }else{
            basePath = "/home/xiaolong/image/";
        }
        basePath = basePath.replace("/", seperator);
        return basePath;
    }
    public static String getShopImagePath(long shopId){
        String imagePath = "upload/item/shop" + shopId + "/";
        return imagePath.replace("/", seperator);
    }
}
