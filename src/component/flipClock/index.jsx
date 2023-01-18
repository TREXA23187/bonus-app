import React, { Component } from 'react';
import Flipper from './Flipper';
import './flipClock.css';

class FlipClock extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.flipObjs = [];
  }

  render() {
    return (
      <div className='FlipClock'>
        <Flipper ref='flipperHour1' />
        <Flipper ref='flipperHour2' />
        <em>:</em>
        <Flipper ref='flipperMinute1' />
        <Flipper ref='flipperMinute2' />
        <em>:</em>
        <Flipper ref='flipperSecond1' />
        <Flipper ref='flipperSecond2' />
      </div>
    );
  }

  componentDidMount() {
    this.flipObjs = [
      this.refs.flipperHour1,
      this.refs.flipperHour2,
      this.refs.flipperMinute1,
      this.refs.flipperMinute2,
      this.refs.flipperSecond1,
      this.refs.flipperSecond2,
    ];
    this.init();
    this.run();
  }

  // 初始化数字
  init() {
    const beginDateStr = '2022-10-13 16:46:00';

    const beginDate = new Date(beginDateStr);
    const endDate = Date.now();

    const seconds = (endDate - beginDate) / 1000;

    const new_seconds = this.add_zero(parseInt(seconds) % 60);
    const new_minutes = this.add_zero(parseInt(seconds / 60) % 60);
    const new_hours = this.add_zero(parseInt(seconds / (60 * 60)) % 24);
    const newTimeStr = `${new_hours}${new_minutes}${new_seconds}`;

    for (let i = 0; i < this.flipObjs.length; i++) {
      this.flipObjs[i].setFront(newTimeStr[i]);
    }
  }
  // 开始计时
  //   run() {
  //     this.timer = setInterval(() => {
  //       // 获取当前时间
  //       let now = new Date();
  //       let nowTimeStr = this.formatDate(
  //         new Date(now.getTime() - 1000),
  //         'hhiiss'
  //       );
  //       let nextTimeStr = this.formatDate(now, 'hhiiss');
  //       //   console.log(nextTimeStr);
  //       for (let i = 0; i < this.flipObjs.length; i++) {
  //         if (nowTimeStr[i] === nextTimeStr[i]) {
  //           continue;
  //         }
  //         this.flipObjs[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
  //         // console.log(nowTimeStr[i], nextTimeStr[i]);
  //       }
  //     }, 1000);
  //   }

  // 定制化
  run() {
    this.timer = setInterval(() => {
      // 获取当前时间
      const beginDateStr = '2022-10-13 16:46:00';

      const beginDate = new Date(beginDateStr);
      const endDate = Date.now();

      const seconds = (endDate - beginDate) / 1000;
      const _seconds = seconds - 1;

      const old_seconds = this.add_zero(parseInt(_seconds) % 60);
      const old_minutes = this.add_zero(parseInt(_seconds / 60) % 60);
      const old_hours = this.add_zero(parseInt(_seconds / (60 * 60)) % 24);
      const old_days = this.add_zero(parseInt(_seconds / (60 * 60 * 24)));

      const new_seconds = this.add_zero(parseInt(seconds) % 60);
      const new_minutes = this.add_zero(parseInt(seconds / 60) % 60);
      const new_hours = this.add_zero(parseInt(seconds / (60 * 60)) % 24);
      const new_days = this.add_zero(parseInt(seconds / (60 * 60 * 24)));

      const oldTimeStr = `${old_hours}${old_minutes}${old_seconds}`;
      const newTimeStr = `${new_hours}${new_minutes}${new_seconds}`;

      if (new_days != old_days) {
        this.props.onDayChange(parseInt(new_days));
      }

      for (let i = 0; i < this.flipObjs.length; i++) {
        if (oldTimeStr[i] === newTimeStr[i]) {
          continue;
        }
        this.flipObjs[i].flipDown(oldTimeStr[i], newTimeStr[i]);
      }
    }, 1000);
  }

  add_zero(num) {
    if (num > 9) {
      return num;
    } else {
      return `0${num}`;
    }
  }

  formatDate(date, dateFormat) {
    /* 单独格式化年份，根据y的字符数量输出年份
       * 例如：yyyy => 2019
              yy => 19
              y => 9
       */
    if (/(y+)/.test(dateFormat)) {
      dateFormat = dateFormat.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    // 格式化月、日、时、分、秒
    let o = {
      'm+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'i+': date.getMinutes(),
      's+': date.getSeconds(),
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(dateFormat)) {
        // 取出对应的值
        let str = o[k] + '';
        /* 根据设置的格式，输出对应的字符
         * 例如: 早上8时，hh => 08，h => 8
         * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
         * 例如: 下午15时，hh => 15, h => 15
         */
        dateFormat = dateFormat.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : this.padLeftZero(str)
        );
      }
    }
    return dateFormat;
  }
  // 日期时间补零
  padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
}
export default FlipClock;
