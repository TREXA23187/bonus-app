import { QRCode } from 'antd';

export default function QrCode() {
  return (
    <>
      <QRCode value='http://www.baidu.com' />
      <QRCode value='http://shaoshanbonus.trexchen.com:3000/home' />
      <QRCode value='http://shaoshanbonus.trexchen.com:3000/bonus' />
    </>
  );
}
