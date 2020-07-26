/**
 *
 **/
$(function () {
    var shopId = getQueryString('shopId');
    var isEdit = shopId ? true : false;
    var initUrl = '/o2o_war/shopadmin/getshopinitinfo';
    var registerShopUrl = '/o2o_war/shopadmin/registershop';
    var shopInfoUrl = '/o2o_war/shopadmin/getshopbyid?shopId=' + shopId;
    var editShopUrl = '/o2o_war/shopadmin/modifyshop';
    // alert(initUrl + "加载了");
    if (!isEdit) {
        getShopInitInfo();
    } else {
        getShopInfo(shopId);
    }

    function getShopInfo(shopId) {
        $.getJSON(shopInfoUrl, function (data) {
            if (data.success) {
                var shop = data.shop;
                $('#shop-name').val(shop.shopName);
                $('#shop-addr').val(shop.shopAddr);
                $('#shop-phone').val(shop.phone);
                $('#shop-desc').val(shop.shopDesc);
                var shopCategory = '<option data-id="' + shop.shopCategory.shopCategoryId + '" selected>'
                    + shop.shopCategory.shopCategoryName + '</option>';
                var tempAreaHtml = '';
                data.areaList.map(function (value) {
                    tempAreaHtml += '<option data-id="' + value.areaId + '">'
                        + value.areaName + '</option>';
                });
                $('#shop-category').html(shopCategory);
                $('#shop-category').attr('disabled', 'disabled');
                $('#area').html(tempAreaHtml);
                $("#area option[data-id='" + shop.area.areaId + "']").attr("selected", "selected");
            }
        });
    }

    function getShopInitInfo() {
        $.getJSON(initUrl, function (data) {    //回调函数
            console.info("---------data----------:" + data.shopCategoryList);
            if (data.success) {
                var tempHtml = '';
                var tempAreaHtml = '';
                // alert("2");
                data.shopCategoryList.map(function (value) {
                    tempHtml += '<option data-id="' + value.shopCategoryId + '">' +
                        value.shopCategoryName + '</option>';
                });
                // data.shopCategoryList.map(function (item, index) {
                //     tempHtml += '<option data-id="' + item.shopCategoryId + '">' +
                //         item.shopCategoryName + '</option>';
                // });
                data.areaList.map(function (item, index) {
                    tempAreaHtml += '<option data-id="' + item.areaId + '">'
                        + item.areaName + '</option>';
                });
                // alert("成功加载了");
                $('#shop-category').html(tempHtml);
                $('#area').html(tempAreaHtml);
            }
        });
    }
    $('#submit').click(function () {
        var shop = {};
        if (isEdit){
            shop.shopId = shopId;
        }
        shop.shopName = $('#shop-name').val();
        shop.shopAddr = $('#shop-addr').val();
        shop.phone = $('#shop-phone').val();
        shop.shopDesc = $('#shop-desc').val();
        shop.shopCategory = {
            shopCategoryId: $('#shop-category').find('option').not(function () {
                return !this.selected;
            }).data('id')
        };
        shop.area = {
            areaId: $('#area').find('option').not(function () {
                return !this.selected;
            }).data('id')
        };
        var shopImg = $('#shop-img')[0].files[0];
        var formData = new FormData();
        formData.append('shopImg', shopImg);
        formData.append('shopStr', JSON.stringify(shop));
        var verifyCodeActual = $('#j_captcha').val();
        if (!verifyCodeActual) {
            $.toast('请输入验证码！');
            return;
        }
        formData.append('verifyCodeActual', verifyCodeActual);
        $.ajax({
            url: isEdit ? editShopUrl : registerShopUrl,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    $.toast('提交成功！');
                } else {
                    $.toast('提交失败！!' + data.errMsg);
                }
                $('captcha_img').click();
            }
        });
    });
});
