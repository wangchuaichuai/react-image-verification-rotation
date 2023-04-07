/**
 * @Author       : 王欣 2750774003@qq.com
 * @Date         : 2023-04-03 14:48:52
 * @LastEditors  : wangchuaichuai 2750774003@qq.com
 * @LastEditTime : 2023-04-06 20:27:18
 * @Description  :
 * @FilePath     : App
 */
import React, { useState, useEffect, useRef } from 'react';
import './index.css';
var fin = Math.round(Math.random() * (150 - -150) + -150);
var ImageVerification = function (_a) {
    var src = _a.src, _b = _a.offsetAngleTemp, offsetAngleTemp = _b === void 0 ? 0 : _b, onSuccess = _a.onSuccess, onFailer = _a.onFailer, _c = _a.imgShow, imgShow = _c === void 0 ? true : _c, _d = _a.width, width = _d === void 0 ? 350 : _d, _e = _a.height, height = _e === void 0 ? 350 : _e, _f = _a.imgWidth, imgWidth = _f === void 0 ? 300 : _f, _g = _a.deviationAngle, deviationAngle = _g === void 0 ? 5 : _g, _h = _a.successText, successText = _h === void 0 ? '验证通过' : _h, _j = _a.failText, failText = _j === void 0 ? '验证失败，未能旋转至正确角度' : _j, _k = _a.initText, initText = _k === void 0 ? '请向右滑动滑块以旋转图片' : _k, CustomButton = _a.CustomButton;
    var _l = useState(!!offsetAngleTemp ? offsetAngleTemp : fin), offsetAngle = _l[0], setOffSetAngle = _l[1];
    var _m = useState(src
        ? src
        : "http://8.142.84.52:5055/public/" + (Math.floor(Math.random() * 9) + 1) + ".jpg"), imageUrl = _m[0], setImageUrl = _m[1];
    var _o = useState(0), sliderPosition = _o[0], setSliderPosition = _o[1];
    var _p = useState(false), isDragging = _p[0], setIsDragging = _p[1];
    var _q = useState(offsetAngle), rotationDegree = _q[0], setRotationDegree = _q[1];
    var _r = useState(false), verificationStatus = _r[0], setVerificationStatus = _r[1];
    var _s = useState(false), faileSuccess = _s[0], setFaileSuccess = _s[1];
    var sliderRef = useRef(null);
    var trackRef = useRef(null);
    // 更新滑块位置
    useEffect(function () {
        if (sliderPosition >=
            trackRef.current.clientWidth - sliderRef.current.clientWidth) {
            setSliderPosition(trackRef.current.clientWidth - sliderRef.current.clientWidth);
        }
        if (sliderPosition <= 0) {
            setSliderPosition(0);
        }
    }, [sliderPosition]);
    // 按下滑块时设置拖拽状态
    var handleMouseDown = function () {
        setIsDragging(true);
    };
    // 松开滑块时取消拖拽状态
    var handleMouseUp = function () {
        setIsDragging(false);
        setFaileSuccess(true);
        var diff = Math.abs(rotationDegree - 360) % 360; // 计算绝对差值
        if (diff < deviationAngle || diff > 360 - deviationAngle) {
            // 允许 5 度误差
            setVerificationStatus(true);
            if (onSuccess)
                setTimeout(function () { return onSuccess(); }, 500);
        }
        else {
            setTimeout(function () {
                if (onFailer)
                    onFailer();
                handleReset();
            }, 500);
        }
    };
    // 移动滑块时更新滑块位置和图片旋转角度
    var handleMouseMove = function (event) {
        if (isDragging && !verificationStatus) {
            // 只有在未通过验证的情况下才允许移动滑块
            var newPosition = event.clientX -
                trackRef.current.getBoundingClientRect().left -
                sliderRef.current.offsetWidth / 2;
            var newAngle = Math.round((newPosition / trackRef.current.getBoundingClientRect().width) * 100) / 90;
            setSliderPosition(newPosition <= 0 ? 0 : newPosition);
            setRotationDegree(newPosition <= 0 ? offsetAngle : offsetAngle + newAngle * 360); // 防止角度溢出
        }
        var track = document.querySelector('.slider-track'); // 获取dom
        if (!!track) {
            var beforeTrack = window.getComputedStyle(track, '::before'); // 获取伪元素
        }
    };
    // 点击重置按钮时重新生成随机角度和验证状态
    var handleReset = function () {
        setSliderPosition(0);
        setIsDragging(false);
        setVerificationStatus(false);
        setFaileSuccess(false);
        if (src) {
            setImageUrl(src);
        }
        else {
            setImageUrl("http://8.142.84.52:5055/public/" + (Math.floor(Math.random() * 9) + 1) + ".jpg");
        }
        setTimeout(function () {
            setVerificationStatus(false);
            var temp = Math.round(Math.random() * (150 - -150) + -150);
            setOffSetAngle(temp);
            setRotationDegree(temp);
        }, 500); // 等待滑块回到最左侧后再重置验证状态
    };
    return (React.createElement("div", { className: "image-verification", style: {
            width: (width < 350 ? 350 : width) + "px",
            height: (height <= imgWidth + 40 + 30 ? 380 : height) + "px",
        } },
        React.createElement("div", { className: "image-container" },
            React.createElement("img", { className: "image", src: imageUrl, alt: "", style: {
                    width: imgWidth + "px",
                    opacity: imgShow ? 0.8 : 0,
                    height: imgWidth + "px",
                    margin: (height - 380 > 0 ? (height - 380) / 2 : 0) + "px " + ((width < 350 ? 350 : width) - imgWidth) / 2 + "px 0",
                } }),
            React.createElement("img", { className: "image-overlay", style: {
                    transform: "rotate(" + rotationDegree + "deg)",
                    left: '20px',
                    top: '20px',
                    width: imgWidth + "px",
                    height: imgWidth + "px",
                    margin: (height - 380 > 0 ? (height - 380) / 2 : 0) + "px " + ((width < 350 ? 350 : width) - imgWidth) / 2 + "px 0",
                }, src: imageUrl }),
            faileSuccess ? (React.createElement("div", { "data-v-273e6401": "", className: "captcha_message", style: {
                    left: '20px',
                    top: '20px',
                    width: imgWidth + "px",
                    height: imgWidth + "px",
                    margin: (height - 380 > 0 ? (height - 380) / 2 : 0) + "px " + ((width < 350 ? 350 : width) - imgWidth) / 2 + "px 0",
                } },
                React.createElement("div", { "data-v-273e6401": "", className: "captcha_message__icon" }, verificationStatus ? (React.createElement("svg", { "data-v-273e6401": "", width: "28", height: "28", viewBox: "0 0 28 28", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("g", { "data-v-273e6401": "", stroke: "#fff", fill: "none" },
                        React.createElement("path", { "data-v-273e6401": "", d: "M22.776 4.073A13.2 13.2 0 0 0 14 .75C6.682.75.75 6.682.75 14S6.682 27.25 14 27.25 27.25 21.318 27.25 14c0-.284-.009-.566-.027-.845" }),
                        React.createElement("path", { "data-v-273e6401": "", d: "M7 12.5l7 7 13-13" })))) : (React.createElement("svg", { className: "icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "p-id": "6147", width: "30", height: "30" },
                    React.createElement("path", { d: "M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128.288C300.416 128.288 128.288 300.416 128.288 512c0 211.552 172.128 383.712 383.712 383.712 211.552 0 383.712-172.16 383.712-383.712C895.712 300.416 723.552 128.288 512 128.288z", fill: "#ffffff", "p-id": "6148" }),
                    React.createElement("path", { d: "M557.056 513.376l138.368-136.864c12.576-12.416 12.672-32.672 0.256-45.248-12.416-12.576-32.704-12.672-45.248-0.256l-138.56 137.024-136.448-136.864c-12.512-12.512-32.736-12.576-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.248l136.256 136.672-137.376 135.904c-12.576 12.448-12.672 32.672-0.256 45.248 6.272 6.336 14.496 9.504 22.752 9.504 8.128 0 16.256-3.104 22.496-9.248l137.568-136.064 138.688 139.136c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.056 513.376z", fill: "#ffffff", "p-id": "6149" })))),
                React.createElement("div", { "data-v-273e6401": "", className: "captcha_message__text" }, verificationStatus ? successText : failText))) : (React.createElement(React.Fragment, null))),
        React.createElement("style", null, "\n           .slider-track::before {\n               width: " + sliderPosition + "px\n             }\n           "),
        React.createElement("div", { className: "slider-track", style: {
                width: imgWidth + "px",
                margin: "20px " + ((width < 350 ? 350 : width) - imgWidth) / 2 + "px 0",
            }, ref: trackRef },
            React.createElement("div", { className: "slider", style: {
                    left: sliderPosition + "px",
                    pointerEvents: verificationStatus ? 'none' : 'auto',
                }, ref: sliderRef, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseMove: handleMouseMove },
                React.createElement("svg", { "data-v-273e6401": "", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "p-id": "819", style: { width: '16px', height: '16px', margin: '10px 0' } },
                    React.createElement("path", { "data-v-273e6401": "", d: "M500.864 545.728a47.744 47.744 0 0 0 6.72-48.896 24.704 24.704 0 0 0-4.48-8.384L240.256 193.088a34.24 34.24 0 0 0-28.608-17.408 34.24 34.24 0 0 0-25.856 12.864 46.592 46.592 0 0 0 0 59.52l238.08 264.512-238.08 264.512a46.592 46.592 0 0 0-1.088 59.52 32 32 0 0 0 50.56 0l265.6-290.88z", "p-id": "820" }),
                    React.createElement("path", { "data-v-273e6401": "", d: "M523.84 248.064l236.992 264.512-238.08 264.512a46.592 46.592 0 0 0 0 59.52 32 32 0 0 0 50.56 0l265.6-292.608a47.744 47.744 0 0 0 6.72-48.832 24.704 24.704 0 0 0-4.48-8.448L578.304 191.36a34.24 34.24 0 0 0-55.552-2.816 46.592 46.592 0 0 0 1.088 59.52z", "p-id": "821" }))),
            React.createElement("div", { className: "verification-status " + (verificationStatus ? 'verified' : '') }, verificationStatus ? successText : initText)),
        React.createElement("div", { className: "reset-button", style: {
                display: 'flex',
                width: '65px',
                margin: "3px " + ((width < 350 ? 350 : width) - imgWidth) / 2 + "px",
            }, onClick: handleReset }, CustomButton || (React.createElement(React.Fragment, null,
            React.createElement("svg", { fill: "#505050", width: "20px", height: "20px", viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { "data-v-273e6401": "", d: "M10,4 C12.0559549,4 13.9131832,5.04358655 15.0015086,6.68322231 L15,5.5 C15,5.22385763 15.2238576,5 15.5,5 C15.7761424,5 16,5.22385763 16,5.5 L16,8.5 C16,8.77614237 15.7761424,9 15.5,9 L12.5,9 C12.2238576,9 12,8.77614237 12,8.5 C12,8.22385763 12.2238576,8 12.5,8 L14.5842317,8.00000341 C13.7999308,6.20218044 12.0143541,5 10,5 C7.23857625,5 5,7.23857625 5,10 C5,12.7614237 7.23857625,15 10,15 C11.749756,15 13.3431487,14.0944653 14.2500463,12.6352662 C14.3958113,12.4007302 14.7041063,12.328767 14.9386423,12.4745321 C15.1731784,12.6202971 15.2451415,12.9285921 15.0993765,13.1631281 C14.0118542,14.9129524 12.0990688,16 10,16 C6.6862915,16 4,13.3137085 4,10 C4,6.6862915 6.6862915,4 10,4 Z" })),
            React.createElement("div", null, "\u91CD\u7F6E"))))));
};
export default ImageVerification;
