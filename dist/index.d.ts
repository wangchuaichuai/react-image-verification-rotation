/**
 * @Author       : 王欣 2750774003@qq.com
 * @Date         : 2023-04-03 14:48:52
 * @LastEditors  : wangchuaichuai 2750774003@qq.com
 * @LastEditTime : 2023-04-06 20:27:18
 * @Description  :
 * @FilePath     : App
 */
import React from 'react';
import './index.css';
interface ImageVerificationProps {
    src?: string;
    offsetAngleTemp?: number;
    onSuccess?: Function;
    onFailer?: Function;
    imgShow?: boolean;
    width?: number;
    height?: number;
    imgWidth?: number;
    deviationAngle?: number;
    successText?: string;
    failText?: string;
    initText?: string;
    CustomButton?: React.ReactNode;
}
declare const ImageVerification: React.FC<ImageVerificationProps>;
export default ImageVerification;
